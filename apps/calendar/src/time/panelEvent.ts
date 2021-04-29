import { isWeekend } from '@src/time/datetime';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import array from '@src/util/array';

import type { GridInfoList } from '@t/panel';

const getWeekendCount = (gridInfoList: GridInfoList) =>
  gridInfoList.filter((gridInfo) => isWeekend(gridInfo.getDay())).length;

export const getGridStyleInfo = ({
  gridInfoList,
  narrowWeekend,
  totalWidth,
}: {
  gridInfoList: GridInfoList;
  narrowWeekend: boolean;
  totalWidth: number;
}) => {
  const weekendCount = getWeekendCount(gridInfoList);
  const gridCellCount = gridInfoList.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay =
    totalWidth /
    (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);

  const widthList: number[] = gridInfoList.map((gridInfo) => {
    const day = gridInfo.getDay();

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

export const isBetweenEvent = (gridInfoList: GridInfoList) => {
  const [gridStart] = gridInfoList;
  const gridEnd = gridInfoList[gridInfoList.length - 1];

  return (schedule: Schedule) => {
    const scheduleStart = schedule.getStarts();
    const scheduleEnd = schedule.getEnds();

    return (
      (gridStart <= scheduleStart && scheduleStart <= gridEnd) ||
      (gridStart <= scheduleEnd && scheduleEnd <= gridEnd)
    );
  };
};

export const setRenderInfo = (
  viewModel: ScheduleViewModel,
  gridInfoList: GridInfoList,
  widthList: number[],
  row: number
) => {
  const modelStart = viewModel.getStarts();
  const modelEnd = viewModel.getEnds();
  let gridStartIndex = 0;
  let gridEndIndex = gridInfoList.length - 1;

  gridInfoList.forEach((gridInfo, index) => {
    if (gridInfo <= modelStart) {
      gridStartIndex = index;
    }
    if (gridInfo <= modelEnd) {
      gridEndIndex = index;
    }
  });

  const left = !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1);

  viewModel.width = getWidth(widthList, gridStartIndex, gridEndIndex);
  viewModel.left = left;
  viewModel.top = row;
};

export const getViewModels = (events: Schedule[], gridInfoList: GridInfoList, options) => {
  const viewModels = events
    .filter(isBetweenEvent(gridInfoList))
    .sort(array.compare.schedule.asc)
    .map(ScheduleViewModel.create);
  const { narrowWeekend = false } = options;

  const matrices = getMatrices(viewModels);
  const { widthList } = getGridStyleInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: 100,
  });

  matrices.forEach((matrix, row) => {
    matrix.forEach((viewModel) => {
      setRenderInfo(viewModel, gridInfoList, widthList, row);
    });
  });

  return viewModels;
};

export const isCollisionWith = (viewModel: ScheduleViewModel) => {
  return (target: ScheduleViewModel) => {
    const start = viewModel.getStarts();
    const end = viewModel.getEnds();
    const targetStart = target.getStarts();
    const targetEnd = target.getEnds();

    return (start <= targetStart && targetStart <= end) || (start <= targetEnd && targetEnd <= end);
  };
};

export const getMatrices = (viewModels: ScheduleViewModel[]) => {
  if (!viewModels.length) {
    return [];
  }
  const matrices: Array<Array<ScheduleViewModel>> = [];

  matrices[0] = [viewModels[0]];
  viewModels.slice(1).forEach((viewModel) => {
    const matricesNotCollision = matrices.some((matrix) => {
      const isCollision = matrix.some(isCollisionWith(viewModel));

      if (!isCollision) {
        matrix.push(viewModel);

        return true;
      }

      return false;
    });

    if (!matricesNotCollision) {
      matrices.push([viewModel]);
    }
  });

  return matrices;
};
