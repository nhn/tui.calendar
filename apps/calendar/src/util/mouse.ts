import { findIndex } from '@src/util/utils';

export type ContainerPosition = {
  left: number;
  top: number;
  clientLeft: number;
  clientTop: number;
};

export function getX(grids: GridInfo[], left: number) {
  return (
    findIndex<GridInfo>(grids, (item) => item.left <= left && left <= item.left + item.width) ?? -1
  );
}

export function getRelativeMousePosition(
  { clientX, clientY }: MouseEvent,
  { left, top, clientLeft, clientTop }: ContainerPosition
) {
  return [clientX - left - clientLeft, clientY - top - clientTop];
}
