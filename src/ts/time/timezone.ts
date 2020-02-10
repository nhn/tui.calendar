import { DateConstructor, LocalDate, UTCDate } from '@toast-ui/date';
import isNumber from 'tui-code-snippet/type/isNumber';

let Constructor: DateConstructor = LocalDate;

function isTimezoneDisabled() {
  return Constructor === LocalDate || Constructor === UTCDate;
}

export function setDateConstructor(constructor: DateConstructor) {
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
