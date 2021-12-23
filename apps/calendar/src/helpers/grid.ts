import range from 'tui-code-snippet/array/range';

import { findByDateRange } from '@src/controller/month';
import { findByDateRange as findByDateRangeForWeek } from '@src/controller/week';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  convertStartDayToLastDay,
  isWeekend,
  toEndOfDay,
  toEndOfMonth,
  toStartOfDay,
  toStartOfMonth,
  withinRangeDate,
} from '@src/time/datetime';

import {
  CalendarData,
  DayGridEventMatrix,
  EventModelMap,
  Matrix3d,
  TimeGridEventMatrix,
} from '@t/events';
import { MonthOption, WeekOption } from '@t/option';
import { Cells, Panel } from '@t/panel';

export const EVENT_HEIGHT = 22;
export const TOTAL_WIDTH = 100;

function forEachMatrix3d<T>(matrices: Matrix3d<T>, iteratee: (target: T, index?: number) => void) {
  matrices.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((value, index) => {
        iteratee(value, index);
      });
    });
  });
}

export function isWithinHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: EventUIModel) => containerHeight >= top * eventHeight;
}

export function isExceededHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: EventUIModel) => containerHeight < top * eventHeight;
}

export function getExceedCount(
  uiModel: EventUIModel[],
  containerHeight: number,
  eventHeight: number
) {
  return uiModel.filter(isExceededHeight(containerHeight, eventHeight)).length;
}

const getWeekendCount = (cells: Cells) => cells.filter((cell) => isWeekend(cell.getDay())).length;

export function getGridWidthAndLeftPercentValues(
  cells: Cells,
  narrowWeekend: boolean,
  totalWidth: number
) {
  const weekendCount = getWeekendCount(cells);
  const gridCellCount = cells.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay =
    totalWidth /
    (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);

  const widthList: number[] = cells.map((cell) => {
    const day = cell.getDay();

    if (!narrowWeekend || isAllWeekend) {
      return widthPerDay;
    }

    return isWeekend(day) ? widthPerDay : widthPerDay * 2;
  });

  const leftList = widthList.reduce<number[]>(
    (acc, _, index) => (index ? [...acc, acc[index - 1] + widthList[index - 1]] : [0]),
    []
  );

  return {
    widthList,
    leftList,
  };
}

export function getWidth(widthList: number[], start: number, end: number) {
  return widthList.reduce((acc, width, index) => {
    if (start <= index && index <= end) {
      return acc + width;
    }

    return acc;
  }, 0);
}

export const isInGrid = (gridDate: TZDate) => {
  return (uiModel: EventUIModel) => {
    const eventStart = toStartOfDay(uiModel.getStarts());
    const eventEnd = toStartOfDay(uiModel.getEnds());

    return eventStart <= gridDate && gridDate <= eventEnd;
  };
};

export function getGridDateIndex(date: TZDate, cells: TZDate[]) {
  return cells.findIndex((item) => date >= toStartOfDay(item) && date <= toEndOfDay(item));
}

export const getLeftAndWidth = (
  start: TZDate,
  end: TZDate,
  cells: Cells,
  narrowWeekend: boolean
) => {
  const gridStartIndex = getGridDateIndex(start, cells);
  const gridEndIndex = getGridDateIndex(convertStartDayToLastDay(end), cells);

  if (gridStartIndex < 0 && gridEndIndex < 0) {
    return { left: 0, width: withinRangeDate(start, end, cells) ? 100 : 0 };
  }

  const { widthList } = getGridWidthAndLeftPercentValues(cells, narrowWeekend, TOTAL_WIDTH);

  return {
    left: !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1),
    width: getWidth(
      widthList,
      gridStartIndex ?? 0,
      gridEndIndex < 0 ? cells.length - 1 : gridEndIndex
    ),
  };
};

export const getEventLeftAndWidth = (
  start: TZDate,
  end: TZDate,
  cells: Cells,
  narrowWeekend: boolean
) => {
  const { widthList } = getGridWidthAndLeftPercentValues(cells, narrowWeekend, TOTAL_WIDTH);

  let gridStartIndex = 0;
  let gridEndIndex = cells.length - 1;

  cells.forEach((cell, index) => {
    if (cell <= start) {
      gridStartIndex = index;
    }
    if (cell <= end) {
      gridEndIndex = index;
    }
  });

  return {
    width: getWidth(widthList, gridStartIndex, gridEndIndex),
    left: !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1),
  };
};

function getEventUIModelWithPosition(
  uiModel: EventUIModel,
  cells: Cells,
  narrowWeekend = false
): EventUIModel {
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);

  uiModel.width = width;
  uiModel.left = left;

  return uiModel;
}

export function getRenderedEventUIModels(
  cells: TZDate[],
  calendarData: CalendarData,
  narrowWeekend: boolean
) {
  const { idsOfDay } = calendarData;
  const eventUIModels = findByDateRange(calendarData, {
    start: cells[0],
    end: toEndOfDay(cells[cells.length - 1]),
  });
  const idEventModelMap: Record<number, EventUIModel> = [];

  forEachMatrix3d(eventUIModels, (uiModel) => {
    const cid = uiModel.model.cid();
    idEventModelMap[cid] = getEventUIModelWithPosition(uiModel, cells, narrowWeekend);
  });

  const gridDateEventModelMap = Object.keys(idsOfDay).reduce<Record<string, EventUIModel[]>>(
    (acc, ymd) => {
      const ids = idsOfDay[ymd];

      acc[ymd] = ids.map((cid) => idEventModelMap[cid]).filter((vm) => !!vm);

      return acc;
    },
    {}
  );

  return {
    uiModels: Object.values(idEventModelMap),
    gridDateEventModelMap,
  };
}

const getDayGridEventModels = (
  eventModels: DayGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): EventUIModel[] => {
  forEachMatrix3d(eventModels, (uiModel) => {
    const modelStart = uiModel.getStarts();
    const modelEnd = uiModel.getEnds();
    const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);

    uiModel.width = width;
    uiModel.left = left;
    uiModel.top += 1;
  });

  return flattenMatrix3d(eventModels);
};

const getModels = (models: EventUIModel[]) => models.filter((model) => !!model);

export function flattenMatrix3d(matrices: DayGridEventMatrix): EventUIModel[] {
  return matrices.flatMap((matrix) => matrix.flatMap((models) => getModels(models)));
}

export function setTopForDayGridEvents(models: EventUIModel[]) {
  models.forEach((model) => {
    model.top += 1;
  });
}

const getTimeGridEventModels = (
  eventModels: TimeGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): EventUIModel[] => {
  const result: EventUIModel[] = [];

  Object.values(eventModels).forEach((matrices) => result.push(...flattenMatrix3d(matrices)));

  return result;
};

export const getDayGridEvents = (
  cells: Cells,
  calendarData: CalendarData,
  { narrowWeekend, hourStart, hourEnd }: WeekOption
): EventModelMap => {
  const panels: Panel[] = [
    {
      name: 'milestone',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'task',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'allday',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'time',
      type: 'timegrid',
      show: true,
    },
  ];
  const eventModels = findByDateRangeForWeek(calendarData, {
    start: toStartOfDay(cells[0]),
    end: toEndOfDay(cells[cells.length - 1]),
    panels,
    andFilters: [],
    options: {
      hourStart,
      hourEnd,
    },
  });

  return Object.keys(eventModels).reduce<EventModelMap>(
    (acc, cur) => {
      const events = eventModels[cur as keyof EventModelMap];

      return {
        ...acc,
        [cur]: Array.isArray(events)
          ? getDayGridEventModels(events, cells, narrowWeekend)
          : getTimeGridEventModels(events, cells, narrowWeekend),
      };
    },
    {
      milestone: [],
      allday: [],
      task: [],
      time: [],
    }
  );
};

// eslint-disable-next-line complexity
export function getDateMatrixByMonth(renderMonthDate: Date | TZDate, options: MonthOption) {
  const targetMonthDate = new TZDate(renderMonthDate);

  const startDayOfWeek = options.startDayOfWeek ?? 0;
  const visibleWeeksCount = Math.min(options.visibleWeeksCount ?? 0, 6);
  const workweek = options.workweek ?? false;
  const isAlways6Week = visibleWeeksCount > 0 ? false : options.isAlways6Week ?? true;

  const calendar: Array<TZDate[]> = [];

  let start;
  let end;
  let totalDate;
  let week;

  if (visibleWeeksCount) {
    start = new TZDate(targetMonthDate);
    end = new TZDate(targetMonthDate);
    end.addDate(7 * (visibleWeeksCount - 1));
  } else {
    start = toStartOfMonth(targetMonthDate);
    end = toEndOfMonth(targetMonthDate);
  }

  // create day number array by startDayOfWeek number
  // 4 -> [4, 5, 6, 0, 1, 2, 3]
  // 2 -> [2, 3, 4, 5, 6, 0, 1]
  const weekArr = range(startDayOfWeek, 7).concat(range(7)).slice(0, 7);
  const startIndex = weekArr.indexOf(start.getDay());
  const endIndex = weekArr.indexOf(end.getDay());
  // free dates after last date of this month
  const afterDates = 7 - (endIndex + 1);

  if (visibleWeeksCount) {
    totalDate = 7 * visibleWeeksCount;
  } else {
    totalDate = isAlways6Week ? 7 * 6 : startIndex + end.getDate() + afterDates;
  }
  const cursor = toStartOfDay(start).addDate(-startIndex);
  // iteratee all dates to render
  range(totalDate).forEach((day: number) => {
    if (!(day % 7)) {
      // group each date by week
      week = calendar[day / 7] = [];
    }

    const date = toStartOfDay(cursor);
    if (!workweek || !isWeekend(date.getDay())) {
      week.push(date);
    }

    // add date
    cursor.setDate(cursor.getDate() + 1);
  });

  return calendar;
}
