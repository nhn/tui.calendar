import { findByDateRange } from '@src/controller/month';
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
import { Cells } from '@t/panel';
import { findIndex, isNil } from './utils';

export const EVENT_HEIGHT = 20;
export const TOTAL_WIDTH = 100;

export function isWithinHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: ScheduleViewModel) => containerHeight >= top * eventHeight;
}

const isExceededHeight = (containerHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => containerHeight < (top + 1) * eventHeight;
};

export function getExceedCount(
  viewModels: ScheduleViewModel[],
  containerHeight: number,
  eventHeight: number,
  gridDate: TZDate
) {
  return viewModels
    .filter(isExceededHeight(containerHeight, eventHeight))
    .filter(isInGrid(gridDate)).length;
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

const isInGrid = (gridDate: TZDate) => {
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

const getEventLeftAndWidth = (start: TZDate, end: TZDate, cells: Cells, narrowWeekend: boolean) => {
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
