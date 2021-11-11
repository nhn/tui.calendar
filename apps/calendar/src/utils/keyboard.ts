import { ESCAPE, KEYCODE } from '@src/constants/keyboard';

export function isEscapePressed(e: KeyboardEvent) {
  return e.key ? e.key === ESCAPE : e.keyCode === KEYCODE[ESCAPE];
}
