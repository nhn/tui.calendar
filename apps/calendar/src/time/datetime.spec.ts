import { INVALID_DATETIME_FORMAT } from '@src/constants/error';
import TZDate from '@src/time/date';
import {
  addMonths,
  clone,
  compare,
  isSameDate,
  isSameMonth,
  leadingZero,
  makeDateRange,
  millisecondsFrom,
  MS_PER_DAY,
  MS_PER_HOUR,
  parse,
  toEndOfDay,
  toEndOfMonth,
  toFormat,
  toStartOfDay,
  toStartOfMonth,
  toStartOfYear,
} from '@src/time/datetime';

describe('millisecondsFrom', () => {
  it('should convert value to milliseconds', () => {
    // Given

    // When
    const result = millisecondsFrom('hour', 24);

    // Then
    expect(result).toBe(MS_PER_DAY);
  });
});

describe('makeDateRange', () => {
  it('should make date array by supplied dates', () => {
    // Given
    const start = new TZDate('2015/05/01');
    const end = new TZDate('2015/05/03');

    // When
    const result = makeDateRange(start, end, MS_PER_DAY);

    // Then
    expect(result).toEqual([
      new TZDate('2015/05/01'),
      new TZDate('2015/05/02'),
      new TZDate('2015/05/03'),
    ]);
  });

  it('should have given steps', () => {
    const start = new TZDate('2015/05/01 09:30:00');
    const end = new TZDate('2015/05/01 18:30:00');

    expect(makeDateRange(start, end, MS_PER_HOUR)).toEqual([
      new TZDate('2015/05/01 09:30:00'),
      new TZDate('2015/05/01 10:30:00'),
      new TZDate('2015/05/01 11:30:00'),
      new TZDate('2015/05/01 12:30:00'),
      new TZDate('2015/05/01 13:30:00'),
      new TZDate('2015/05/01 14:30:00'),
      new TZDate('2015/05/01 15:30:00'),
      new TZDate('2015/05/01 16:30:00'),
      new TZDate('2015/05/01 17:30:00'),
      new TZDate('2015/05/01 18:30:00'),
    ]);
  });
});

describe('toStartOfDay', () => {
  it('should return 00:00:00 of supplied date', () => {
    // Given
    const date = new TZDate('2015/05/21 18:30:00');
    const expected = new TZDate('2015/05/21 00:00:00');

    // When
    const result = toStartOfDay(date);

    // Then
    expect(result).toEqual(expected);
  });
});

describe('toEndOfDay', () => {
  it('should return 23:59:59.999 of supplied date', () => {
    // Given
    const date = new TZDate('2015/05/21 18:30:00');
    const expected = new TZDate('2015-05-21T23:59:59.999');

    // When
    const result = toEndOfDay(date);

    // Then
    expect(result).toEqual(expected);
  });
});

describe('clone', () => {
  it('should clone TZDate object', () => {
    // Given
    const date = new TZDate();

    // When
    const clonedDate = clone(date);

    // Then
    expect(date).toEqual(clonedDate);
  });
});

describe('compare', () => {
  it('should return 0 when two parameters are equals', () => {
    // Given
    const d1 = new TZDate();
    const d2 = new TZDate(d1.getTime());

    // When
    const result = compare(d1, d2);

    // Then
    expect(result).toBe(0);
  });

  it('should return 1 when the first parameter is later than second parameter', () => {
    // Given
    const date1 = new TZDate();
    date1.setMinutes(date1.getMinutes() + 30);
    const date2 = new TZDate();

    // When
    const result = compare(date1, date2);

    // Then
    expect(result).toBe(1);
  });

  it('should return -1 when the first parameter is early than second parameter', () => {
    // Given
    const date1 = new TZDate();
    const date2 = new TZDate();
    date2.setMinutes(date2.getMinutes() + 30);

    // When
    const result = compare(date1, date2);

    expect(result).toBe(-1);
  });
});

describe('leadingZero', () => {
  it('should pad zero to supplied number and length', () => {
    // Given

    // When

    // Then
    expect(leadingZero(2, 2)).toBe('02');
    expect(leadingZero(2, 3)).toBe('002');
    expect(leadingZero(2300, 5)).toBe('02300');
  });

  it('should just convert to string and return if number length is longer than the given length', () => {
    // Given

    // When

    // Then
    expect(leadingZero(3000, 2)).toBe('3000');
  });
});

describe('parse', () => {
  it('should parse date string for safe usage', () => {
    // Given
    const dateStr1 = '2015-06-01 12:20:00';
    const dateStr2 = '2015/06/01 10:00:00';
    const dateStr3 = '20150601';

    // When

    // Then
    expect(parse(dateStr1)).toEqual(new TZDate(2015, 5, 1, 12, 20, 0));
    expect(parse(dateStr2)).toEqual(new TZDate(2015, 5, 1, 10, 0, 0));
    expect(parse(dateStr3)).toEqual(new TZDate(2015, 5, 1, 0, 0, 0));
  });

  it('should return false when supplied date string is not valid', () => {
    // Given
    const validDateStr = '2015-05-01 00:00:00';
    const invalidDateStr1 = '2015-5-1 3:00:00';
    const invalidDateStr2 = '2015-06-21T22:00:00Z'; // ISO date format.

    // When

    // Then
    expect(() => parse(validDateStr)).not.toThrow();
    expect(() => parse(invalidDateStr1)).toThrowError(INVALID_DATETIME_FORMAT);
    expect(() => parse(invalidDateStr2)).toThrowError(INVALID_DATETIME_FORMAT);
  });

  it('should adjust month value with fix options', () => {
    // Given
    const dateStr = '2015-05-01';
    const expected = new TZDate(2015, 6, 1, 0, 0, 0);

    // When
    const result = parse(dateStr, 1);

    // Then
    expect(result).toEqual(expected);
  });
});

describe('toFormat', () => {
  it('should return formatted date string as basis of supplied string', () => {
    // Given
    const date = new TZDate('1988-09-25T15:30:00');

    // When

    // Then
    expect(toFormat(date, 'YYYY')).toBe('1988');
    expect(toFormat(date, 'MM')).toBe('09');
    expect(toFormat(date, 'DD')).toBe('25');
    expect(toFormat(date, 'YYYYMMDD')).toBe('19880925');
    expect(toFormat(date, 'HH:mm')).toBe('15:30');
  });
});

describe('isSameMonth', () => {
  it('should return whether the 2 dates are the same month', () => {
    // Given
    const date1 = new TZDate('2015-06-12T09:30:00');
    const date2 = new TZDate('2015-06-13T09:30:00');
    const date3 = new TZDate('2015-07-12T09:30:00');

    // When

    // Then
    expect(isSameMonth(date1, date2)).toBe(true);
    expect(isSameMonth(date1, date3)).toBe(false);
  });
});

describe('isSameDate', () => {
  it('should return whether the 2 dates are the same date', () => {
    // Given
    const date1 = new TZDate('2015-06-12T09:30:00');
    const date2 = new TZDate('2015-06-13T09:30:00');
    const date3 = new TZDate('2015-07-12T09:30:00');

    // When

    // Then
    expect(isSameDate(date1, date2)).toBe(false);
    expect(isSameDate(date1, date3)).toBe(false);
  });
});

describe('toStartOfMonth', () => {
  it('should change the given date to the start date of month', () => {
    // Given
    const date = new TZDate('2015-11-24T09:30:00');

    // When
    const result = toStartOfMonth(date);

    // Then
    expect(result).toEqual(new TZDate('2015-11-01T00:00:00'));
  });
});

describe('toEndOfMonth', () => {
  it('should change the given date to the end date of month', () => {
    // Given
    const month = new TZDate('2015-11-24T09:30:00');

    // When
    const result = toEndOfMonth(month);

    // Then
    expect(result).toEqual(new TZDate('2015-11-30T23:59:59.999'));
  });
});

describe('toStartOfYear', () => {
  it('should change the given date to the start date of year', () => {
    // Given
    const date = new TZDate('2020-03-24T09:30:00');
    const startOfYear = new TZDate('2020-01-01T00:00:00');

    // When
    const result = toStartOfYear(date);

    // Then
    expect(result).toEqual(startOfYear);
  });
});

describe('addMonth/subtractMonth', () => {
  it('should return the date on which the month was added to the given date', () => {
    // Given
    const date = new TZDate('2022-03-15T09:30:00');
    const expected = new TZDate('2022-04-15T09:30:00');

    // When
    const result = addMonths(date, 1);

    // Then
    expect(result).toEqual(expected);
  });

  it('should return the date on which the month was added to the given date even if the month is a month without a calculated day', () => {
    // Given
    const date = new TZDate('2022-01-29T09:30:00');
    const expected = new TZDate('2022-02-28T09:30:00');

    // When
    const result = addMonths(date, 1);

    // Then
    expect(result).toEqual(expected);
  });

  it('should return the date on which the month was added to the given date even if the month is in the leap year', () => {
    // Given
    const date = new TZDate('2020-01-29T09:30:00');
    const expected = new TZDate('2020-02-29T09:30:00'); // 2020 year is a leap year

    // When
    const result = addMonths(date, 1);

    // Then
    expect(result).toEqual(expected);
  });

  it('should return the date on which the month was subtracted to the given date', () => {
    // Given
    const date = new TZDate('2022-04-15T09:30:00');
    const expected = new TZDate('2022-03-15T09:30:00');

    // When
    const result = addMonths(date, -1);

    // Then
    expect(result).toEqual(expected);
  });

  it('should return the date on which the month was subtracted to the given date even if the month is a month without a calculated day', () => {
    // Given
    const date = new TZDate('2022-03-29T09:30:00');
    const expected = new TZDate('2022-02-28T09:30:00');

    // When
    const result = addMonths(date, -1);

    // Then
    expect(result).toEqual(expected);
  });

  it('should return the date on which the month was subtracted to the given date even if the month is in the leap year', () => {
    // Given
    const date = new TZDate('2020-03-31T09:30:00');
    const expected = new TZDate('2020-02-29T09:30:00'); // 2020 year is a leap year

    // When
    const result = addMonths(date, -1);

    // Then
    expect(result).toEqual(expected);
  });
});
