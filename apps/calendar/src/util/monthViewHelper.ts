import { findIndex } from '@src/util/utils';
import { limit, ratio } from '@src/util/math';
import TZDate from '@src/time/date';

type ContainerPosition = {
  containerLeft: number;
  containerTop: number;
  containerClientLeft: number;
  containerClientTop: number;
};

function getX(grids: GridInfo[], left: number) {
  return (
    findIndex<GridInfo>(grids, (item) => item.left <= left && left <= item.left + item.width) ?? -1
  );
}

function getMousePosition(
  position: MouseEvent,
  { containerLeft, containerTop, containerClientLeft, containerClientTop }: ContainerPosition
) {
  const { clientX, clientY } = position;

  return [
    clientX - containerLeft - containerClientLeft,
    clientY - containerTop - containerClientTop,
  ];
}

export function getMousePositionData(
  calendar: TZDate[][],
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
