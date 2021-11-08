import { ESCAPE, KEYCODE } from '@src/util/constants';

export function isEscapePressed(e: KeyboardEvent) {
  return e.key ? e.key === ESCAPE : e.keyCode === KEYCODE[ESCAPE];
}
