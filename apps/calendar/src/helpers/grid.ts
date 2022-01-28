import range from 'tui-code-snippet/array/range';

import { DEFAULT_VISIBLE_WEEKS } from '@src/constants/grid';
import { findByDateRange } from '@src/controller/month';
import { findByDateRange as findByDateRangeForWeek } from '@src/controller/week';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  addDate,
  getDateDifference,
  isWeekend,
  subtractDate,
  toEndOfDay,
  toEndOfMonth,
  toStartOfDay,
  toStartOfMonth,
  WEEK_DAYS,
} from '@src/time/datetime';

import {
  CalendarData,
  DayGridEventMatrix,
  EventModelMap,
  Matrix3d,
  TimeGridEventMatrix,
} from '@t/events';
import { MonthOptions, WeekOptions } from '@t/options';
import { Panel } from '@t/panel';

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

const getWeekendCount = (row: TZDate[]) => row.filter((cell) => isWeekend(cell.getDay())).length;

export function getGridWidthAndLeftPercentValues(
  row: TZDate[],
  narrowWeekend: boolean,
  totalWidth: number
) {
  const weekendCount = getWeekendCount(row);
  const gridCellCount = row.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay =
    totalWidth /
    (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);

  const widthList: number[] = row.map((cell) => {
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

export function getGridDateIndex(date: TZDate, row: TZDate[]) {
  return row.findIndex((cell) => date >= toStartOfDay(cell) && date <= toEndOfDay(cell));
}

export const getLeftAndWidth = (
  startIndex: number,
  endIndex: number,
  row: TZDate[],
  narrowWeekend: boolean
) => {
  const { widthList } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);

  return {
    left: !startIndex ? 0 : getWidth(widthList, 0, startIndex - 1),
    width: getWidth(widthList, startIndex ?? 0, endIndex < 0 ? row.length - 1 : endIndex),
  };
};

export const getEventLeftAndWidth = (
  start: TZDate,
  end: TZDate,
  row: TZDate[],
  narrowWeekend: boolean
) => {
  const { widthList } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);

  let gridStartIndex = 0;
  let gridEndIndex = row.length - 1;

  row.forEach((cell, index) => {
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
  row: TZDate[],
  narrowWeekend = false
): EventUIModel {
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);

  uiModel.width = width;
  uiModel.left = left;

  return uiModel;
}

export function getRenderedEventUIModels(
  row: TZDate[],
  calendarData: CalendarData,
  narrowWeekend: boolean
) {
  const { idsOfDay } = calendarData;
  const eventUIModels = findByDateRange(calendarData, {
    start: row[0],
    end: toEndOfDay(row[row.length - 1]),
  });
  const idEventModelMap: Record<number, EventUIModel> = [];

  forEachMatrix3d(eventUIModels, (uiModel) => {
    const cid = uiModel.model.cid();
    idEventModelMap[cid] = getEventUIModelWithPosition(uiModel, row, narrowWeekend);
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
  row: TZDate[],
  narrowWeekend = false
): EventUIModel[] => {
  forEachMatrix3d(eventModels, (uiModel) => {
    const modelStart = uiModel.getStarts();
    const modelEnd = uiModel.getEnds();
    const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);

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
  row: TZDate[],
  narrowWeekend = false
): EventUIModel[] => {
  const result: EventUIModel[] = [];

  Object.values(eventModels).forEach((matrices) => result.push(...flattenMatrix3d(matrices)));

  return result;
};

export const getDayGridEvents = (
  row: TZDate[],
  calendarData: CalendarData,
  { narrowWeekend, hourStart, hourEnd }: WeekOptions
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
    start: toStartOfDay(row[0]),
    end: toEndOfDay(row[row.length - 1]),
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
          ? getDayGridEventModels(events, row, narrowWeekend)
          : getTimeGridEventModels(events, row, narrowWeekend),
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

export function createDateMatrixOfMonth(
  renderTargetDate: Date | TZDate,
  {
    workweek = false,
    visibleWeeksCount = 0,
    startDayOfWeek = 0,
    isAlways6Week = true,
  }: MonthOptions
) {
  const targetDate = new TZDate(renderTargetDate);
  const shouldApplyVisibleWeeksCount = visibleWeeksCount > 0;
  const baseDate = shouldApplyVisibleWeeksCount ? targetDate : toStartOfMonth(targetDate);
  const firstDateOfMatrix = subtractDate(
    baseDate,
    baseDate.getDay() - startDayOfWeek + (baseDate.getDay() < startDayOfWeek ? WEEK_DAYS : 0)
  );
  const dayOfFirstDateOfMatrix = firstDateOfMatrix.getDay();

  const totalDatsCountOfMonth = toEndOfMonth(targetDate).getDate();
  const initialDifference = getDateDifference(firstDateOfMatrix, baseDate);
  const totalDatesOfMatrix = totalDatsCountOfMonth + initialDifference;

  let totalWeeksOfMatrix = DEFAULT_VISIBLE_WEEKS;
  if (shouldApplyVisibleWeeksCount) {
    totalWeeksOfMatrix = visibleWeeksCount;
  } else if (isAlways6Week === false) {
    totalWeeksOfMatrix = Math.ceil(totalDatesOfMatrix / WEEK_DAYS);
  }

  return range(0, totalWeeksOfMatrix).map((weekIndex) =>
    range(0, WEEK_DAYS).reduce((weekRow, dayOfWeek) => {
      const steps = weekIndex * WEEK_DAYS + dayOfWeek;
      const currentDay = (steps + dayOfFirstDateOfMatrix) % WEEK_DAYS;
      if (!workweek || (workweek && !isWeekend(currentDay))) {
        const date = addDate(firstDateOfMatrix, steps);
        weekRow.push(date);
      }

      return weekRow;
    }, [] as TZDate[])
  );
}

export function getWeekDates(
  renderDate: TZDate,
  { startDayOfWeek = 0, workweek }: WeekOptions
): TZDate[] {
  const renderDay = renderDate.getDay();
  const now = toStartOfDay(renderDate);
  const nowDay = now.getDay();
  const prevWeekCount = startDayOfWeek - WEEK_DAYS;

  return range(startDayOfWeek, WEEK_DAYS + startDayOfWeek).reduce<TZDate[]>((acc, day) => {
    const date = addDate(now, day - nowDay + (startDayOfWeek > renderDay ? prevWeekCount : 0));
    if (workweek && isWeekend(date.getDay())) {
      return acc;
    }
    acc.push(date);

    return acc;
  }, []);
}

export function getColumnStyles(
  datesOfWeek: TZDate[], // 5 or 7 dates
  narrowWeekend = false
): { date: TZDate; left: number; width: number }[] {
  const datesCount = datesOfWeek.length;
  const shouldApplyNarrowWeekend = datesCount > 5 && narrowWeekend;
  const defaultWidthByColumns = shouldApplyNarrowWeekend
    ? 100 / (datesCount - 1)
    : 100 / datesCount;

  return datesOfWeek
    .map((date) => {
      const width =
        shouldApplyNarrowWeekend && isWeekend(date.getDay())
          ? defaultWidthByColumns / 2
          : defaultWidthByColumns;

      return {
        date,
        width,
      };
    })
    .reduce((result, currentDateAndWidth, index) => {
      const prev = result[index - 1];

      result.push({
        ...currentDateAndWidth,
        left: index === 0 ? 0 : prev.left + prev.width,
      });

      return result;
    }, [] as { date: TZDate; left: number; width: number }[]);
}

export function createTimeGridData(
  datesOfWeek: TZDate[],

  options: {
    hourStart: number;
    hourEnd: number;
  }
): {
  columns: {
    date: TZDate;
    left: number;
    width: number;
  }[];
  rows: {
    top: number;
    height: number;
    startTime: TZDate;
    endTime: TZDate;
  }[];
} | null {
  return null;
}
