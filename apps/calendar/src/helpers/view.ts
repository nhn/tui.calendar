import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import TZDate from '@src/time/date';
import { limit, ratio } from '@src/utils/math';
import { getRelativeMousePosition, getX } from '@src/utils/mouse';

import { TimeGridData } from '@t/grid';
import { Options } from '@t/options';
import { CellStyle } from '@t/time/datetime';

export type MousePositionDataGrabber = (mouseEvent: MouseEvent) => MousePositionData | null;

function getIndexFromPosition(arrayLength: number, maxRange: number, currentPosition: number) {
  const positionRatio = Math.floor(ratio(maxRange, arrayLength, currentPosition));

  return limit(positionRatio, [0], [arrayLength - 1]);
}

export function createMousePositionDataGrabberMonth(
  dateMatrix: TZDate[][],
  rowStyleInfo: CellStyle[],
  container: HTMLElement
): (mouseEvent: MouseEvent) => MousePositionData | null {
  const weekCount = dateMatrix.length;

  return function getGridPositionData(mouseEvent: MouseEvent) {
    const {
      left: containerLeft,
      top: containerTop,
      width,
      height,
    } = container.getBoundingClientRect();
    const [left, top] = getRelativeMousePosition(mouseEvent, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop,
    });
    let gridX = getX(rowStyleInfo, ratio(width, 100, left));
    let gridY = Math.floor(ratio(height, weekCount, top));

    gridY = limit(gridY, [0], [dateMatrix.length - 1]);

    const dateRange = dateMatrix[gridY];

    if (!dateRange) {
      return null;
    }

    gridX = limit(gridX, [0], [dateRange.length - 1]);

    const date = dateRange[gridX];

    if (!date) {
      return null;
    }

    const { clientX, clientY } = mouseEvent;

    return {
      gridX,
      gridY,
      x: clientX,
      y: clientY,
      triggerEvent: mouseEvent.type,
    };
  };
}

export function createMousePositionDataGrabberWeek(
  row: TZDate[],
  rowStyleInfo: CellStyle[],
  container: HTMLElement
): (mouseEvent: MouseEvent) => MousePositionData | null {
  return function getGridPositionData(mouseEvent: MouseEvent) {
    const { left: containerLeft, top: containerTop, width } = container.getBoundingClientRect();
    const [left] = getRelativeMousePosition(mouseEvent, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop,
    });
    let gridX = getX(rowStyleInfo, ratio(width, 100, left));
    const gridY = 0;

    gridX = limit(gridX, [0], [row.length - 1]);

    const date = row[gridX];

    if (!date) {
      return null;
    }

    const { clientX, clientY } = mouseEvent;

    return {
      gridX,
      gridY,
      x: clientX,
      y: clientY,
      triggerEvent: mouseEvent.type,
    };
  };
}

export function createMousePositionDataGrabberTimeGrid(
  timeGridData: TimeGridData,
  container: HTMLElement
): (mousePosition: Pick<MouseEvent, 'clientX' | 'clientY'>) => MousePositionData | null {
  return function getGridPositionData(mousePosition) {
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

    const columnsCount = timeGridData.columns.length;
    const gridX = getIndexFromPosition(columnsCount, width, left);

    const rowsCount = timeGridData.rows.length;
    const gridY = getIndexFromPosition(rowsCount, height, top);

    return {
      gridX,
      gridY,
      x: mousePosition.clientX,
      y: mousePosition.clientY,
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
