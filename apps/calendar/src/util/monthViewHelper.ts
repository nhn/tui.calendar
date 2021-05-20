import { findIndex } from '@src/util/utils';
import { ratio } from '@src/util/math';
import TZDate from '@src/time/date';

type ContainerPosition = {
  containerLeft: number;
  containerTop: number;
  containerClientLeft: number;
  containerClientTop: number;
};

function getX(grids: GridInfo[], left: number) {
  const index = findIndex<GridInfo>(
    grids,
    (item) => item.left <= left && left <= item.left + item.width
  );

  return index ?? -1;
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

    if (y < 0) {
      y = 0;
    }
    if (y >= calendar.length) {
      y = calendar.length - 1;
    }

    const dateRange = calendar[y];

    if (!dateRange) {
      return null;
    }

    if (x < 0) {
      x = 0;
    }
    if (x >= dateRange.length) {
      x = dateRange.length - 1;
    }

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
