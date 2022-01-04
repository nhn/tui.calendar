import { CellStyleInfo } from '@t/time/datetime';

export type ContainerPosition = {
  left: number;
  top: number;
  clientLeft: number;
  clientTop: number;
};

export function getX(rowStyleInfo: CellStyleInfo[], left: number) {
  return (
    rowStyleInfo.findIndex(
      (cellStyleInfo) =>
        cellStyleInfo.left <= left && left <= cellStyleInfo.left + cellStyleInfo.width
    ) ?? -1
  );
}

export function getRelativeMousePosition(
  { clientX, clientY }: MouseEvent,
  { left, top, clientLeft, clientTop }: ContainerPosition
) {
  return [clientX - left - clientLeft, clientY - top - clientTop];
}
