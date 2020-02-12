import { UTCDate, LocalDate, MomentDate } from '@toast-ui/date';
import { register, unregister, TimeZone } from 'timezone-mock';
import { date, setDateConstructor, getTimezoneFactory } from '@src/time/timezone';

/**
 * First mocking jasmine and then mocking timezone
 * @param {TimeZone} timezoneName
 * @param {string} initialDate
 */
function startMockingTimezone(timezoneName: TimeZone, initialDate: string) {
  jasmine.clock().install();
  jasmine.clock().mockDate(new Date(initialDate));
  register(timezoneName);
}

/**
 * First uninstall jasmine and then unregister.
 */
function finishMockingTimezone() {
  unregister();
  jasmine.clock().uninstall();
}

describe('UTCDate', () => {
  beforeEach(() => {
    setDateConstructor(UTCDate);
  });

  afterEach(() => {
    setDateConstructor(LocalDate);
  });

  it('use UTC+0', () => {
    const utcDate = new Date('2020-01-20T00:00:00');
    const tzDate = date('2020-01-20T00:00:00');

    expect(tzDate.getTime()).toBe(utcDate.getTime());
    expect(tzDate.getMonth()).toBe(utcDate.getUTCMonth());
    expect(tzDate.getDate()).toBe(utcDate.getUTCDate());
    expect(tzDate.getHours()).toBe(utcDate.getUTCHours());
  });
});

describe('LocalDate', () => {
  it('use local timezone offset', () => {
    const localDate = new Date('2020-01-20T00:00:00');
    const tzDate = date('2020-01-20T00:00:00');

    expect(tzDate.getTime()).toBe(localDate.getTime());
    expect(tzDate.getMonth()).toBe(localDate.getMonth());
    expect(tzDate.getDate()).toBe(localDate.getDate());
    expect(tzDate.getHours()).toBe(localDate.getHours());
  });
});

describe('MomentDate', () => {
  beforeEach(() => {
    setDateConstructor(MomentDate);
  });

  afterEach(() => {
    setDateConstructor(LocalDate);
  });

  it('use moment instance with local date', () => {
    const localDate = new Date('2020-01-20T00:00:00Z');
    const tzDate = date('2020-01-20T00:00:00Z');

    expect(tzDate.getTime()).toBe(localDate.getTime());
    expect(tzDate.getMonth()).toBe(localDate.getMonth());
    expect(tzDate.getDate()).toBe(localDate.getDate());
    expect(tzDate.getHours()).toBe(localDate.getHours());
  });

  it('use moment instance with utc date', () => {
    const utcDate = new Date('2020-01-20T00:00:00Z');
    const tzDate = date('2020-01-20T00:00:00Z').setTimezoneOffset(0);

    expect(tzDate.getTime()).toBe(utcDate.getTime());
    expect(tzDate.getMonth()).toBe(utcDate.getUTCMonth());
    expect(tzDate.getDate()).toBe(utcDate.getUTCDate());
    expect(tzDate.getHours()).toBe(utcDate.getUTCHours());
  });

  it('use moment instance with timezone name, PST', () => {
    startMockingTimezone('US/Pacific', '2020-01-20T00:00:00');

    const localDate = new Date('2020-06-20T00:00:00');
    const tzDate = date('2020-06-20T00:00:00').setTimezoneName('US/Pacific');

    expect(tzDate.getTime()).toBe(localDate.getTime());
    expect(tzDate.getMonth()).toBe(localDate.getMonth());
    expect(tzDate.getDate()).toBe(localDate.getDate());
    expect(tzDate.getHours()).toBe(localDate.getHours());

    finishMockingTimezone();
  });

  it('use moment instance with timezone name, PDT', () => {
    startMockingTimezone('US/Pacific', '2020-06-20T00:00:00');

    const localDate = new Date('2021-01-20T00:00:00');
    const tzDate = date('2021-01-20T00:00:00').setTimezoneName('US/Pacific');

    expect(tzDate.getTime()).toBe(localDate.getTime());
    expect(tzDate.getMonth()).toBe(localDate.getMonth());
    expect(tzDate.getDate()).toBe(localDate.getDate());
    expect(tzDate.getHours()).toBe(localDate.getHours());

    finishMockingTimezone();
  });
});

describe('getTimezoneFactory()', () => {
  afterEach(() => {
    setDateConstructor(LocalDate);
  });

  it(`doesn't support UTCDate, but no error`, () => {
    setDateConstructor(UTCDate);
    const createDate = getTimezoneFactory(240);

    expect(() => createDate('2021-01-20T00:00:00')).not.toThrow();
    expect(createDate('2021-01-20T00:00:00').getTimezoneOffset()).toBe(0);
  });

  it(`doesn't support LocalDate, but no error`, () => {
    setDateConstructor(LocalDate);
    const createDate = getTimezoneFactory('US/Pacific');

    expect(() => createDate('2021-01-20T00:00:00')).not.toThrow();
    expect(createDate('2021-01-20T00:00:00').getTimezoneOffset()).toBe(
      new Date('2021-01-20T00:00:00').getTimezoneOffset()
    );
  });

  it(`supports MomentDate with timezone offset`, () => {
    setDateConstructor(MomentDate);
    const createDate = getTimezoneFactory(420);

    expect(() => createDate('2021-01-20T00:00:00')).not.toThrow();
    expect(createDate('2021-01-20T00:00:00').getTimezoneOffset()).toBe(420);
  });

  it(`supports MomentDate with timezone name`, () => {
    startMockingTimezone('US/Pacific', '2020-06-20T00:00:00');

    setDateConstructor(MomentDate);
    const createDate = getTimezoneFactory('US/Pacific');

    expect(() => createDate('2021-06-20T00:00:00')).not.toThrow();
    expect(createDate('2021-06-20T00:00:00').getTimezoneOffset()).toBe(
      new Date('2021-06-20T00:00:00').getTimezoneOffset()
    );

    finishMockingTimezone();
  });
});
