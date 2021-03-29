import moment from 'moment';
import MomentDate from '../src/momentDate';

describe('MomentDate should throw error', () => {
  test('if there is no moment', () => {
    expect(() => new MomentDate()).toThrow();
  });

  test('setTimezoneName() needs moment-timezone', () => {
    MomentDate.setMoment(moment);

    const timezoneName = 'US/Pacific';

    expect(() => new MomentDate('2020-06-01T00:00:00').setTimezoneName(timezoneName)).toThrow();

    MomentDate.setMoment();
  });
});

describe('MomentDate based on moment', () => {
  beforeEach(() => {
    MomentDate.setMoment(moment);
  });

  test('toDate() return a native Date instance)', () => {
    const date = new MomentDate('2020-01-29T19:20:00');

    expect(date.toDate() instanceof Date).toBe(true);
    expect(date.toDate().getTime()).toBe(date.getTime());
  });

  test('clone() returns a cloned instance', () => {
    const date = new MomentDate('2020-01-29T19:20:00');
    const cloned = date.clone();

    expect(cloned instanceof MomentDate).toBe(true);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  test('getters should do same thing with native Date', () => {
    const nativeDate = new Date('2020-01-29T19:20:00');
    const date = new MomentDate('2020-01-29T19:20:00');

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

  test('setters should do same thing with native Date', () => {
    const nativeDate = new Date('2020-01-29T19:20:00');
    const date = new MomentDate();
    const time = nativeDate.getTime();
    const ONE_MINUTE = 60 * 1000;
    const ONE_SECOND = 1 * 1000;

    expect(date.setTime(time)).toBe(time);
    expect(date.setFullYear(2020, 0, 29)).toBe(time);
    expect(date.setMonth(0, 29)).toBe(time);
    expect(date.setDate(29)).toBe(time);
    expect(date.setHours(19, 20, 0, 0)).toBe(time);
    expect(date.setMinutes(21, 0, 0)).toBe(time + ONE_MINUTE);
    expect(date.setSeconds(1, 0)).toBe(time + ONE_MINUTE + ONE_SECOND);
    expect(date.setMilliseconds(1)).toBe(time + ONE_MINUTE + ONE_SECOND + 1);
  });

  test('setTimezoneOffset() should set utcOffset', () => {
    const offset = 420;
    const date = new MomentDate().setTimezoneOffset(offset);
    const utc = new MomentDate().setTimezoneOffset(0);

    expect(date.getTimezoneOffset()).toBe(offset);
    expect(utc.getTimezoneOffset()).toBe(0);
  });
});
