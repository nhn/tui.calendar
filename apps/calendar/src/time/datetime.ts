import range from 'tui-code-snippet/array/range';

import { toPercent } from '@src/helpers/css';
import TZDate from '@src/time/date';
import { fill } from '@src/utils/array';
import { InvalidDateTimeFormatError } from '@src/utils/error';

import type { TimeUnit } from '@t/events';
import type { CellStyle, FormattedTimeString } from '@t/time/datetime';

export enum Day {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

export const WEEK_DAYS = 7;

interface ReduceIteratee {
  (previousValue: number, currentValue: number, currentIndex: number, array: number[]): number;
}

const dateFormatRx = /^(\d{4}[-|/]*\d{2}[-|/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;

const memo: {
  millisecondsTo: Record<string, number>;
  millisecondsFrom: Record<string, number>;
} = {
  millisecondsTo: {},
  millisecondsFrom: {},
};

const convByTimeUnit = [24, 60, 60, 1000];

/**
 * pad left zero characters
 */
export function leadingZero(number: number, length: number): string {
  let zero = '';
  let i = 0;

  if (String(number).length > length) {
    return String(number);
  }

  for (; i < length - 1; i += 1) {
    zero += '0';
  }

  return (zero + number).slice(length * -1);
}

function getHourForMeridiem(date: TZDate) {
  let hour = date.getHours();

  if (hour === 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour % 12;
  }

  return hour;
}

const tokenFunc = {
  YYYYMMDD(date: TZDate): string {
    return [
      date.getFullYear(),
      leadingZero(date.getMonth() + 1, 2),
      leadingZero(date.getDate(), 2),
    ].join('');
  },
  YYYY(date: TZDate): string {
    return String(date.getFullYear());
  },
  MM(date: TZDate): string {
    return leadingZero(date.getMonth() + 1, 2);
  },
  DD(date: TZDate): string {
    return leadingZero(date.getDate(), 2);
  },
  'HH:mm': function (date: TZDate): string {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  'hh:mm': function (date: TZDate): string {
    const hour = getHourForMeridiem(date);
    const minutes = date.getMinutes();

    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  hh(date: TZDate): string {
    const hour = getHourForMeridiem(date);

    return String(hour);
  },
  tt(date: TZDate): string {
    const hour = date.getHours();

    return hour < 12 ? 'am' : 'pm';
  },
};

export const MS_PER_DAY = 86400000;
export const MS_PER_HOUR = 3600000;
export const MS_PER_MINUTES = 60000;

/**
 * The number of milliseconds 20 minutes for event min duration
 */
export const MS_EVENT_MIN_DURATION = 20 * MS_PER_MINUTES;
export const MS_PER_THIRTY_MINUTES = 30 * 60 * 1000;
export const SIXTY_SECONDS = 60;

/**
 * Return formatted string as basis of supplied string.
 *
 * Supported Token Lists.
 *
 * - YYYY => 1988
 * - MM => 01 ~ 12
 * - DD => 01 ~ 31
 * - YYYYMMDD => 19880925
 */
export function toFormat(date: TZDate, strFormat: string): string {
  let result = strFormat;

  Object.entries(tokenFunc).forEach(([token, converter]: [string, (d: TZDate) => string]) => {
    result = result.replace(token, converter(date));
  });

  return result;
}

/**
 * convert to milliseconds
 */
function convMilliseconds(type: TimeUnit, value: number, iteratee: ReduceIteratee): number {
  const index: Partial<Record<TimeUnit, number>> = {
    date: 0,
    hour: 1,
    minute: 2,
    second: 3,
  };

  if (!(type in index) || isNaN(value)) {
    return 0;
  }

  return [value].concat(convByTimeUnit.slice(index[type])).reduce(iteratee);
}

/**
 * Convert value to milliseconds
 */
export function millisecondsFrom(type: TimeUnit, value: number): number {
  const cache = memo.millisecondsFrom;
  const key = type + value;

  if (cache[key]) {
    return cache[key];
  }

  const result = convMilliseconds(type, value, (m: number, v: number) => m * v);

  if (!result) {
    return 0;
  }

  cache[key] = result;

  return cache[key];
}

/**
 * Return 00:00:00 supplied date
 */
export function toStartOfDay(date?: number | TZDate | Date): TZDate {
  const d = date ? new TZDate(date) : new TZDate();
  d.setHours(0, 0, 0, 0);

  return d;
}

/**
 * Make date array from supplied parameters
 */
export function makeDateRange(startDate: TZDate, endDate: TZDate, step: number): TZDate[] {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const date = new TZDate(startDate);
  const result: TZDate[] = [];
  let cursor = startTime;

  while (cursor <= endTime && endTime >= date.getTime()) {
    result.push(new TZDate(date));
    cursor = cursor + step;
    date.addMilliseconds(step);
  }

  return result;
}

/**
 * Clone supplied date
 */
export function clone(date: TZDate): TZDate {
  return new TZDate(date);
}

/**
 * Compare two dates.
 *
 * when first date is latest then seconds then return -1.
 *
 * return +1 reverse, and return 0 is same.
 */
export function compare(d1: TZDate, d2: TZDate): number {
  const _d1 = d1.getTime();
  const _d2 = d2.getTime();

  if (_d1 < _d2) {
    return -1;
  }
  if (_d1 > _d2) {
    return 1;
  }

  return 0;
}

export function isSameYear(d1: TZDate, d2: TZDate): boolean {
  return d1.getFullYear() === d2.getFullYear();
}

export function isSameMonth(d1: TZDate, d2: TZDate): boolean {
  return isSameYear(d1, d2) && d1.getMonth() === d2.getMonth();
}

export function isSameDate(d1: TZDate, d2: TZDate): boolean {
  return isSameMonth(d1, d2) && d1.getDate() === d2.getDate();
}

export function max(d1: TZDate, d2: TZDate): TZDate {
  return compare(d1, d2) === 1 ? d1 : d2;
}

export function min(d1: TZDate, d2: TZDate): TZDate {
  return compare(d1, d2) === -1 ? d1 : d2;
}

/**
 * Convert date string to date object.
 * Only listed below formats available.
 *
 * - YYYYMMDD
 * - YYYY/MM/DD
 * - YYYY-MM-DD
 * - YYYY/MM/DD HH:mm:SS
 * - YYYY-MM-DD HH:mm:SS
 */
export function parse(str: string, fixMonth = -1): TZDate {
  const matches = str.match(dateFormatRx);
  let separator;
  let ymd;
  let hms;

  if (!matches) {
    throw new InvalidDateTimeFormatError(str);
  }

  if (str.length > 8) {
    // YYYY/MM/DD
    // YYYY-MM-DD
    // YYYY/MM/DD HH:mm:SS
    // YYYY-MM-DD HH:mm:SS
    separator = ~str.indexOf('/') ? '/' : '-';
    const result = matches.splice(1);

    ymd = result[0].split(separator);
    hms = result[1] ? result[1].split(':') : [0, 0, 0];
  } else {
    // YYYYMMDD
    const [result] = matches;
    ymd = [result.substr(0, 4), result.substr(4, 2), result.substr(6, 2)];
    hms = [0, 0, 0];
  }

  return new TZDate().setWithRaw(
    Number(ymd[0]),
    Number(ymd[1]) + fixMonth,
    Number(ymd[2]),
    Number(hms[0]),
    Number(hms[1]),
    Number(hms[2]),
    0
  );
}

/**
 * Return 23:59:59 supplied date.
 * If you want to use milliseconds, use format 'YYYY-MM-DDTHH:mm:ss.sssZ' based on http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 */
export function toEndOfDay(date?: number | TZDate): TZDate {
  const d = date ? new TZDate(date) : new TZDate();
  d.setHours(23, 59, 59, 999);

  return d;
}

export function isWeekend(day: Day): boolean {
  return day === Day.SUN || day === Day.SAT;
}

export function isSunday(day: Day): boolean {
  return day === Day.SUN;
}

export function isSaturday(day: Day): boolean {
  return day === Day.SAT;
}

/**
 * Whether date is between supplied dates with date value?
 */
export function isBetweenWithDate(d: TZDate, d1: TZDate, d2: TZDate): boolean {
  const format = 'YYYYMMDD';
  const n = parseInt(toFormat(d, format), 10);
  const n1 = parseInt(toFormat(d1, format), 10);
  const n2 = parseInt(toFormat(d2, format), 10);

  return n1 <= n && n <= n2;
}

export function toStartOfMonth(date: TZDate): TZDate {
  const startDate = new TZDate(date);

  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  return startDate;
}

export function toStartOfYear(d: TZDate): TZDate {
  return new TZDate(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}

export function toEndOfMonth(date: TZDate): TZDate {
  const endDate = toStartOfMonth(date);

  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59, 999);

  return endDate;
}

/**
 * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
 */
export function getRowStyleInfo(
  days: number,
  narrowWeekend: boolean,
  startDayOfWeek: number,
  workweek: boolean
): { rowStyleInfo: CellStyle[]; cellWidthMap: string[][] } {
  const limitDaysToApplyNarrowWeekend = 5;
  const uniformWidth = 100 / days;
  const wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
  let accumulatedWidth = 0;
  const dates = range(startDayOfWeek, WEEK_DAYS).concat(range(days)).slice(0, WEEK_DAYS);

  narrowWeekend = workweek ? false : narrowWeekend;

  const rowStyleInfo = dates.map((day: number) => {
    let width = narrowWeekend ? wideWidth : uniformWidth;
    if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && isWeekend(day)) {
      width = wideWidth / 2;
    }

    const model = {
      width,
      left: accumulatedWidth,
    };

    accumulatedWidth += width;

    return model;
  });

  const { length } = rowStyleInfo;
  const cellWidthMap = fill(length, fill(length, 0));

  rowStyleInfo.forEach(({ width }, index) => {
    for (let i = 0; i <= index; i += 1) {
      for (let j = index; j < length; j += 1) {
        cellWidthMap[i][j] += width;
      }
    }
  });

  cellWidthMap[0][length - 1] = 100;

  return {
    rowStyleInfo,
    cellWidthMap: cellWidthMap.map((widthList) => widthList.map(toPercent)),
  };
}

export function addMilliseconds(d: TZDate, step: number) {
  const date = clone(d);
  date.setMilliseconds(d.getMilliseconds() + step);

  return date;
}

export function addMinutes(d: TZDate, step: number) {
  const date = clone(d);
  date.setMinutes(d.getMinutes() + step);

  return date;
}

export function addHours(d: TZDate, step: number) {
  const date = clone(d);
  date.setHours(d.getHours() + step);

  return date;
}

export function setTimeStrToDate(d: TZDate, timeStr: FormattedTimeString) {
  const date = clone(d);
  date.setHours(...(timeStr.split(':').map(Number) as [number, number]));

  return date;
}

export function addDate(d: TZDate, step: number) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

export function subtractDate(d: TZDate, steps: number) {
  const date = clone(d);
  date.setDate(d.getDate() - steps);

  return date;
}

/**
 * Inspired by `date-fns`
 *
 * See more: https://github.com/date-fns/date-fns/blob/master/src/addMonths/index.ts
 */
export function addMonths(d: TZDate, step = 1) {
  const date = clone(d);

  if (step !== 0) {
    const dayOfMonth = date.getDate();
    const endOfDesiredMonth = new TZDate(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + step + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    }

    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
  }

  return date;
}

export function addYear(d: TZDate, step: number) {
  const date = clone(d);
  date.setFullYear(d.getFullYear() + step);

  return date;
}

export function getDateDifference(d1: TZDate, d2: TZDate) {
  const _d1 = new TZDate(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const _d2 = new TZDate(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();

  return Math.round((_d1 - _d2) / MS_PER_DAY);
}
