export type ContainerPosition = {
  left: number;
  top: number;
  clientLeft: number;
  clientTop: number;
};

export function getRelativeMousePosition(
  { clientX, clientY }: ClientMousePosition,
  { left, top, clientLeft, clientTop }: ContainerPosition
) {
  return [clientX - left - clientLeft, clientY - top - clientTop];
}
