import { getTopPercentByTime } from '@src/controller/times';
import TZDate from '@src/time/date';

describe('times controller', () => {
  describe('getTopPercentByTimeUnit() calculate top pixel value between start date, end date', () => {
    it('Using hours in a day', () => {
      // 12:00:00 is middle time of one days. return 50%
      expect(
        getTopPercentByTime(
          new TZDate('2020-05-05T12:00:00'),
          new TZDate('2020-05-05T00:00:00'),
          new TZDate('2020-05-06T00:00:00')
        )
      ).toBe(50);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-05T00:00:00'),
          new TZDate('2020-05-05T00:00:00'),
          new TZDate('2020-05-06T00:00:00')
        )
      ).toBe(0);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-05T22:30:00'),
          new TZDate('2020-05-05T21:00:00'),
          new TZDate('2020-05-06T00:00:00')
        )
      ).toBe(50);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-05T11:00:00'),
          new TZDate('2020-05-05T09:00:00'),
          new TZDate('2020-05-05T14:00:00')
        )
      ).toBe(40);
    });

    it('Using dates in a week', () => {
      // 2020-05-03T00:00:00 is middle time between 2020-05-01T00:00:00 and 2020-05-05T00:00:00. return 50%
      expect(
        getTopPercentByTime(
          new TZDate('2020-05-03T00:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-05T00:00:00')
        )
      ).toBe(50);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-02T00:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-05T00:00:00')
        )
      ).toBe(25);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-04T00:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-05T00:00:00')
        )
      ).toBe(75);
    });

    it('Using dates in a month', () => {
      // 2020-05-16T00:00:00 is middle time between 2020-05-01T00:00:00 and 2020-05-31T00:00:00. return 50%
      expect(
        getTopPercentByTime(
          new TZDate('2020-05-16T00:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-31T00:00:00')
        )
      ).toBe(50);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-08T12:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-31T00:00:00')
        )
      ).toBe(25);

      expect(
        getTopPercentByTime(
          new TZDate('2020-05-23T12:00:00'),
          new TZDate('2020-05-01T00:00:00'),
          new TZDate('2020-05-31T00:00:00')
        )
      ).toBe(75);
    });

    it('Using month in a year', () => {
      // 2020-05-16T00:00:00 is middle time between 2020-01-01T00:00:00 and 2021-01-01T00:00:00. return 50%
      expect(
        getTopPercentByTime(
          new TZDate('2020-07-01T00:00:00'),
          new TZDate('2020-01-01T00:00:00'),
          new TZDate('2021-01-01T00:00:00')
        )
      ).toBeLessThanOrEqual(50);
    });
  });
});
