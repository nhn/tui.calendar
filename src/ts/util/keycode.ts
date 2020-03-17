type KEY = 'Escape';

export const ESCAPE = 'Escape';
export const KEYCODE = {
  ESC: 27
};

const keyAndKeyCodeMap = {
  [ESCAPE]: KEYCODE.ESC
};

export function isKey(e: KeyboardEvent, key: KEY) {
  if (e.key) {
    return e.key === key;
  }

  return e.keyCode === keyAndKeyCodeMap[key];
}
