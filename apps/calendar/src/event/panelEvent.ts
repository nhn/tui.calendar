import { isWeekend, toStartOfDay } from '@src/time/datetime';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import array from '@src/util/array';
import TZDate from '@src/time/date';

import type { Cells } from '@t/panel';

export const EVENT_HEIGHT = 20;
export const TOTAL_WIDTH = 100;

const getWeekendCount = (cells: Cells) => cells.filter((cell) => isWeekend(cell.getDay())).length;

export const getGridStyleInfo = (cells: Cells, narrowWeekend: boolean, totalWidth: number) => {
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
  const leftList = widthList.reduce<number[]>((acc, _, index) => {
    if (!index) {
      return [0];
    }

    return [...acc, acc[index - 1] + widthList[index - 1]];
  }, []);

  return {
    widthList,
    leftList,
  };
};

export const getWidth = (widthList: number[], start: number, end: number) =>
  widthList.reduce((acc, width, index) => {
    if (start <= index && index <= end) {
      return acc + width;
    }

    return acc;
  }, 0);

const isBetweenEvent = (schedule: Schedule, gridStart: TZDate, gridEnd: TZDate) => {
  const scheduleStart = schedule.getStarts();
  const scheduleEnd = schedule.getEnds();

  return (
    (gridStart <= scheduleStart && scheduleStart <= gridEnd) ||
    (gridStart <= scheduleEnd && scheduleEnd <= gridEnd)
  );
};

export const isInGrid = (gridDate: TZDate) => {
  return (viewModel: ScheduleViewModel) => {
    const scheduleStart = toStartOfDay(viewModel.getStarts());
    const scheduleEnd = toStartOfDay(viewModel.getEnds());

    return scheduleStart <= gridDate && gridDate <= scheduleEnd;
  };
};

export const getViewModels = (events: Schedule[], cells: Cells) => {
  const [cellStart] = cells;
  const cellEnd = cells[cells.length - 1];

  return events
    .filter((event) => isBetweenEvent(event, cellStart, cellEnd))
    .sort(array.compare.schedule.asc)
    .map(ScheduleViewModel.create);
};
