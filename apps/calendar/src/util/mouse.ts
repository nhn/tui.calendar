import { findIndex } from '@src/util/utils';

export type ContainerPosition = {
  containerLeft: number;
  containerTop: number;
  containerClientLeft: number;
  containerClientTop: number;
};

export function getX(grids: GridInfo[], left: number) {
  return (
    findIndex<GridInfo>(grids, (item) => item.left <= left && left <= item.left + item.width) ?? -1
  );
}

export function getMousePosition(
  position: MouseEvent,
  { containerLeft, containerTop, containerClientLeft, containerClientTop }: ContainerPosition
) {
  const { clientX, clientY } = position;

  return [
    clientX - containerLeft - containerClientLeft,
    clientY - containerTop - containerClientTop,
  ];
}
