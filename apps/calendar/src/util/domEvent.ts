export function getMousePosition(position: MouseEvent | number[], relativeElement: HTMLElement) {
  const clientX = Array.isArray(position) ? position[0] : position.clientX;
  const clientY = Array.isArray(position) ? position[1] : position.clientY;

  if (!relativeElement) {
    return [clientX, clientY];
  }

  const { left, top } = relativeElement.getBoundingClientRect();

  return [clientX - left - relativeElement.clientLeft, clientY - top - relativeElement.clientTop];
}
