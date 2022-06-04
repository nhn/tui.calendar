import { expect } from '@playwright/test';
import { LocalDate, MomentDate, UTCDate } from '@toast-ui/date';
import { advanceTo } from 'jest-date-mock';
import moment from 'moment-timezone';
import type { TimeZone } from 'timezone-mock';
import { register, unregister } from 'timezone-mock';

import TZDate from '@src/time/date';
import { calculateTimezoneOffset, date, isUsingDST, setDateConstructor } from '@src/time/timezone';

MomentDate.setMoment(moment);

/**
 * First mocking jest and then mocking timezone
 * @param {TimeZone} timezoneName
 * @param {string} initialDate
 */
function startMockingTimezone(timezoneName: TimeZone, initialDate: string) {
  advanceTo(new Date(initialDate).getTime());
  register(timezoneName);
}

/**
 * First uninstall jest and then unregister.
 */
function finishMockingTimezone() {
  unregister();
}

describe('UTCDate', () => {
  beforeEach(() => {
    setDateConstructor(UTCDate);
  });

  afterEach(() => {
    setDateConstructor(LocalDate);
  });

  it('use UTC+0', () => {
    const utcDate = new Date(2020, 0, 20, 0, 0, 0);
    const tzDate = date('2020-01-20T00:00:00');

    expect(tzDate.getTime()).toBe(utcDate.getTime());
    expect(tzDate.getMonth()).toBe(utcDate.getUTCMonth());
    expect(tzDate.getDate()).toBe(utcDate.getUTCDate());
    expect(tzDate.getHours()).toBe(utcDate.getUTCHours());
  });
});

describe('LocalDate', () => {
  it('use local timezone offset', () => {
    const localDate = new Date(2020, 0, 20, 0, 0, 0);
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

describe('calculateTimezoneOffset', () => {
  beforeEach(() => {
    register('UTC');
  });

  afterEach(() => {
    unregister();
  });

  it('should calculate timezone offset of date which is applicable DST - Northern Hemisphere', () => {
    // Given
    const timezoneName = 'US/Pacific';
    const tzDate = new TZDate('2022-04-12T00:00:00');

    // When
    const offset = calculateTimezoneOffset(timezoneName, tzDate);

    // Then
    // Pacific Daylight Time (PDT) is UTC -7.
    expect(offset).toBe(-420);
  });

  it('should calculate timezone offset of date which is not applicable DST - Northern Hemisphere', () => {
    // Given
    const timezoneName = 'US/Pacific';
    // Pacific Daylight Time (PDS) is end on 2022/11/06 02:00 in Pacific Time.
    // So add 7 hours to get UTC time.
    const tzDate = new TZDate('2022-11-06T09:00:00');

    // When
    const offset = calculateTimezoneOffset(timezoneName, tzDate);

    // Then
    expect(offset).toBe(-480);
  });

  it('should calculate timezone offset of date which is applicable DST - Southern Hemisphere', () => {
    // Given
    const timezoneName = 'Australia/Sydney';
    // Australian Eastern Daylight Time (AEDT) is UTC +11.
    const tzDate = new TZDate('2022-11-06T09:00:00');

    // When
    const offset = calculateTimezoneOffset(timezoneName, tzDate);

    // Then
    expect(offset).toBe(660);
  });

  it('should calculate timezone offset of date which is not applicable DST - Southern Hemisphere', () => {
    // Given
    const timezoneName = 'Australia/Sydney';
    // Australian Eastern Standard Time (AEST) is UTC +10.
    const tzDate = new TZDate('2022-04-06T09:00:00');

    // When
    const offset = calculateTimezoneOffset(timezoneName, tzDate);

    // Then
    expect(offset).toBe(600);
  });

  it('should return positive number when the timezone is UTC+', () => {
    // Given
    const timezoneName = 'Asia/Seoul'; // UTC+9
    const tzDate = new TZDate('2022-11-06T09:00:00');

    // When
    const offset = calculateTimezoneOffset(timezoneName, tzDate);

    // Then
    expect(offset).toBe(540);
  });

  it('should throw if the timezone name is invalid', () => {
    // Given
    const invalidTimezoneName = 'Invalid/Timezone';
    const tzDate = new TZDate('2022-04-12T00:00:00');

    // When
    const fn = () => calculateTimezoneOffset(invalidTimezoneName, tzDate);

    // Then
    expect(fn).toThrow();
  });
});

describe('isUsingDST', () => {
  afterEach(() => {
    unregister();
  });

  it('should determine the OS timezone is using DST (UTC)', () => {
    // Given
    register('UTC');
    const tzDate = new TZDate('2022-04-12T00:00:00');

    // When
    const result = isUsingDST(tzDate);

    // Then
    expect(result).toBe(false);
  });

  it('should determine the OS timezone is using DST', () => {
    // Given
    register('US/Pacific');
    const tzDateInPDT = new TZDate('2022-04-12T00:00:00');
    const tzDateInPST = new TZDate('2022-11-06T03:00:00');

    // When
    const result1 = isUsingDST(tzDateInPDT);
    const result2 = isUsingDST(tzDateInPST);

    // Then
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  it('should determine the given timezone is using DST', () => {
    // Given
    register('UTC');
    const timezoneName = 'US/Pacific';
    const tzDateInPDT = new TZDate('2022-04-12T00:00:00');
    const tzDateInPST = new TZDate('2022-11-06T09:00:00'); // +6 hours because it is UTC

    // When
    const result1 = isUsingDST(tzDateInPDT, timezoneName);
    const result2 = isUsingDST(tzDateInPST, timezoneName);

    // Then
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});
