import UTCDate from '../src/utcDate';

test('UTCDate uses utc date.', () => {
  const date = new UTCDate('2020-01-29T19:20:00');

  expect(date.d instanceof Date).toBe(true);
  expect(date.toDate() instanceof Date).toBe(true);
  expect(() => date.setTimezoneOffset(420)).toThrow();
  expect(() => date.setTimezoneName('Asia/Seoul')).toThrow();

  const cloned = date.clone();

  expect(cloned instanceof UTCDate).toBe(true);
  expect(cloned.getTime()).toBe(date.getTime());
});

test('UTCDate uses utc date getters', () => {
  const nativeDate = new Date('2020-01-29T19:20:00');
  const date = new UTCDate('2020-01-29T19:20:00');

  expect(date.getTime()).toBe(nativeDate.getTime());
  expect(date.getTimezoneOffset()).toBe(0);
  expect(date.getFullYear()).toBe(nativeDate.getUTCFullYear());
  expect(date.getMonth()).toBe(nativeDate.getUTCMonth());
  expect(date.getDate()).toBe(nativeDate.getUTCDate());
  expect(date.getHours()).toBe(nativeDate.getUTCHours());
  expect(date.getMinutes()).toBe(nativeDate.getUTCMinutes());
  expect(date.getSeconds()).toBe(nativeDate.getUTCSeconds());
  expect(date.getMilliseconds()).toBe(nativeDate.getUTCMilliseconds());
  expect(date.getDay()).toBe(nativeDate.getUTCDay());
});

test('UTCDate uses utc date setters', () => {
  const nativeDate = new Date();
  const date = new UTCDate();
  const time = 1580293200000;

  expect(date.setTime(time)).toBe(nativeDate.setTime(time));
  expect(date.setFullYear(2020, 0, 29)).toBe(nativeDate.setUTCFullYear(2020, 0, 29));
  expect(date.setMonth(0, 29)).toBe(nativeDate.setUTCMonth(0, 29));
  expect(date.setDate(29)).toBe(nativeDate.setUTCDate(29));
  expect(date.setHours(19, 20, 0, 0)).toBe(nativeDate.setUTCHours(19, 20, 0, 0));
  expect(date.setMinutes(21, 0, 0)).toBe(nativeDate.setUTCMinutes(21, 0, 0));
  expect(date.setSeconds(1, 0)).toBe(nativeDate.setUTCSeconds(1, 0));
  expect(date.setMilliseconds(1)).toBe(nativeDate.setUTCMilliseconds(1));
});
