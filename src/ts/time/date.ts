/**
 * @fileoverview timezone
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import { DateType } from '@src/model';
import isString from 'tui-code-snippet/type/isString';
import isUndefined from 'tui-code-snippet/type/isUndefined';

const MIN_TO_MS = 60 * 1000;
/**
 * Get the timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 */
function getTimezoneOffset(timestamp: number = Date.now()): number {
  return new Date(timestamp).getTimezoneOffset() * MIN_TO_MS;
}

const nativeOffsetMs = getTimezoneOffset();
let isSetByTimezoneOption = false;
let customOffsetMs = nativeOffsetMs;
let timezoneOffsetCallback: Function;

/**
 * Get the custome timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 */
function getCustomTimezoneOffset(timestamp?: number): number {
  if (!isSetByTimezoneOption && timezoneOffsetCallback) {
    return timezoneOffsetCallback(timestamp) * MIN_TO_MS;
  }

  return customOffsetMs;
}

/**
 * Convert to local time
 * @param {number} time - time
 * @returns {number} local time
 */
function getLocalTime(time: number): number {
  const timezoneOffset = getTimezoneOffset(time);
  const customTimezoneOffset = getCustomTimezoneOffset(time);
  const timezoneOffsetDiff = customTimezoneOffset ? 0 : nativeOffsetMs - timezoneOffset;
  const localTime = time - customTimezoneOffset + timezoneOffset + timezoneOffsetDiff;

  return localTime;
}

/**
 * Create a Date instance with multiple arguments
 * @returns {Date}
 */
function createDateWithMultipleArgs(
  year: number,
  month: number,
  date: number,
  ...args: number[]
): Date {
  const utc = Date.UTC(year, month, date, ...args);

  return new Date(utc + getTimezoneOffset(utc));
}

/**
 * To convert a Date to TZDate as it is.
 * @param {TZDate|number|null} arg - date
 * @returns {Date}
 */
function createDateWithUTCTime(arg: DateType): Date {
  let time;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (arg instanceof TZDate) {
    time = arg.getUTCTime();
  } else if (typeof arg === 'number') {
    time = arg;
  } else if (arg === null) {
    time = 0;
  } else {
    throw new Error('Invalid Type');
  }

  return new Date(time);
}

/**
 * Convert time to local time. Those times are only from API and not from inner source code.
 * @param {Date|string} arg - date
 * @returns {Date}
 */
function createDateAsLocalTime(arg: DateType): Date {
  let time;

  if (arg instanceof Date) {
    time = arg.getTime();
  } else if (isString(arg)) {
    time = Date.parse(arg);
  } else {
    throw new Error('Invalid Type');
  }

  time = getLocalTime(time);

  return new Date(time);
}

/**
 * is it for local time? These type can be used from Calendar API.
 * @param {DateType} arg - date
 * @returns {boolean}
 */
function useLocalTimeConverter(arg: DateType): boolean {
  return arg instanceof Date || isString(arg);
}

/**
 * Timezone Date Class
 * @param {number|TZDate|Date|string} date - date to be converted
 */
export default class TZDate {
  private _date: Date;

  /**
   * Timezone Date Class
   * @param {number|TZDate|Date|string} date - date to be converted
   */
  constructor(year?: DateType | null, month?: number, day?: number, ...args: number[]) {
    const date = year || Date.now();
    let nativeDate;

    if (arguments.length > 1) {
      nativeDate = createDateWithMultipleArgs(
        year as number,
        month as number,
        day as number,
        ...args
      );
    } else if (useLocalTimeConverter(date)) {
      nativeDate = createDateAsLocalTime(date);
    } else {
      nativeDate = createDateWithUTCTime(date);
    }

    this._date = nativeDate;
  }

  /**
   * Get milliseconds which is converted by timezone
   * @returns {number} milliseconds
   */
  getTime(): number {
    const time = this._date.getTime();

    return time + getCustomTimezoneOffset(time) - getTimezoneOffset(time);
  }

  /**
   * Get UTC milliseconds
   * @returns {number} milliseconds
   */
  getUTCTime(): number {
    return this._date.getTime();
  }

  /**
   * toUTCString
   * @returns {string}
   */
  toUTCString(): string {
    return this._date.toUTCString();
  }

  /**
   * to Date
   * @returns {Date}
   */
  toDate(): Date {
    return this._date;
  }

  valueOf(): number {
    return this.getTime();
  }

  addDate(day: number): TZDate {
    this.setDate(this.getDate() + day);

    return this;
  }

  addMinutes(minutes: number): TZDate {
    this.setMinutes(this.getMinutes() + minutes);

    return this;
  }

  addMilliseconds(milliseconds: number): TZDate {
    this.setMilliseconds(this.getMilliseconds() + milliseconds);

    return this;
  }

  /* eslint-disable max-params*/
  setWithRaw(y: number, M: number, d: number, h: number, m: number, s: number, ms: number): TZDate {
    this.setFullYear(y, M, d);
    this.setHours(h, m, s, ms);

    return this;
  }

  /**
   * @returns {TZDate} local time
   */
  toLocalTime(): TZDate {
    const time = this.getTime();
    const utcTime = this.getUTCTime();
    const diff = time - utcTime;

    return new TZDate(utcTime - diff);
  }

  /**
   * Set offset
   * @param {number} offset - timezone offset based on minutes
   */
  static setOffset(offset: number) {
    customOffsetMs = offset * MIN_TO_MS;
  }

  /**
   * Set offset
   * @param {number} offset - timezone offset based on minutes
   */
  static setOffsetByTimezoneOption(offset: number) {
    this.setOffset(-offset);
    isSetByTimezoneOption = true;
  }

  /**
   * Get offset in case of `setByTimezoneOption`. Or return 0.
   * @returns {number} timezone offset offset minutes
   */
  static getOffset(): number {
    if (isSetByTimezoneOption) {
      return customOffsetMs / MIN_TO_MS;
    }

    return 0;
  }

  /**
   * Set a callback function to get timezone offset by timestamp
   * @param {function} callback - callback function
   */
  static setOffsetCallback(callback: Function) {
    timezoneOffsetCallback = callback;
  }

  /**
   * (Use this method only for testing)
   * Reset system timezone and custom timezone
   */
  static restoreOffset() {
    customOffsetMs = getTimezoneOffset();
  }

  // Native properties
  getDate(): number {
    return this._date.getDate();
  }

  getDay(): number {
    return this._date.getDay();
  }

  getFullYear(): number {
    return this._date.getFullYear();
  }

  getHours(): number {
    return this._date.getHours();
  }

  getMilliseconds(): number {
    return this._date.getMilliseconds();
  }

  getMinutes(): number {
    return this._date.getMinutes();
  }

  getMonth(): number {
    return this._date.getMonth();
  }

  getSeconds(): number {
    return this._date.getSeconds();
  }

  setDate(date: number): number {
    this._date.setDate(date);

    return this.getTime();
  }

  setFullYear(year: number, month?: number, date?: number): number {
    month = isUndefined(month) ? this.getMonth() : month;
    date = isUndefined(date) ? this.getDate() : date;

    this._date.setFullYear(year, month, date);

    return this.getTime();
  }

  setHours(hours: number, min?: number, sec?: number, ms?: number): number {
    min = isUndefined(min) ? this.getMinutes() : min;
    sec = isUndefined(sec) ? this.getSeconds() : sec;
    ms = isUndefined(ms) ? this.getMilliseconds() : ms;

    this._date.setHours(hours, min, sec, ms);

    return this.getTime();
  }

  setMilliseconds(ms: number): number {
    this._date.setMilliseconds(ms);

    return this.getTime();
  }

  setMinutes(min: number, sec?: number, ms?: number): number {
    sec = isUndefined(sec) ? this.getSeconds() : sec;
    ms = isUndefined(ms) ? this.getMilliseconds() : ms;

    this._date.setMinutes(min, sec, ms);

    return this.getTime();
  }

  setMonth(month: number, date?: number): number {
    date = isUndefined(date) ? this.getDate() : date;

    this._date.setMonth(month, date);

    return this.getTime();
  }

  setSeconds(sec: number, ms?: number): number {
    ms = isUndefined(ms) ? this.getMilliseconds() : ms;

    this._date.setSeconds(sec, ms);

    return this.getTime();
  }
}
