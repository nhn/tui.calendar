import { CellStyleInfo } from '@t/time/datetime';

export type ContainerPosition = {
  left: number;
  top: number;
  clientLeft: number;
  clientTop: number;
};

export function getX(grids: CellStyleInfo[], left: number) {
  return grids.findIndex((item) => item.left <= left && left <= item.left + item.width) ?? -1;
}

export function getRelativeMousePosition(
  { clientX, clientY }: MouseEvent,
  { left, top, clientLeft, clientTop }: ContainerPosition
) {
  return [clientX - left - clientLeft, clientY - top - clientTop];
}
