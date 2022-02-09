/**
 * Generic coordinates of mouse position.
 *
 * Can be `clientX` & `clientY` or `pageX`, `pageY`.
 */
interface Coordinates {
  x: number;
  y: number;
}

type ClientMousePosition = Pick<MouseEvent, 'clientX' | 'clientY'>;
