import isString from 'tui-code-snippet/type/isString';
/**
 * datetime regex from https://www.regexpal.com/94925
 * timezone regex from moment
 */
const rISO8601 =
  /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.)?([0-9]+)?([+-]\d\d(?::?\d\d)?|\s*Z)?$/;

function throwNotSupported() {
  throw new Error('This operation is not supported.');
}

function getDateTime(dateString) {
  const match = rISO8601.exec(dateString);
  if (match) {
    const [, y, M, d, h, m, s, , ms, zoneInfo] = match;

    return {
      y: Number(y),
      M: Number(M) - 1,
      d: Number(d),
      h: Number(h),
      m: Number(m),
      s: Number(s),
      ms: Number(ms) || 0,
      zoneInfo,
    };
  }

  return null;
}

function createFromDateString(dateString) {
  const info = getDateTime(dateString);
  if (info && !info.zoneInfo) {
    const { y, M, d, h, m, s, ms } = info;

    return new Date(y, M, d, h, m, s, ms);
  }

  return null;
}

export default class LocalDate {
  constructor(...args) {
    const [firstArg] = args;

    if (firstArg instanceof Date) {
      this.d = new Date(firstArg.getTime());
    } else if (isString(firstArg) && args.length === 1) {
      this.d = createFromDateString(firstArg);
    }

    if (!this.d) {
      this.d = new Date(...args);
    }
  }

  setTimezoneOffset() {
    throwNotSupported();
  }

  setTimezoneName() {
    throwNotSupported();
  }

  clone() {
    return new LocalDate(this.d);
  }

  toDate() {
    return new Date(this.d.getTime());
  }

  toString() {
    return this.d.toString();
  }
}

const getterMethods = [
  'getTime',
  'getTimezoneOffset',
  'getFullYear',
  'getMonth',
  'getDate',
  'getHours',
  'getMinutes',
  'getSeconds',
  'getMilliseconds',
  'getDay',
];

const setterMethods = [
  'setTime',
  'setFullYear',
  'setMonth',
  'setDate',
  'setHours',
  'setMinutes',
  'setSeconds',
  'setMilliseconds',
];

getterMethods.forEach((methodName) => {
  LocalDate.prototype[methodName] = function (...args) {
    return this.d[methodName](...args);
  };
});

setterMethods.forEach((methodName) => {
  LocalDate.prototype[methodName] = function (...args) {
    return this.d[methodName](...args);
  };
});
