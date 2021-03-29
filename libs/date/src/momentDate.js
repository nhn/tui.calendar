let moment;

export default class MomentDate {
  static setMoment(m) {
    moment = m;

    return MomentDate;
  }

  constructor(...args) {
    if (!moment) {
      throw new Error(
        'MomentDate requires Moment constructor. Use "MomentDate.setMoment(moment);".'
      );
    }

    this.m = moment(...args);
  }

  setTimezoneOffset(offset) {
    this.m.utcOffset(-offset);

    return this;
  }

  setTimezoneName(zoneName) {
    if (this.m.tz) {
      this.m.tz(zoneName);
    } else {
      throw new Error(
        'It requires moment-timezone. Use "MomentDate.setMoment()" with moment-timezone'
      );
    }

    return this;
  }

  clone() {
    return new MomentDate(this.m);
  }

  toDate() {
    return this.m.toDate();
  }

  toString() {
    return this.m.format();
  }

  getTime() {
    return this.m.valueOf();
  }

  getTimezoneOffset() {
    const offset = -this.m.utcOffset();

    return Math.abs(offset) ? offset : 0;
  }

  getFullYear() {
    return this.m.year();
  }

  getMonth() {
    return this.m.month();
  }

  getDate() {
    return this.m.date();
  }

  getHours() {
    return this.m.hours();
  }

  getMinutes() {
    return this.m.minutes();
  }

  getSeconds() {
    return this.m.seconds();
  }

  getMilliseconds() {
    return this.m.milliseconds();
  }

  getDay() {
    return this.m.day();
  }

  setTime(t) {
    this.m = moment(t);

    return this.getTime();
  }

  setFullYear(y, m = this.getMonth(), d = this.getDate()) {
    this.m.year(y).month(m).date(d);

    return this.getTime();
  }

  setMonth(m, d = this.m.date()) {
    this.m.month(m).date(d);

    return this.getTime();
  }

  setDate(d) {
    this.m.date(d);

    return this.getTime();
  }

  setHours(h, m = this.getMinutes(), s = this.getSeconds(), ms = this.getMilliseconds()) {
    this.m.hours(h).minutes(m).seconds(s).milliseconds(ms);

    return this.getTime();
  }

  setMinutes(m, s = this.getSeconds(), ms = this.getMilliseconds()) {
    this.m.minutes(m).seconds(s).milliseconds(ms);

    return this.getTime();
  }

  setSeconds(s, ms = this.getMilliseconds()) {
    this.m.seconds(s).milliseconds(ms);

    return this.getTime();
  }

  setMilliseconds(ms) {
    this.m.milliseconds(ms);

    return this.getTime();
  }
}
