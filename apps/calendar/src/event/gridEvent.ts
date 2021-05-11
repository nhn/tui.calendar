import ScheduleViewModel from '@src/model/scheduleViewModel';
import { PanelState } from '@src/components/layout';
import { getGridStyleInfo, getWidth, TOTAL_WIDTH } from '@src/event/panelEvent';
import { toStartOfDay } from '@src/time/datetime';

import type { Cells } from '@t/panel';

const setRenderInfo = (
  viewModel: ScheduleViewModel,
  cells: Cells,
  widthList: number[],
  top: number
) => {
  const modelStart = viewModel.getStarts();
  const modelEnd = viewModel.getEnds();
  let gridStartIndex = 0;
  let gridEndIndex = cells.length - 1;

  cells.forEach((cell, index) => {
    if (cell <= modelStart) {
      gridStartIndex = index;
    }
    if (cell <= modelEnd) {
      gridEndIndex = index;
    }
  });

  const left = !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1);

  let exceedRight = true;
  cells.forEach((cell) => {
    const modelEndDate = toStartOfDay(modelEnd).getDate();
    const gridDate = toStartOfDay(cell).getDate();

    if (modelEndDate === gridDate) {
      exceedRight = false;
    }
  });

  viewModel.width = getWidth(widthList, gridStartIndex, gridEndIndex);
  viewModel.left = left;
  viewModel.top = top;
  viewModel.exceedRight = exceedRight;
};

const isCollisionWith = (viewModel: ScheduleViewModel) => {
  return (target: ScheduleViewModel) => {
    const start = viewModel.getStarts();
    const end = viewModel.getEnds();
    const targetStart = target.getStarts();
    const targetEnd = target.getEnds();

    return (start <= targetStart && targetStart <= end) || (start <= targetEnd && targetEnd <= end);
  };
};

const getMatrices = (viewModels: ScheduleViewModel[]) => {
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

export const setViewModelsInfo = (
  viewModels: ScheduleViewModel[],
  cells: Cells,
  options: PanelState
) => {
  const { narrowWeekend = false } = options;

  const matrices = getMatrices(viewModels);
  const { widthList } = getGridStyleInfo(cells, narrowWeekend, TOTAL_WIDTH);

  matrices.forEach((matrix, top) => {
    matrix.forEach((viewModel) => {
      setRenderInfo(viewModel, cells, widthList, top);
    });
  });
};
