import { LocalDate, TuiDateConstructor, UTCDate } from '@toast-ui/date';

import type TZDate from '@src/time/date';
import { isFunction, isNumber, isPresent } from '@src/utils/type';

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

const dtfCache = new Map<string, Intl.DateTimeFormat>();

function isIntlDateTimeFormatSupported() {
  /**
   * Intl.DateTimeFormat & IANA Timezone Data should be supported.
   * also, hourCycle options should be supported.
   */
  return isFunction(global?.Intl?.DateTimeFormat?.prototype?.formatToParts);
}

function getDateTimeFormat(timezoneName: string) {
  if (dtfCache.has(timezoneName)) {
    return dtfCache.get(timezoneName) as Intl.DateTimeFormat;
  }
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneName,
    hourCycle: 'h23',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  dtfCache.set(timezoneName, dtf);

  return dtf;
}

type TokenizeTarget = Extract<
  Intl.DateTimeFormatPartTypes,
  'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
>;
const typeToPos: Record<TokenizeTarget, number> = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
};

type TokenizeResult = [number, number, number, number, number, number];
function tokenizeTZDate(tzDate: TZDate, timezoneName: string): TokenizeResult {
  const dtf = getDateTimeFormat(timezoneName);
  const formatted = dtf.formatToParts(tzDate.toDate());

  const token = formatted.reduce<TokenizeResult>((result, cur) => {
    const pos = typeToPos[cur.type as TokenizeTarget];

    if (isPresent(pos)) {
      result[pos] = parseInt(cur.value, 10);
    }

    return result;
  }, [] as unknown as TokenizeResult);

  return token;
}

function tokenToUtcDate(token: TokenizeResult) {
  const [year, monthPlusOne, day, _hour, minute, second] = token;
  const month = monthPlusOne - 1;
  const hour = _hour > 23 ? 0 : _hour;

  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export function calculateTimezoneOffset(targetDate: TZDate, timezoneName: string) {
  if (!isIntlDateTimeFormatSupported()) {
    console.warn(
      'Intl.DateTimeFormat is not fully supported. So It will return local timezone offset only.\nYou can use polyfill to fix this issue.'
    );

    return targetDate.getTimezoneOffset();
  }

  const token = tokenizeTZDate(targetDate, timezoneName);
  const utcDate = tokenToUtcDate(token);

  const offset = Math.round((utcDate.getTime() - targetDate.getTime()) / 60 / 1000);

  return -offset;
}
