import browser from 'tui-code-snippet/browser/browser';
import { keyAndKeyCodeMap } from '@src/util/keycode';

export function createMouseEvent(name: string, eventInitDic: MouseEventInit = {}) {
  const primaryButton = 0;
  let event;

  if (browser.msie) {
    event = document.createEvent('MouseEvent');
    event.initMouseEvent(
      name,
      true,
      true,
      window,
      0,
      0,
      0,
      eventInitDic.clientX || 0,
      eventInitDic.clientY || 0,
      false,
      false,
      false,
      false,
      primaryButton,
      null
    );
  } else {
    event = new MouseEvent(name, eventInitDic);
  }

  return event;
}

interface MSIEKeyboardEvent extends KeyboardEvent {
  initKeyboardEvent: (
    typeArg: string,
    canBubbleArg: boolean,
    cancelableArg: boolean,
    viewArg: Window & typeof globalThis,
    charArg: string | undefined,
    keyArg?: number,
    locationArg?: number,
    modifiersListArg?: number,
    repeat?: number
  ) => void;
}

export function createKeyboardEvent(name: string, eventInitDict: KeyboardEventInit) {
  let event: KeyboardEvent;
  if (browser.msie) {
    event = document.createEvent('KeyboardEvent');
    (event as MSIEKeyboardEvent).initKeyboardEvent(
      name,
      true,
      true,
      window,
      eventInitDict.key,
      keyAndKeyCodeMap[eventInitDict.key || ''],
      0,
      0,
      0
    );
  } else {
    event = new KeyboardEvent(name, eventInitDict);
  }

  return event;
}
