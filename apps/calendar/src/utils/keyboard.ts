import { KEY, KEYCODE } from '@src/constants/keyboard';

export function isKeyPressed(e: KeyboardEvent, key: KEY) {
  return e.key ? e.key === key : e.keyCode === KEYCODE[key];
}
