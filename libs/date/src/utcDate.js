import LocalDate from './localDate';

export default class UTCDate extends LocalDate {
  clone() {
    return new UTCDate(this.d);
  }

  getTimezoneOffset() {
    return 0;
  }
}

const getterProperties = [
  'FullYear',
  'Month',
  'Date',
  'Hours',
  'Minutes',
  'Seconds',
  'Milliseconds',
  'Day',
];

const setterProperties = [
  'FullYear',
  'Month',
  'Date',
  'Hours',
  'Minutes',
  'Seconds',
  'Milliseconds',
];

getterProperties.forEach((prop) => {
  const methodName = `get${prop}`;

  UTCDate.prototype[methodName] = function (...args) {
    return this.d[`getUTC${prop}`](...args);
  };
});

setterProperties.forEach((prop) => {
  const methodName = `set${prop}`;

  UTCDate.prototype[methodName] = function (...args) {
    return this.d[`setUTC${prop}`](...args);
  };
});
