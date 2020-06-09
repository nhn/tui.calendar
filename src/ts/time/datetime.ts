/**
 * @fileoverview datetime utility module
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEachOwnProperties from 'tui-code-snippet/collection/forEachOwnProperties';
import range from 'tui-code-snippet/array/range';
import inArray from 'tui-code-snippet/array/inArray';
import forEachArray from 'tui-code-snippet/collection/forEachArray';
import TZDate from '@src/time/date';
import { TimeUnit } from '@src/model';

interface ReduceIteratee {
  (previousValue: number, currentValue: number, currentIndex: number, array: number[]): number;
}
export type RawDate = {
  y: number;
  M: number;
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
};

const dateFormatRx = /^(\d{4}[-|/]*\d{2}[-|/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;

const memo: {
  millisecondsTo: Record<string, number>;
  millisecondsFrom: Record<string, number>;
} = {
  millisecondsTo: {},
  millisecondsFrom: {}
};

const convByTimeUnit = [24, 60, 60, 1000];

/**
 * pad left zero characters.
 * @param {number} number number value to pad zero.
 * @param {number} length pad length to want.
 * @returns {string} padded string.
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
  /**
   * @param {TZDate} date date object.
   * @returns {string} YYYYMMDD
   */
  YYYYMMDD(date: TZDate): string {
    return [
      date.getFullYear(),
      leadingZero(date.getMonth() + 1, 2),
      leadingZero(date.getDate(), 2)
    ].join('');
  },
  /**
   * @param {TZDate} date date object
   * @returns {string} four digit year number
   */
  YYYY(date: TZDate): string {
    return String(date.getFullYear());
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} two digit month number
   */
  MM(date: TZDate): string {
    return leadingZero(date.getMonth() + 1, 2);
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} two digit date number
   */
  DD(date: TZDate): string {
    return leadingZero(date.getDate(), 2);
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} HH:mm
   */
  'HH:mm': function(date: TZDate): string {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} hh:mm
   */
  'hh:mm': function(date: TZDate): string {
    const hour = getHourForMeridiem(date);
    const minutes = date.getMinutes();

    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} hour for meridiem
   */
  hh(date: TZDate): string {
    const hour = getHourForMeridiem(date);

    return String(hour);
  },

  /**
   * @param {TZDate} date date object
   * @returns {string} tt
   */
  tt(date: TZDate): string {
    const hour = date.getHours();

    return hour < 12 ? 'am' : 'pm';
  }
};

/**
 * The number of milliseconds one day.
 * @type {number}
 */
export const MILLISECONDS_PER_DAY = 86400000;

/**
 * The number of milliseconds one hour.
 * @type {number}
 */
export const MILLISECONDS_PER_HOUR = 3600000;

/**
 * The number of milliseconds one minutes.
 * @type {number}
 */
export const MILLISECONDS_PER_MINUTES = 60000;

/**
 * The number of milliseconds 20 minutes for schedule min duration
 * @type {number}
 */
export const MILLISECONDS_SCHEDULE_MIN_DURATION = 20 * 60000;

export const SIXTY_SECONDS = 60;

export const SIXTY_MINUTES = 60;

/**
 * Return formatted string as basis of supplied string.
 *
 * Supported Token Lists.
 *
 * - YYYY => 1988
 * - MM => 01 ~ 12
 * - DD => 01 ~ 31
 * - YYYYMMDD => 19880925
 * @param {TZDate} date String want to formatted.
 * @param {string} strFormat format string.
 * @returns {string}  Formatted date string.
 */
export function toFormat(date: TZDate, strFormat: string): string {
  let result = strFormat;
  forEachOwnProperties(tokenFunc, (converter: Function, token: string) => {
    result = result.replace(token, converter(date));
  });

  return result;
}

/**
 * convert milliseconds
 * @param {TimeUnit} type - type of value.
 * @param {number} value - value to convert.
 * @param {function} iteratee - iteratee function to use reduce.
 * @returns {number} converted value.
 */
function _convMilliseconds(type: TimeUnit, value: number, iteratee: ReduceIteratee): number {
  const index: Partial<Record<TimeUnit, number>> = {
    date: 0,
    hour: 1,
    minute: 2,
    second: 3
  };

  if (!(type in index) || isNaN(value)) {
    return 0;
  }

  return [value].concat(convByTimeUnit.slice(index[type])).reduce(iteratee);
}

/**
 * Convert milliseconds value to other type
 * @param {TimeUnit} type convert to type want to. support "day", "hour",
 *  "minutes", "seconds" only.
 * @param {number} value - value to convert.
 * @returns {number} converted value.
 */
export function millisecondsTo(type: TimeUnit, value: number): number {
  const cache = memo.millisecondsTo;
  const key = type + value;

  if (cache[key]) {
    return cache[key];
  }

  const result = _convMilliseconds(type, value, (m: number, v: number) => {
    return m / v;
  });

  if (!result) {
    return 0;
  }

  cache[key] = result;

  return cache[key];
}

/**
 * Convert value to milliseconds
 * @param {TimeUnit} type - type of supplied value. support "hour", "minutes", "seconds" only.
 * @param {number} value - value to convert.
 * @returns {number} converted value.
 */
export function millisecondsFrom(type: TimeUnit, value: number): number {
  const cache = memo.millisecondsFrom;
  const key = type + value;

  if (cache[key]) {
    return cache[key];
  }

  const result = _convMilliseconds(type, value, (m: number, v: number) => {
    return m * v;
  });

  if (!result) {
    return 0;
  }

  cache[key] = result;

  return cache[key];
}

/**
 * Convert hours to minutes
 * @param {number} hours - hours
 * @returns {number} minutes
 */
export function minutesFromHours(hours: number): number {
  return hours * 60;
}

/**
 * Return 00:00:00 supplied date.
 * @param {TZDate} date date. if undefined, use now.
 * @returns {TZDate} start date.
 */
export function toStartOfDay(date?: number | TZDate): TZDate {
  const d = date ? new TZDate(date) : new TZDate();
  d.setHours(0, 0, 0, 0);

  return d;
}

/**
 * Make date array from supplied paramters.
 * @param {TZDate} start Start date.
 * @param {TZDate} end End date.
 * @param {number} step The number of milliseconds to use increment.
 * @returns {TZDate[]} TZDate array.
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
 * Clone supplied date.
 * @param {TZDate} date date object to clone.
 * @returns {TZDate} Cloned date object
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
 * @param {TZDate} d1 Date object to compare.
 * @param {TZDate} d2 Date object to compare.
 * @returns {number} result of compare
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

/**
 * @param {TZDate} d1 - date one
 * @param {TZDate} d2 - date two
 * @returns {boolean} is two date are same year?
 */
export function isSameYear(d1: TZDate, d2: TZDate): boolean {
  return d1.getFullYear() === d2.getFullYear();
}

/**
 * @param {TZDate} d1 - date one
 * @param {TZDate} d2 - date two
 * @returns {boolean} is two date are same year, month?
 */
export function isSameMonth(d1: TZDate, d2: TZDate): boolean {
  return isSameYear(d1, d2) && d1.getMonth() === d2.getMonth();
}

/**
 * @param {TZDate} d1 - date one
 * @param {TZDate} d2 - date two
 * @returns {boolean} is two date are same year, month, date?
 */
export function isSameDate(d1: TZDate, d2: TZDate): boolean {
  return isSameMonth(d1, d2) && d1.getDate() === d2.getDate();
}

/**
 * @param {TZDate} d1 - date one
 * @param {TZDate} d2 - date two
 * @returns {boolean} is two date are same?
 */
export function isSame(d1: TZDate, d2: TZDate): boolean {
  return compare(d1, d2) === 0;
}

/**
 * Check supplied parameter is valid date object.
 * @param {*} d Object to validate.
 * @returns {boolean} return true when parameter is valid date object.
 */
export function isValid(d: TZDate): boolean {
  if (d instanceof TZDate) {
    return !isNaN(d.getTime());
  }

  return false;
}

/**
 * Convert date string to date object.
 *
 * Only listed below formats avaliable.
 *
 * - YYYYMMDD
 * - YYYY/MM/DD
 * - YYYY-MM-DD
 * - YYYY/MM/DD HH:mm:SS
 * - YYYY-MM-DD HH:mm:SS
 *
 * @param {string} str Formatted string.
 * @param {number} [fixMonth=-1] - number for fix month calculating.
 * @throws {InvalidArgumentException}
 * @returns {TZDate} Converted Date object. when supplied str is not available then return false.
 */
export function parse(str: string, fixMonth = -1): TZDate {
  const matches = str.match(dateFormatRx);
  let separator;
  let ymd;
  let hms;

  if (!matches) {
    throw new Error('parameter is not valid format');
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
 * Return date object from Date.
 * @param {TZDate} date date
 * @returns {object} Date object.
 */
export function toRaw(date: TZDate): RawDate {
  return {
    y: date.getFullYear(),
    M: date.getMonth(),
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds()
  };
}

/**
 * Return 23:59:59 supplied date.
 * @param {TZDate} date date. if undefined, use now.
 * @returns {TZDate} end date.
 */
export function toEndOfDay(date?: number | TZDate): TZDate {
  const d = date ? new TZDate(date) : new TZDate();
  d.setHours(23, 59, 59, 999);

  return d;
}

/**
 * Get that day is weekend
 * @param {number} day number
 * @returns {boolean} true if weekend or false
 */
export function isWeekend(day: number): boolean {
  return day === 0 || day === 6;
}

/**
 * Whether date is between supplied dates with date value?
 * @param {TZDate} d - target date
 * @param {TZDate} d1 - from date
 * @param {TZDate} d2 - to date
 * @returns {boolean} is between?
 */
export function isBetweenWithDate(d: TZDate, d1: TZDate, d2: TZDate): boolean {
  const format = 'YYYYMMDD';
  const n = parseInt(toFormat(d, format), 10);
  const n1 = parseInt(toFormat(d1, format), 10);
  const n2 = parseInt(toFormat(d2, format), 10);

  return n1 <= n && n <= n2;
}

export function toStartOfMinutes(date: TZDate): TZDate {
  const startDate = new TZDate(date);

  startDate.setMinutes(0, 0, 0);

  return startDate;
}

export function toEndOfMinutes(date: TZDate): TZDate {
  const startDate = new TZDate(date);

  startDate.setMinutes(59, 59, 999);

  return startDate;
}

/**
 * Get start date of specific month
 * @param {TZDate} date - date to get start date
 * @returns {TZDate} start date of supplied month
 */
export function toStartOfMonth(date: TZDate): TZDate {
  const startDate = new TZDate(date);

  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  return startDate;
}

export function toStartOfYear(d: TZDate): TZDate {
  return new TZDate(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}

/**
 * Get end date of specific month
 * @param {TZDate} date - date to get end date
 * @returns {TZDate} end date of supplied month
 */
export function toEndOfMonth(date: TZDate): TZDate {
  const endDate = toStartOfMonth(date);

  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59, 999);

  return endDate;
}

export function toEndOfYear(d: TZDate): TZDate {
  return new TZDate(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

/**
 * Return 2-dimensional array month calendar
 *
 * dates that different month with given date are negative values
 * @param {TZDate} month - date want to calculate month calendar
 * @param {object} options - options
 * @param {number} [options.startDayOfWeek=0] - start day of week
 * @param {boolean} options.isAlways6Week - whether the number of weeks are always 6
 * @param {number} options.visibleWeeksCount visible weeks count
 * @param {boolean} options.workweek - only show work week
 * @param {function} [iteratee] - iteratee for customizing calendar object
 * @returns {Array.<TZDate[]>} calendar 2d array
 */
export function arr2dCalendar(
  month: TZDate,
  options: {
    startDayOfWeek: number;
    visibleWeeksCount?: number;
    workweek?: boolean;
    isAlways6Week?: boolean;
  }
): Array<TZDate[]> {
  const calendar: Array<TZDate[]> = [];
  const { startDayOfWeek, visibleWeeksCount, workweek, isAlways6Week = true } = options;
  let start;
  let end;
  let totalDate;
  let week;

  if (visibleWeeksCount) {
    start = new TZDate(month);
    end = new TZDate(month);
    end.addDate(7 * (visibleWeeksCount - 1));
  } else {
    start = toStartOfMonth(month);
    end = toEndOfMonth(month);
  }

  // create day number array by startDayOfWeek number
  // 4 -> [4, 5, 6, 0, 1, 2, 3]
  // 2 -> [2, 3, 4, 5, 6, 0, 1]
  const weekArr = range(startDayOfWeek, 7)
    .concat(range(7))
    .slice(0, 7);
  const startIndex = inArray(start.getDay(), weekArr);
  const endIndex = inArray(end.getDay(), weekArr);
  // free dates after last date of this month
  const afterDates = 7 - (endIndex + 1);

  if (visibleWeeksCount) {
    totalDate = 7 * visibleWeeksCount;
  } else {
    totalDate = isAlways6Week ? 7 * 6 : startIndex + end.getDate() + afterDates;
  }
  const cursor = toStartOfDay(start).addDate(-startIndex);
  // iteratee all dates to render
  forEachArray(range(totalDate), (i: number) => {
    if (!(i % 7)) {
      // group each date by week
      week = calendar[i / 7] = [];
    }

    const date = toStartOfDay(cursor);
    if (!workweek || !isWeekend(date.getDay())) {
      week.push(date);
    }

    // add date
    cursor.setDate(cursor.getDate() + 1);
  });

  return calendar;
}

/**
 * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
 *
 * @param {number} days - day length of week
 * @param {boolean} narrowWeekend - narrow weekend
 * @param {number} startDayOfWeek - start day of week
 * @param {boolean} workweek - only show work week
 * @returns {Array} day, left, width
 */
export function getGridLeftAndWidth(
  days: number,
  narrowWeekend: boolean,
  startDayOfWeek: number,
  workweek: boolean
): Array<{
  day: number;
  width: number;
  left: number;
}> {
  const limitDaysToApplyNarrowWeekend = 5;
  const uniformWidth = 100 / days;
  const wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
  let accumulatedWidth = 0;
  let dates = range(startDayOfWeek, 7)
    .concat(range(days))
    .slice(0, 7);

  if (workweek) {
    dates = dates.filter((day: number) => {
      return !isWeekend(day);
    });
  }

  narrowWeekend = workweek ? false : narrowWeekend;

  return dates.map((day: number) => {
    let width = narrowWeekend ? wideWidth : uniformWidth;
    if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && isWeekend(day)) {
      width = wideWidth / 2;
    }

    const model = {
      day,
      width,
      left: accumulatedWidth
    };

    accumulatedWidth += width;

    return model;
  });
}

export function addMilliseconds(d: TZDate, step: number) {
  const date = clone(d);
  date.setMilliseconds(d.getMilliseconds() + step);

  return date;
}

export function addSeconds(d: TZDate, step: number) {
  const date = clone(d);
  date.setSeconds(d.getSeconds() + step);

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

export function addDate(d: TZDate, step: number) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

export function addMonth(d: TZDate, step: number) {
  const date = clone(d);
  date.setMonth(d.getMonth() + step);

  return date;
}

export function addYear(d: TZDate, step: number) {
  const date = clone(d);
  date.setFullYear(d.getFullYear() + step);

  return date;
}

export function getTimezoneDifference(d: TZDate, timezoneOffset = 0) {
  return d.getTimezoneOffset() - timezoneOffset;
}

export function getDateDifference(d1: TZDate, d2: TZDate) {
  const _d1 = new TZDate(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const _d2 = new TZDate(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();

  return Math.round((_d1 - _d2) / MILLISECONDS_PER_DAY);
}
