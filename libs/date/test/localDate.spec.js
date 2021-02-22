import LocalDate from '../src/localDate';

test('LocalDate uses local date.', () => {
  const date = new LocalDate('2020-01-29T19:20:00');

  expect(date.toDate() instanceof Date).toBe(true);
  expect(() => date.setTimezoneOffset(420)).toThrow();
  expect(() => date.setTimezoneName('Asia/Seoul')).toThrow();

  const cloned = date.clone();

  expect(cloned instanceof LocalDate).toBe(true);
  expect(cloned.getTime()).toBe(date.getTime());
});

test('LocalDate uses local date getters', () => {
  const nativeDate = new Date('2020-01-29T19:20:00');
  const date = new LocalDate('2020-01-29T19:20:00');

  expect(date.getTime()).toBe(nativeDate.getTime());
  expect(date.getTimezoneOffset()).toBe(nativeDate.getTimezoneOffset());
  expect(date.getFullYear()).toBe(nativeDate.getFullYear());
  expect(date.getMonth()).toBe(nativeDate.getMonth());
  expect(date.getDate()).toBe(nativeDate.getDate());
  expect(date.getHours()).toBe(nativeDate.getHours());
  expect(date.getMinutes()).toBe(nativeDate.getMinutes());
  expect(date.getSeconds()).toBe(nativeDate.getSeconds());
  expect(date.getMilliseconds()).toBe(nativeDate.getMilliseconds());
  expect(date.getDay()).toBe(nativeDate.getDay());
});

test('LocalDate uses local date setters', () => {
  const nativeDate = new Date('2020-01-29T19:20:00');
  const date = new LocalDate();
  const time = 1580293200000;
  const ONE_MINUTE = 60 * 1000;
  const ONE_SECOND = 1 * 1000;

  expect(date.setTime(time)).toBe(nativeDate.getTime());
  expect(date.setFullYear(2020, 0, 29)).toBe(time);
  expect(date.setMonth(0, 29)).toBe(time);
  expect(date.setDate(29)).toBe(time);
  expect(date.setHours(19, 20, 0, 0)).toBe(time);
  expect(date.setMinutes(21, 0, 0)).toBe(time + ONE_MINUTE);
  expect(date.setSeconds(1, 0)).toBe(time + ONE_MINUTE + ONE_SECOND);
  expect(date.setMilliseconds(1)).toBe(time + ONE_MINUTE + ONE_SECOND + 1);
});

test('If iso 8601 date string and no timezone info, LocalDate uses new Date(year, monthIndex[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);', () => {
  const nativeDate = new Date(2020, 0, 29, 19, 20, 0);
  const date = new LocalDate('2020-01-29T19:20:00');

  expect(date.getTime()).toBe(nativeDate.getTime());
});

test('If iso 8601 date string and timezone info, LocalDate uses new Date(dateString);', () => {
  const nativeDate = new Date('2020-01-29T19:20:00Z');
  const date = new LocalDate('2020-01-29T19:20:00Z');

  expect(date.getTime()).toBe(nativeDate.getTime());
});

test('If dateString matches the regular expression, LocalDate can get a valid date', () => {
  expect(new Date('2020-01-29T19:20:00.999').getTime()).toBe(
    new LocalDate('2020-01-29T19:20:00.999').getTime()
  );
  expect(new Date('2020-01-29T19:20:00').getTime()).toBe(
    new LocalDate('2020-01-29T19:20:00').getTime()
  );
  expect(new Date('2020-01-29T19:20:00.999+09:00').getTime()).toBe(
    new LocalDate('2020-01-29T19:20:00.999+09:00').getTime()
  );
  expect(new Date('2020-01-29T19:20:00.999Z').getTime()).toBe(
    new LocalDate('2020-01-29T19:20:00.999Z').getTime()
  );
  expect(new Date('2020-01-29T19:20:00+09:00').getTime()).toBe(
    new LocalDate('2020-01-29T19:20:00+09:00').getTime()
  );
});
