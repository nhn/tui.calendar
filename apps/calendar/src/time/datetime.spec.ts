import TZDate from '@src/time/date';
import * as dt from '@src/time/datetime';

describe('datetime', () => {
  describe('millisecondsFrom()', () => {
    it('convert value to milliseconds', () => {
      expect(dt.millisecondsFrom('hour', 24)).toBe(86400000);
    });
  });

  describe('range()', () => {
    it('makes date array by supplied dates.', () => {
      const start = new TZDate('2015/05/01');
      const end = new TZDate('2015/05/03');
      const step = dt.MS_PER_DAY;

      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03'),
      ];

      expect(dt.makeDateRange(start, end, step)).toEqual(expected);
    });

    it('step test', () => {
      const start = new TZDate('2015/05/01 09:30:00');
      const end = new TZDate('2015/05/01 18:30:00');

      const expected = [
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
      ];

      expect(dt.makeDateRange(start, end, dt.MS_PER_HOUR)).toEqual(expected);
    });
  });

  it('start() return 00:00:00 supplied date.', () => {
    const d = new TZDate('2015/05/21 18:30:00');

    expect(dt.toStartOfDay(d)).toEqual(new TZDate('2015/05/21'));
    expect(d).toEqual(new TZDate('2015/05/21 18:30:00'));
  });

  it('end() return 23:59:59.999 supplied date.', () => {
    const d = new TZDate('2015/05/21 18:30:00');

    // if you want use milliseconds, use format 'YYYY-MM-DDTHH:mm:ss.sssZ' based on http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
    expect(dt.toEndOfDay(d)).toEqual(new TZDate('2015-05-21T23:59:59.999'));
  });

  describe('clone()', () => {
    it('clone Date object', () => {
      const d1 = new TZDate();
      const cloned = dt.clone(d1);

      expect(d1.getTime()).toBe(cloned.getTime());
    });
  });

  describe('compare()', () => {
    it('return -1 when first supplied date latest then second.', () => {
      const d1 = new TZDate();
      const d2 = new TZDate();

      d2.setMinutes(d2.getMinutes() + 30);

      expect(dt.compare(d2, d1)).toBe(1);
    });

    it('return 0 when two date are equals.', () => {
      const d1 = new TZDate();
      const d2 = new TZDate(d1.getTime());

      expect(dt.compare(d1, d2)).toBe(0);
    });

    it('return 1 when second date latest then first.', () => {
      const d1 = new TZDate();
      const d2 = new TZDate();

      d2.setMinutes(d2.getMinutes() + 30);

      expect(dt.compare(d1, d2)).toBe(-1);
    });
  });

  describe('leadingZero()', () => {
    it('pad zero to supplied number and length.', () => {
      let num = 2;

      expect(dt.leadingZero(num, 2)).toBe('02');
      expect(dt.leadingZero(num, 3)).toBe('002');

      num = 2300;

      expect(dt.leadingZero(num, 5)).toBe('02300');
    });

    it('if number string length longer then length, then just convert string and return it.', () => {
      const num = 3000;

      expect(dt.leadingZero(num, 2)).toBe('3000');
    });
  });

  describe('parse()', () => {
    it('parse date string for safe usage.', () => {
      const str1 = '2015-06-01 12:20:00';
      const str2 = '2015/06/01 10:00:00';
      const str3 = '20150601';

      expect(dt.parse(str2)).toEqual(new TZDate(2015, 5, 1, 10, 0, 0));
      expect(dt.parse(str1)).toEqual(new TZDate(2015, 5, 1, 12, 20, 0));
      expect(dt.parse(str3)).toEqual(new TZDate(2015, 5, 1, 0, 0, 0));
    });

    it('return false when supplied date string is not valid.', () => {
      const valid = '2015-05-01 00:00:00';
      const notValid = '2015-5-1 3:00:00';
      const notValid2 = '2015-06-21T22:00:00Z'; // ISO date format.
      const message = 'parameter is not valid format';

      expect(dt.parse.bind(null, valid)).not.toThrow();
      expect(dt.parse.bind(null, notValid)).toThrowError(message);
      expect(dt.parse.bind(null, notValid2)).toThrowError(message);
    });

    it('can adjust month value fixing options.', () => {
      const str = '2015-05-01';

      expect(dt.parse(str, +1)).toEqual(new TZDate(2015, 6, 1, 0, 0, 0));
    });
  });

  describe('toFormat()', () => {
    it('return formatted date string as basis of supplied string.', () => {
      const birth = new TZDate('1988-09-25T15:30:00');

      expect(dt.toFormat(birth, '')).toBe('');
      expect(dt.toFormat(birth, 'YYYY')).toBe('1988');
      expect(dt.toFormat(birth, 'MM')).toBe('09');
      expect(dt.toFormat(birth, 'DD')).toBe('25');
      expect(dt.toFormat(birth, 'YYYYMMDD')).toBe('19880925');
      expect(dt.toFormat(birth, 'HH:mm')).toBe(
        `${dt.leadingZero(birth.getHours(), 2)}:${dt.leadingZero(birth.getMinutes(), 2)}`
      );
    });
  });

  it('isSameMonth', () => {
    const d1 = new TZDate('2015-06-12T09:30:00');
    const d2 = new TZDate('2015-06-13T09:30:00');
    const d3 = new TZDate('2015-07-12T09:30:00');

    expect(dt.isSameMonth(d1, d2)).toBe(true);
    expect(dt.isSameMonth(d1, d3)).toBe(false);
  });

  it('isSameDate', () => {
    const d1 = new TZDate('2015-06-12T09:30:00');
    const d2 = new TZDate('2015-06-13T09:30:00');
    const d3 = new TZDate('2015-07-12T09:30:00');

    expect(dt.isSameDate(d1, d2)).toBe(false);
    expect(dt.isSameDate(d1, d3)).toBe(false);
  });

  it('toStartOfMonth', () => {
    let month = new TZDate('2015-11-24T09:30:00');

    expect(dt.toStartOfMonth(month)).toEqual(new TZDate('2015-11-01T00:00:00'));

    month = new TZDate('2015-06-24T00:00:00');

    expect(dt.toStartOfMonth(month)).toEqual(new TZDate('2015-06-01T00:00:00'));
  });

  it('toEndOfMonth', () => {
    let month = new TZDate('2015-11-24T09:30:00');

    expect(dt.toEndOfMonth(month)).toEqual(new TZDate('2015-11-30T23:59:59.999'));

    month = new TZDate('2015-07-15T00:00:00');

    expect(dt.toEndOfMonth(month)).toEqual(new TZDate('2015-07-31T23:59:59.999'));
  });

  it('toStartOfYear', () => {
    const date = new TZDate('2020-03-24T09:30:00');
    const startOfYear = new TZDate('2020-01-01T00:00:00');

    expect(dt.toStartOfYear(date)).toEqual(startOfYear);
  });
});
