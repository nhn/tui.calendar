import { limit, ratio } from '@src/util/math';
import { getMousePosition, getX } from '@src/util/mouse';

import { Cells } from '@t/panel';

export function getMousePositionData(
  cells: Cells,
  grids: GridInfo[],
  container: HTMLElement
): (mouseEvent: MouseEvent) => MousePositionData | null {
  return function getGridPosData(mouseEvent: MouseEvent) {
    const { left: containerLeft, top: containerTop, width } = container.getBoundingClientRect();
    const [left] = getMousePosition(mouseEvent, {
      containerLeft,
      containerTop,
      containerClientLeft: container.clientLeft,
      containerClientTop: container.clientTop,
    });
    let x = getX(grids, ratio(width, 100, left));
    const y = 0;

    x = limit(x, [0], [cells.length - 1]);

    const date = cells[x];

    if (!date) {
      return null;
    }

    return {
      x,
      y,
      triggerEvent: mouseEvent.type,
    };
  };
}
