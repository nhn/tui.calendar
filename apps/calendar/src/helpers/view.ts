import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import { limit, ratio } from '@src/utils/math';
import { getRelativeMousePosition } from '@src/utils/mouse';
import { isNil } from '@src/utils/type';

import { GridPosition } from '@t/grid';
import { Options } from '@t/options';

export type GridPositionFinder = (mousePosition: ClientMousePosition) => GridPosition | null;

function getIndexFromPosition(arrayLength: number, maxRange: number, currentPosition: number) {
  const positionRatio = Math.floor(ratio(maxRange, arrayLength, currentPosition));

  return limit(positionRatio, [0], [arrayLength - 1]);
}

export function createGridPositionFinder({
  rowsCount,
  columnsCount,
  container,
}: {
  rowsCount: number;
  columnsCount: number;
  container: HTMLElement | null;
}): GridPositionFinder {
  if (isNil(container)) {
    return () => null;
  }

  return function gridPositionFinder(mousePosition) {
    const {
      left: containerLeft,
      top: containerTop,
      width,
      height,
    } = container.getBoundingClientRect();
    const [left, top] = getRelativeMousePosition(mousePosition, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop,
    });

    if (left < 0 || top < 0 || left > width || top > height) {
      return null;
    }

    return {
      columnIndex: getIndexFromPosition(columnsCount, width, left),
      rowIndex: getIndexFromPosition(rowsCount, height, top),
    };
  };
}

export function getDisplayPanel(
  taskView: Required<Options>['taskView'],
  eventView: Required<Options>['eventView']
) {
  const displayPanel: string[] = [];

  if (taskView === true) {
    displayPanel.push(...DEFAULT_TASK_PANEL);
  } else if (Array.isArray(taskView)) {
    displayPanel.push(...taskView);
  }

  if (eventView === true) {
    displayPanel.push(...DEFAULT_EVENT_PANEL);
  } else if (Array.isArray(eventView)) {
    displayPanel.push(...eventView);
  }

  return displayPanel;
}
