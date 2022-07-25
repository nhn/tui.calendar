import type { DateInterface } from '@toast-ui/date';

import { MS_PER_MINUTES } from '@src/time/datetime';
import {
  calculateTimezoneOffset,
  date as createDate,
  getLocalTimezoneOffset,
} from '@src/time/timezone';
import { isPresent, isString } from '@src/utils/type';

function getTZOffsetMSDifference(offset: number) {
  return (getLocalTimezoneOffset() - offset) * MS_PER_MINUTES;
}

/**
 * Custom Date Class to handle timezone offset.
 *
 * For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/tzdate.md|TZDate} in guide.
 *
 * @class TZDate
 * @param {number|TZDate|Date|string} date - date value to be converted. If date is number or string, it should be eligible to parse by Date constructor.
 */
export default class TZDate {
  private tzOffset: number | null = null;

  private d: DateInterface;

  constructor(...args: any[]) {
    if (args[0] instanceof TZDate) {
      this.d = createDate(args[0].getTime());
    } else {
      this.d = createDate(...args);
    }
  }

  /**
   * Get the string representation of the date.
   * @returns {string} string representation of the date.
   */
  toString() {
    return this.d.toString();
  }

  /**
   * Add years to the instance.
   * @param {number} y - number of years to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addFullYear(y: number): TZDate {
    this.setFullYear(this.getFullYear() + y);

    return this;
  }

  /**
   * Add months to the instance.
   * @param {number} m - number of months to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addMonth(m: number): TZDate {
    this.setMonth(this.getMonth() + m);

    return this;
  }

  /**
   * Add dates to the instance.
   * @param {number} d - number of days to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addDate(d: number): TZDate {
    this.setDate(this.getDate() + d);

    return this;
  }

  /**
   * Add hours to the instance.
   * @param {number} h - number of hours to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addHours(h: number): TZDate {
    this.setHours(this.getHours() + h);

    return this;
  }

  /**
   * Add minutes to the instance.
   * @param {number} M - number of minutes to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addMinutes(M: number): TZDate {
    this.setMinutes(this.getMinutes() + M);

    return this;
  }

  /**
   * Add seconds to the instance.
   * @param {number} s - number of seconds to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addSeconds(s: number): TZDate {
    this.setSeconds(this.getSeconds() + s);

    return this;
  }

  /**
   * Add milliseconds to the instance.
   * @param {number} ms - number of milliseconds to be added.
   * @returns {TZDate} - returns the instance itself.
   */
  addMilliseconds(ms: number): TZDate {
    this.setMilliseconds(this.getMilliseconds() + ms);

    return this;
  }

  /* eslint-disable max-params*/
  /**
   * Set the date and time all at once.
   * @param {number} y - year
   * @param {number} m - month
   * @param {number} d - date
   * @param {number} h - hours
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {TZDate} - returns the instance itself.
   */
  setWithRaw(y: number, m: number, d: number, h: number, M: number, s: number, ms: number): TZDate {
    this.setFullYear(y, m, d);
    this.setHours(h, M, s, ms);

    return this;
  }

  /**
   * Convert the instance to the native `Date` object.
   * @returns {Date} - The native `Date` object.
   */
  toDate(): Date {
    return this.d.toDate();
  }

  /**
   * Get the value of the date. (milliseconds since 1970-01-01 00:00:00 (UTC+0))
   * @returns {number} - value of the date.
   */
  valueOf(): number {
    return this.getTime();
  }

  /**
   * Get the timezone offset from UTC in minutes.
   * @returns {number} - timezone offset in minutes.
   */
  getTimezoneOffset() {
    return this.tzOffset ?? this.d.getTimezoneOffset();
  }

  // Native properties
  /**
   * Get milliseconds which is converted by timezone
   * @returns {number} milliseconds
   */
  getTime(): number {
    return this.d.getTime();
  }

  /**
   * Get the year of the instance.
   * @returns {number} - full year
   */
  getFullYear(): number {
    return this.d.getFullYear();
  }

  /**
   * Get the month of the instance. (zero-based)
   * @returns {number} - month
   */
  getMonth(): number {
    return this.d.getMonth();
  }

  /**
   * Get the date of the instance.
   * @returns {number} - date
   */
  getDate(): number {
    return this.d.getDate();
  }

  /**
   * Get the hours of the instance.
   * @returns {number} - hours
   */
  getHours(): number {
    return this.d.getHours();
  }

  /**
   * Get the minutes of the instance.
   * @returns {number} - minutes
   */
  getMinutes(): number {
    return this.d.getMinutes();
  }

  /**
   * Get the seconds of the instance.
   * @returns {number} - seconds
   */
  getSeconds(): number {
    return this.d.getSeconds();
  }

  /**
   * Get the milliseconds of the instance.
   * @returns {number} - milliseconds
   */
  getMilliseconds(): number {
    return this.d.getMilliseconds();
  }

  /**
   * Get the day of the week of the instance.
   * @returns {number} - day of the week
   */
  getDay(): number {
    return this.d.getDay();
  }

  /**
   * Sets the instance to the time represented by a number of milliseconds since 1970-01-01 00:00:00 (UTC+0).
   * @param {number} t - number of milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setTime(t: number): number {
    return this.d.setTime(t);
  }

  /**
   * Sets the year-month-date of the instance. Equivalent to calling `setFullYear` of `Date` object.
   * @param {number} y - year
   * @param {number} m - month (zero-based)
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setFullYear(y: number, m = this.getMonth(), d = this.getDate()): number {
    return this.d.setFullYear(y, m, d);
  }

  /**
   * Sets the month of the instance. Equivalent to calling `setMonth` of `Date` object.
   * @param {number} m - month (zero-based)
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setMonth(m: number, d = this.getDate()): number {
    return this.d.setMonth(m, d);
  }

  /**
   * Sets the date of the instance. Equivalent to calling `setDate` of `Date` object.
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setDate(d: number): number {
    return this.d.setDate(d);
  }

  /**
   * Sets the hours of the instance. Equivalent to calling `setHours` of `Date` object.
   * @param {number} h - hours
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setHours(
    h: number,
    M = this.getMinutes(),
    s = this.getSeconds(),
    ms = this.getMilliseconds()
  ): number {
    return this.d.setHours(h, M, s, ms);
  }

  /**
   * Sets the minutes of the instance. Equivalent to calling `setMinutes` of `Date` object.
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setMinutes(M: number, s = this.getSeconds(), ms = this.getMilliseconds()): number {
    return this.d.setMinutes(M, s, ms);
  }

  /**
   * Sets the seconds of the instance. Equivalent to calling `setSeconds` of `Date` object.
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setSeconds(s: number, ms = this.getMilliseconds()): number {
    return this.d.setSeconds(s, ms);
  }

  /**
   * Sets the milliseconds of the instance. Equivalent to calling `setMilliseconds` of `Date` object.
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */
  setMilliseconds(ms: number): number {
    return this.d.setMilliseconds(ms);
  }

  /**
   * Set the timezone offset of the instance.
   * @param {string|number} tzValue - The name of timezone(IANA name) or timezone offset(in minutes).
   * @returns {TZDate} - New instance with the timezone offset.
   */
  tz(tzValue: string | 'Local' | number) {
    if (tzValue === 'Local') {
      return new TZDate(this.getTime());
    }

    const tzOffset = isString(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;

    const newTZDate = new TZDate(this.getTime() - getTZOffsetMSDifference(tzOffset));
    newTZDate.tzOffset = tzOffset;

    return newTZDate;
  }

  /**
   * Get the new instance following the system's timezone.
   * If the system timezone is different from the timezone of the instance,
   * the instance is converted to the system timezone.
   *
   * Instance's `tzOffset` property will be ignored if there is a `tzValue` parameter.
   *
   * @param {string|number} tzValue - The name of timezone(IANA name) or timezone offset(in minutes).
   * @returns {TZDate} - New instance with the system timezone.
   */
  local(tzValue?: string | number) {
    if (isPresent(tzValue)) {
      const tzOffset = isString(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
      return new TZDate(this.getTime() + getTZOffsetMSDifference(tzOffset));
    }

    return new TZDate(
      this.getTime() + (isPresent(this.tzOffset) ? getTZOffsetMSDifference(this.tzOffset) : 0)
    );
  }
}
