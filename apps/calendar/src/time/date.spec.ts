import TZDate from '@src/time/date';
import { MS_PER_HOUR } from '@src/time/datetime';

describe('tz()', () => {
  it('should return new TZDate instance following the given timezone name (not applicable to DST)', () => {
    // Given
    const date = new TZDate('2022-03-26T12:00:00+09:00');
    const targetTimezone = 'Europe/Paris';
    const expectedHourDiff = 8;

    // When
    const result = date.tz(targetTimezone); // UTC+1

    // Then
    expect(result).toBeInstanceOf(TZDate);
    expect(result.getTime()).toBe(date.getTime() - expectedHourDiff * MS_PER_HOUR);
  });

  it('should return new TZDate instance following the given timezone name (applicable to DST)', () => {
    // Given
    const date = new TZDate('2022-03-30T12:00:00+09:00');
    const targetTimezone = 'Europe/Paris';
    const expectedHourDiff = 7;

    // When
    const result = date.tz(targetTimezone); // UTC+2

    // Then
    expect(result).toBeInstanceOf(TZDate);
    expect(result.getTime()).toBe(date.getTime() - expectedHourDiff * MS_PER_HOUR);
  });

  it('should return new TZDate instance following the given timezone offset', () => {
    // Given
    const date = new TZDate('2022-03-26T12:00:00+09:00');
    const targetTimezoneOffset = 300;
    const expectedHourDiff = 4;

    // When
    const result = date.tz(targetTimezoneOffset); // UTC+5

    // Then
    expect(result).toBeInstanceOf(TZDate);
    expect(result.getTime()).toBe(date.getTime() - expectedHourDiff * MS_PER_HOUR);
  });
});

describe('local()', () => {
  it(`should return the new TZDate instance having same value if there is no timezone value and it doesn't have timezone offset`, () => {
    // Given
    const date = new TZDate('2022-03-26T12:00:00+09:00');

    // When
    const result = date.local();

    // Then
    expect(result.getTime()).toBe(date.getTime());
  });

  it('should return the new TZDate instance following the local timezone when the origianl instance has timezone offset', () => {
    // Given
    const date = new TZDate('2022-03-26T12:00:00+09:00').tz('Europe/Paris');
    const expectedHourDiff = 8;

    // When
    // Local timezone is 'Asia/Seoul'
    const result = date.local();

    // Then
    expect(result).toBeInstanceOf(TZDate);
    expect(result.getTime()).toBe(date.getTime() + expectedHourDiff * MS_PER_HOUR);
  });

  it('should return the new TZDate following the local timezone with the timezone value', () => {
    // Given
    const date = new TZDate('2022-03-26T12:00:00+01:00'); // already UTC+1
    const givenTimezone = 'Europe/Paris';
    const expectedHourDiff = 8;

    // When
    // Local timezone is 'Asia/Seoul'
    const result = date.local(givenTimezone);

    // Then
    expect(result).toBeInstanceOf(TZDate);
    expect(result.getTime()).toBe(date.getTime() + expectedHourDiff * MS_PER_HOUR);
  });
});
