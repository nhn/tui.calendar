import { limit, ratio } from '@src/util/math';
import { getMousePosition, getX } from '@src/util/mouse';

import type { Cells } from '@t/panel';

export function getMousePositionData(
  calendar: Cells[],
  grids: GridInfo[],
  container: HTMLElement
): (mouseEvent: MouseEvent) => MousePositionData | null {
  const weekCount = calendar.length;

  return function getGridPosData(mouseEvent: MouseEvent) {
    const {
      left: containerLeft,
      top: containerTop,
      width,
      height,
    } = container.getBoundingClientRect();
    const [left, top] = getMousePosition(mouseEvent, {
      containerLeft,
      containerTop,
      containerClientLeft: container.clientLeft,
      containerClientTop: container.clientTop,
    });
    let x = getX(grids, ratio(width, 100, left));
    let y = Math.floor(ratio(height, weekCount, top));

    y = limit(y, [0], [calendar.length - 1]);

    const dateRange = calendar[y];

    if (!dateRange) {
      return null;
    }

    x = limit(x, [0], [dateRange.length - 1]);

    const date = dateRange[x];

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
