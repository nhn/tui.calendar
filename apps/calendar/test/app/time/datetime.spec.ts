import * as dt from '@src/time/datetime';
import TZDate from '@src/time/date';

function createDate(y: number, M: number, d: number): TZDate {
  const year = String(y);
  let month = String(M);
  let day = String(d);

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return new TZDate(`${[year, month, day].join('-')}T00:00:00`);
}

describe('datetime', () => {
  describe('millisecondsTo()', () => {
    it('convert millisecond value to other types.', () => {
      expect(dt.millisecondsTo('hour', 86400000)).toBe(24);
      expect(dt.millisecondsTo('minute', 1800000)).toBe(30);
      expect(dt.millisecondsTo('second', 10000)).toBe(10);
    });
  });

  describe('millisecondsFrom()', () => {
    it('convert value to milliseconds', () => {
      expect(dt.millisecondsFrom('hour', 24)).toBe(86400000);
    });
  });

  describe('range()', () => {
    it('makes date array by supplied dates.', () => {
      const start = new TZDate('2015/05/01');
      const end = new TZDate('2015/05/03');
      const step = dt.MILLISECONDS_PER_DAY;

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

      expect(dt.makeDateRange(start, end, dt.MILLISECONDS_PER_HOUR)).toEqual(expected);
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

  it('toRaw() return date object from Date.', () => {
    const d = new TZDate('2015/05/01 13:20:05');

    expect(dt.toRaw(d)).toEqual({
      y: 2015,
      M: 4,
      d: 1,
      h: 13,
      m: 20,
      s: 5,
      ms: 0,
    });
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

  describe('isValid()', () => {
    it('return true when supplied parameter is valid dates.', () => {
      const valid = new TZDate();
      const notValid = new TZDate('qweqd');

      expect(dt.isValid(valid)).toBe(true);
      expect(dt.isValid(notValid)).toBe(false);
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

  describe('arr2dCalendar()', () => {
    const options = {
      startDayOfWeek: 0,
      isAlways6Week: false,
    };

    it('2014/10 will be rendered on 9/28 - 11/1 at Sunday time.', () => {
      const month = new TZDate('2014-10-01T00:00:00');
      const actual = dt.arr2dCalendar(month, options);
      const expected = [
        [
          createDate(2014, 9, 28),
          createDate(2014, 9, 29),
          createDate(2014, 9, 30),
          createDate(2014, 10, 1),
          createDate(2014, 10, 2),
          createDate(2014, 10, 3),
          createDate(2014, 10, 4),
        ],

        [
          createDate(2014, 10, 5),
          createDate(2014, 10, 6),
          createDate(2014, 10, 7),
          createDate(2014, 10, 8),
          createDate(2014, 10, 9),
          createDate(2014, 10, 10),
          createDate(2014, 10, 11),
        ],

        [
          createDate(2014, 10, 12),
          createDate(2014, 10, 13),
          createDate(2014, 10, 14),
          createDate(2014, 10, 15),
          createDate(2014, 10, 16),
          createDate(2014, 10, 17),
          createDate(2014, 10, 18),
        ],

        [
          createDate(2014, 10, 19),
          createDate(2014, 10, 20),
          createDate(2014, 10, 21),
          createDate(2014, 10, 22),
          createDate(2014, 10, 23),
          createDate(2014, 10, 24),
          createDate(2014, 10, 25),
        ],

        [
          createDate(2014, 10, 26),
          createDate(2014, 10, 27),
          createDate(2014, 10, 28),
          createDate(2014, 10, 29),
          createDate(2014, 10, 30),
          createDate(2014, 10, 31),
          createDate(2014, 11, 1),
        ],
      ];

      expect(actual).toEqual(expected);
    });

    it('2015/12 will be rendered from 11/30 to 2013/1/3 as of Monday.', () => {
      const month = new TZDate('2015-12-01T00:00:00');
      const actual = dt.arr2dCalendar(
        month,
        Object.assign({}, options, {
          startDayOfWeek: 1,
          isAlways6Week: false,
        })
      );
      const expected = [
        [
          createDate(2015, 11, 30),
          createDate(2015, 12, 1),
          createDate(2015, 12, 2),
          createDate(2015, 12, 3),
          createDate(2015, 12, 4),
          createDate(2015, 12, 5),
          createDate(2015, 12, 6),
        ],

        [
          createDate(2015, 12, 7),
          createDate(2015, 12, 8),
          createDate(2015, 12, 9),
          createDate(2015, 12, 10),
          createDate(2015, 12, 11),
          createDate(2015, 12, 12),
          createDate(2015, 12, 13),
        ],

        [
          createDate(2015, 12, 14),
          createDate(2015, 12, 15),
          createDate(2015, 12, 16),
          createDate(2015, 12, 17),
          createDate(2015, 12, 18),
          createDate(2015, 12, 19),
          createDate(2015, 12, 20),
        ],

        [
          createDate(2015, 12, 21),
          createDate(2015, 12, 22),
          createDate(2015, 12, 23),
          createDate(2015, 12, 24),
          createDate(2015, 12, 25),
          createDate(2015, 12, 26),
          createDate(2015, 12, 27),
        ],

        [
          createDate(2015, 12, 28),
          createDate(2015, 12, 29),
          createDate(2015, 12, 30),
          createDate(2015, 12, 31),
          createDate(2016, 1, 1),
          createDate(2016, 1, 2),
          createDate(2016, 1, 3),
        ],
      ];

      expect(actual).toEqual(expected);
    });

    it('2016/8 will be rendered from 7/26 to 9/5 on Tuesday.', () => {
      const month = new TZDate('2016-08-01T00:00:00');
      const actual = dt.arr2dCalendar(
        month,
        Object.assign({}, options, {
          startDayOfWeek: 2,
        })
      );
      const expected = [
        [
          createDate(2016, 7, 26),
          createDate(2016, 7, 27),
          createDate(2016, 7, 28),
          createDate(2016, 7, 29),
          createDate(2016, 7, 30),
          createDate(2016, 7, 31),
          createDate(2016, 8, 1),
        ],

        [
          createDate(2016, 8, 2),
          createDate(2016, 8, 3),
          createDate(2016, 8, 4),
          createDate(2016, 8, 5),
          createDate(2016, 8, 6),
          createDate(2016, 8, 7),
          createDate(2016, 8, 8),
        ],

        [
          createDate(2016, 8, 9),
          createDate(2016, 8, 10),
          createDate(2016, 8, 11),
          createDate(2016, 8, 12),
          createDate(2016, 8, 13),
          createDate(2016, 8, 14),
          createDate(2016, 8, 15),
        ],

        [
          createDate(2016, 8, 16),
          createDate(2016, 8, 17),
          createDate(2016, 8, 18),
          createDate(2016, 8, 19),
          createDate(2016, 8, 20),
          createDate(2016, 8, 21),
          createDate(2016, 8, 22),
        ],

        [
          createDate(2016, 8, 23),
          createDate(2016, 8, 24),
          createDate(2016, 8, 25),
          createDate(2016, 8, 26),
          createDate(2016, 8, 27),
          createDate(2016, 8, 28),
          createDate(2016, 8, 29),
        ],

        [
          createDate(2016, 8, 30),
          createDate(2016, 8, 31),
          createDate(2016, 9, 1),
          createDate(2016, 9, 2),
          createDate(2016, 9, 3),
          createDate(2016, 9, 4),
          createDate(2016, 9, 5),
        ],
      ];

      expect(actual).toEqual(expected);
    });

    it('2015/11 will be rendered until 11/1 to 12/5 on Sunday.', () => {
      const month = new TZDate('2015-11-01T00:00:00');
      const actual = dt.arr2dCalendar(month, options);
      const expected = [
        [
          createDate(2015, 11, 1),
          createDate(2015, 11, 2),
          createDate(2015, 11, 3),
          createDate(2015, 11, 4),
          createDate(2015, 11, 5),
          createDate(2015, 11, 6),
          createDate(2015, 11, 7),
        ],

        [
          createDate(2015, 11, 8),
          createDate(2015, 11, 9),
          createDate(2015, 11, 10),
          createDate(2015, 11, 11),
          createDate(2015, 11, 12),
          createDate(2015, 11, 13),
          createDate(2015, 11, 14),
        ],

        [
          createDate(2015, 11, 15),
          createDate(2015, 11, 16),
          createDate(2015, 11, 17),
          createDate(2015, 11, 18),
          createDate(2015, 11, 19),
          createDate(2015, 11, 20),
          createDate(2015, 11, 21),
        ],

        [
          createDate(2015, 11, 22),
          createDate(2015, 11, 23),
          createDate(2015, 11, 24),
          createDate(2015, 11, 25),
          createDate(2015, 11, 26),
          createDate(2015, 11, 27),
          createDate(2015, 11, 28),
        ],

        [
          createDate(2015, 11, 29),
          createDate(2015, 11, 30),
          createDate(2015, 12, 1),
          createDate(2015, 12, 2),
          createDate(2015, 12, 3),
          createDate(2015, 12, 4),
          createDate(2015, 12, 5),
        ],
      ];

      expect(actual).toEqual(expected);
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

  it('toEndOfYear', () => {
    const date = new TZDate('2020-03-24T09:30:00');
    const endOfYear = new TZDate('2020-12-31T23:59:59.999');

    expect(dt.toEndOfYear(date)).toEqual(endOfYear);
  });

  describe('getMonthCalendar', () => {
    const date = createDate(2021, 5, 14);

    it("should make a month with starting from Wednesday, If 'startDayOfWeek' is 3", () => {
      expect(dt.getMonthCalendar(date, { startDayOfWeek: 3, visibleWeeksCount: 2 })).toEqual([
        [
          createDate(2021, 5, 12),
          createDate(2021, 5, 13),
          createDate(2021, 5, 14),
          createDate(2021, 5, 15),
          createDate(2021, 5, 16),
          createDate(2021, 5, 17),
          createDate(2021, 5, 18),
        ],
        [
          createDate(2021, 5, 19),
          createDate(2021, 5, 20),
          createDate(2021, 5, 21),
          createDate(2021, 5, 22),
          createDate(2021, 5, 23),
          createDate(2021, 5, 24),
          createDate(2021, 5, 25),
        ],
      ]);
    });

    it("should return a month only weekdays, If 'workweek' is true", () => {
      expect(dt.getMonthCalendar(date, { workweek: true, visibleWeeksCount: 2 })).toEqual([
        [
          createDate(2021, 5, 10),
          createDate(2021, 5, 11),
          createDate(2021, 5, 12),
          createDate(2021, 5, 13),
          createDate(2021, 5, 14),
        ],
        [
          createDate(2021, 5, 17),
          createDate(2021, 5, 18),
          createDate(2021, 5, 19),
          createDate(2021, 5, 20),
          createDate(2021, 5, 21),
        ],
      ]);
    });
  });

  it('getStartAndEndDateFromCalendar', () => {
    const data = [
      [new TZDate(2021, 4, 10), new TZDate(2021, 4, 11), new TZDate(2021, 4, 12)],
      [new TZDate(2021, 4, 17), new TZDate(2021, 4, 18), new TZDate(2021, 4, 19)],
      [new TZDate(2021, 4, 24), new TZDate(2021, 4, 25), new TZDate(2021, 4, 26)],
    ];

    expect(dt.getStartAndEndDateFromCalendar(data)).toEqual({
      start: new TZDate(2021, 4, 10),
      end: new TZDate(2021, 4, 26),
    });
  });

  it('getStartAndEndDateFromGrid', () => {
    const data = [
      new TZDate(2021, 4, 10),
      new TZDate(2021, 4, 11),
      new TZDate(2021, 4, 13),
      new TZDate(2021, 4, 14),
    ];
    expect(dt.getStartAndEndDateFromGrid(data)).toEqual({
      start: new TZDate(2021, 4, 10),
      end: new TZDate(2021, 4, 14),
    });
  });
});
