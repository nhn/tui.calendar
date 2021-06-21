import { limit, ratio } from '@src/util/math';
import { getMousePosition, getX } from '@src/util/mouse';

import { Cells } from '@t/panel';

export function createMousePositionDataGrabber(
  cells: Cells,
  grids: GridInfo[],
  container: HTMLElement
): (mouseEvent: MouseEvent) => MousePositionData | null {
  return function getGridPositionData(mouseEvent: MouseEvent) {
    const { left: containerLeft, top: containerTop, width } = container.getBoundingClientRect();
    const [left] = getMousePosition(mouseEvent, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop,
    });
    let gridX = getX(grids, ratio(width, 100, left));
    const gridY = 0;

    gridX = limit(gridX, [0], [cells.length - 1]);

    const date = cells[gridX];

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
