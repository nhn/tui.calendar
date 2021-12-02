import { DateInterface } from '@toast-ui/date';

import { date as newDate, getTimezoneFactory, setDateConstructor } from '@src/time/timezone';

let createDate = newDate;

/**
 * Timezone Date Class
 * @param {number|TZDate|Date|string} date - date to be converted
 */
export default class TZDate {
  private d: DateInterface;

  /**
   * Timezone Date Class
   * @param {number|TZDate|Date|string} date - date to be converted
   */
  constructor(...args: any[]) {
    if (args[0] instanceof TZDate) {
      this.d = createDate(args[0].getTime());
    } else {
      this.d = createDate(...args);
    }
  }

  static setDateConstructor = setDateConstructor;

  static setTimezone(value: number | string | null) {
    createDate = value === null ? newDate : getTimezoneFactory(value);
  }

  toString() {
    return this.d.toString();
  }

  addDate(d: number): TZDate {
    this.setDate(this.getDate() + d);

    return this;
  }

  addMinutes(M: number): TZDate {
    this.setMinutes(this.getMinutes() + M);

    return this;
  }

  addMilliseconds(ms: number): TZDate {
    this.setMilliseconds(this.getMilliseconds() + ms);

    return this;
  }

  /* eslint-disable max-params*/
  setWithRaw(y: number, m: number, d: number, h: number, M: number, s: number, ms: number): TZDate {
    this.setFullYear(y, m, d);
    this.setHours(h, M, s, ms);

    return this;
  }

  toDate(): Date {
    return this.d.toDate();
  }

  toCustomDate(): DateInterface {
    return createDate(this.d.getTime());
  }

  valueOf(): number {
    return this.getTime();
  }

  getTimezoneOffset() {
    return this.d.getTimezoneOffset();
  }

  // Native properties
  /**
   * Get milliseconds which is converted by timezone
   * @returns {number} milliseconds
   */
  getTime(): number {
    return this.d.getTime();
  }

  getFullYear(): number {
    return this.d.getFullYear();
  }

  getMonth(): number {
    return this.d.getMonth();
  }

  getDate(): number {
    return this.d.getDate();
  }

  getHours(): number {
    return this.d.getHours();
  }

  getMinutes(): number {
    return this.d.getMinutes();
  }

  getSeconds(): number {
    return this.d.getSeconds();
  }

  getMilliseconds(): number {
    return this.d.getMilliseconds();
  }

  getDay(): number {
    return this.d.getDay();
  }

  setTime(t: number): number {
    return this.d.setTime(t);
  }

  setFullYear(y: number, m = this.getMonth(), d = this.getDate()): number {
    return this.d.setFullYear(y, m, d);
  }

  setMonth(m: number, d = this.getDate()): number {
    return this.d.setMonth(m, d);
  }

  setDate(d: number): number {
    return this.d.setDate(d);
  }

  setHours(
    h: number,
    M = this.getMinutes(),
    s = this.getSeconds(),
    ms = this.getMilliseconds()
  ): number {
    return this.d.setHours(h, M, s, ms);
  }

  setMinutes(M: number, s = this.getSeconds(), ms = this.getMilliseconds()): number {
    return this.d.setMinutes(M, s, ms);
  }

  setSeconds(s: number, ms = this.getMilliseconds()): number {
    return this.d.setSeconds(s, ms);
  }

  setMilliseconds(ms: number): number {
    return this.d.setMilliseconds(ms);
  }
}
