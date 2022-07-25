import type { TuiDateConstructor } from '@toast-ui/date';
import { LocalDate } from '@toast-ui/date';

import TZDate from '@src/time/date';
import { InvalidTimezoneNameError } from '@src/utils/error';
import { logger } from '@src/utils/logger';
import { isFunction, isPresent } from '@src/utils/type';

let Constructor: TuiDateConstructor = LocalDate;

export function setDateConstructor(constructor: TuiDateConstructor) {
  Constructor = constructor;
}

export function date(...args: any[]) {
  return new Constructor(...args);
}

// Get the timezone offset from the system using the calendar.
export function getLocalTimezoneOffset() {
  return -new Date().getTimezoneOffset();
}

/**
 * Calculate timezone offset from UTC.
 *
 * Target date is needed for the case when the timezone is applicable to DST.
 */
export function calculateTimezoneOffset(timezoneName: string, targetDate: TZDate = new TZDate()) {
  if (!isIntlDateTimeFormatSupported()) {
    logger.warn(
      'Intl.DateTimeFormat is not fully supported. So It will return the local timezone offset only.\nYou can use a polyfill to fix this issue.'
    );

    return -targetDate.toDate().getTimezoneOffset();
  }

  validateIANATimezoneName(timezoneName);

  const token = tokenizeTZDate(targetDate, timezoneName);
  const utcDate = tokenToUtcDate(token);

  return Math.round((utcDate.getTime() - targetDate.getTime()) / 60 / 1000);
}

// Reference: https://stackoverflow.com/a/30280636/16702531
// If there's no timezoneName, it handles Native OS timezone.
export function isUsingDST(targetDate: TZDate, timezoneName?: string) {
  if (timezoneName) {
    validateIANATimezoneName(timezoneName);
  }

  const jan = new TZDate(targetDate.getFullYear(), 0, 1);
  const jul = new TZDate(targetDate.getFullYear(), 6, 1);

  if (timezoneName) {
    return (
      Math.max(
        -calculateTimezoneOffset(timezoneName, jan),
        -calculateTimezoneOffset(timezoneName, jul)
      ) !== -calculateTimezoneOffset(timezoneName, targetDate)
    );
  }

  return (
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) !==
    targetDate.toDate().getTimezoneOffset()
  );
}

const dtfCache: Record<string, Intl.DateTimeFormat> = {};
const timezoneNameValidationCache: Record<string, boolean> = {};

function isIntlDateTimeFormatSupported() {
  /**
   * Intl.DateTimeFormat & IANA Timezone Data should be supported.
   * also, hourCycle options should be supported.
   */
  return isFunction(Intl?.DateTimeFormat?.prototype?.formatToParts);
}

function validateIANATimezoneName(timezoneName: string) {
  if (timezoneNameValidationCache[timezoneName]) {
    return true;
  }

  try {
    // Just try to create a dtf with the timezoneName.
    // eslint-disable-next-line new-cap
    Intl.DateTimeFormat('en-US', { timeZone: timezoneName });
    timezoneNameValidationCache[timezoneName] = true;

    return true;
  } catch {
    // Usually it throws `RangeError` when the timezoneName is invalid.
    throw new InvalidTimezoneNameError(timezoneName);
  }
}

function getDateTimeFormat(timezoneName: string) {
  if (dtfCache[timezoneName]) {
    return dtfCache[timezoneName];
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
  dtfCache[timezoneName] = dtf;

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

  return formatted.reduce<TokenizeResult>((result, cur) => {
    const pos = typeToPos[cur.type as TokenizeTarget];

    if (isPresent(pos)) {
      result[pos] = parseInt(cur.value, 10);
    }

    return result;
  }, [] as unknown as TokenizeResult);
}

function tokenToUtcDate(token: TokenizeResult) {
  const [year, monthPlusOne, day, hour, minute, second] = token;
  const month = monthPlusOne - 1;

  return new Date(Date.UTC(year, month, day, hour % 24, minute, second));
}
