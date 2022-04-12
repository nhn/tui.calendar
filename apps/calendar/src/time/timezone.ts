import type { TuiDateConstructor } from '@toast-ui/date';
import { LocalDate, UTCDate } from '@toast-ui/date';

import { isNumber } from '@src/utils/type';

let Constructor: TuiDateConstructor = LocalDate;

function isTimezoneDisabled() {
  return Constructor === LocalDate || Constructor === UTCDate;
}

export function setDateConstructor(constructor: TuiDateConstructor) {
  Constructor = constructor;
}

export function date(...args: any[]) {
  return new Constructor(...args);
}

export function getTimezoneFactory(value: number | string) {
  return (...args: any[]) => {
    if (isTimezoneDisabled()) {
      return date(...args);
    }

    if (isNumber(value)) {
      return date(...args).setTimezoneOffset(value);
    }

    return date(...args).setTimezoneName(value);
  };
}
