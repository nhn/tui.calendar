import { findByDateRange } from '@src/controller/month';
import { findByDateRange as findByDateRangeForWeek } from '@src/controller/week';
import { DataStore } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import {
  convertStartDayToLastDay,
  isWeekend,
  toEndOfDay,
  toStartOfDay,
  withinRangeDate,
} from '@src/time/datetime';
import { Cells, Panel } from '@t/panel';
import { findIndex, isNil } from '@src/util/utils';
import { DayGridEventMatrix, EventModelMap, TimeGridEventMatrix } from '@t/events';

export const EVENT_HEIGHT = 22;
export const TOTAL_WIDTH = 100;

export function isWithinHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: ScheduleViewModel) => containerHeight >= top * eventHeight;
}

export function isExceededHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: ScheduleViewModel) => containerHeight < top * eventHeight;
}

export function getExceedCount(
  viewModels: ScheduleViewModel[],
  containerHeight: number,
  eventHeight: number
) {
  return viewModels.filter(isExceededHeight(containerHeight, eventHeight)).length;
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
  return (viewModel: ScheduleViewModel) => {
    const scheduleStart = toStartOfDay(viewModel.getStarts());
    const scheduleEnd = toStartOfDay(viewModel.getEnds());

    return scheduleStart <= gridDate && gridDate <= scheduleEnd;
  };
};

function getGridDateIndex(date: TZDate, cells: TZDate[]) {
  return findIndex(cells, (item) => date >= toStartOfDay(item) && date <= toEndOfDay(item));
}

export const getLeftAndWidth = (
  start: TZDate,
  end: TZDate,
  cells: Cells,
  narrowWeekend: boolean
) => {
  const gridStartIndex = getGridDateIndex(start, cells);
  const gridEndIndex = getGridDateIndex(convertStartDayToLastDay(end), cells);

  if (isNil(gridStartIndex) && isNil(gridEndIndex)) {
    return { left: 0, width: withinRangeDate(start, end, cells) ? 100 : 0 };
  }

  const { widthList } = getGridWidthAndLeftPercentValues(cells, narrowWeekend, TOTAL_WIDTH);

  return {
    left: !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1),
    width: getWidth(widthList, gridStartIndex ?? 0, gridEndIndex ?? cells.length - 1),
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

function getEventViewModelWithPosition(
  viewModel: ScheduleViewModel,
  cells: Cells,
  narrowWeekend = false
): ScheduleViewModel {
  const modelStart = viewModel.getStarts();
  const modelEnd = viewModel.getEnds();
  const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);

  viewModel.width = width;
  viewModel.left = left;

  return viewModel;
}

export function getRenderedEventViewModels(
  cells: TZDate[],
  dataStore: DataStore,
  narrowWeekend: boolean
) {
  const { idsOfDay } = dataStore;
  const eventViewModels = findByDateRange(dataStore, {
    start: cells[0],
    end: cells[cells.length - 1],
  });
  const idEventModelMap: Record<number, ScheduleViewModel> = [];

  eventViewModels.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((viewModel) => {
        const cid = viewModel.model.cid();
        idEventModelMap[cid] = getEventViewModelWithPosition(viewModel, cells, narrowWeekend);
      });
    });
  });

  const gridDateEventModelMap = Object.keys(idsOfDay).reduce<Record<string, ScheduleViewModel[]>>(
    (acc, ymd) => {
      const ids = idsOfDay[ymd];

      acc[ymd] = ids.map((cid) => idEventModelMap[cid]).filter((vm) => !!vm);

      return acc;
    },
    {}
  );

  return {
    viewModels: Object.values(idEventModelMap),
    gridDateEventModelMap,
  };
}

const getDayGridEventModels = (
  eventModels: DayGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): DayGridEventMatrix => {
  eventModels.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((viewModel) => {
        const modelStart = viewModel.getStarts();
        const modelEnd = viewModel.getEnds();
        const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);

        viewModel.width = width;
        viewModel.left = left;
      });
    });
  });

  return eventModels;
};

const getModels = (models: ScheduleViewModel[]) => models.filter((model) => !!model);

export const flattenMatrix = (matrices: DayGridEventMatrix): ScheduleViewModel[] => {
  const eventModels: ScheduleViewModel[] = [];

  matrices.forEach((matrix) => {
    matrix.forEach((models) => {
      eventModels.push(...getModels(models));
    });
  });

  return eventModels;
};

export const setDayGridEventModels = (models: ScheduleViewModel[]): ScheduleViewModel[] => {
  models.forEach((model) => {
    model.top += 1;
  });

  return models;
};

const getTimeGridEventModels = (
  eventModels: TimeGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): ScheduleViewModel[] => {
  const result: ScheduleViewModel[] = [];

  Object.values(eventModels).forEach((matrices) =>
    matrices.forEach((matrix) => {
      matrix.forEach((row) => {
        result.push(...getModels(row));
      });
    })
  );

  return result;
};

export const getDayGridEvents = (
  cells: Cells,
  dataStore: DataStore,
  narrowWeekend: boolean
): EventModelMap => {
  const panels = [
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
  ] as Panel[];
  const eventModels = findByDateRangeForWeek(dataStore, {
    start: toStartOfDay(cells[0]),
    end: toEndOfDay(cells[cells.length - 1]),
    panels,
    andFilters: [],
    options: {
      hourStart: 0,
      hourEnd: 24,
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
