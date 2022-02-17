import { getNextGridTime, getPrevGridTime, getTopPercentByTime } from '@src/controller/times';
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

  it('getPrevGridTime', () => {
    const time = new TZDate('2015-05-05T12:00:00');
    const slot = 30;
    const unit = 'minute';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-05-05T12:00:00');

    expect(result).toEqual(prevGridTime);
  });

  it('getPrevGridTime with slot 15 minutes', () => {
    const time = new TZDate('2015-05-05T12:18:00');
    const slot = 15;
    const unit = 'minute';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-05-05T12:15:00');

    expect(result).toEqual(prevGridTime);
  });

  it(`getPrevGridTime with slot 1 hour`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'hour';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-05-05T12:00:00');

    expect(result).toEqual(prevGridTime);
  });

  it(`getPrevGridTime with slot 1 day`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'date';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-05-05T00:00:00');

    expect(result).toEqual(prevGridTime);
  });

  it(`getPrevGridTime with slot 1 month`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'month';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-05-01T00:00:00');

    expect(result).toEqual(prevGridTime);
  });

  it(`getPrevGridTime with slot 1 year`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'year';
    const result = getPrevGridTime(time, slot, unit);
    const prevGridTime = new TZDate('2015-01-01T00:00:00');

    expect(result).toEqual(prevGridTime);
  });

  it('getNextGridTime', () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 30;
    const unit = 'minute';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2015-05-05T12:30:00');

    expect(result).toEqual(nextGridTime);
  });

  it('getNextGridTime with slot 15 minutes', () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 15;
    const unit = 'minute';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2015-05-05T12:15:00');

    expect(result).toEqual(nextGridTime);
  });

  it(`getNextGridTime with slot 1 hour`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'hour';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2015-05-05T13:00:00');

    expect(result).toEqual(nextGridTime);
  });

  it(`getNextGridTime with slot 1 day`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'date';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2015-05-06T00:00:00');

    expect(result).toEqual(nextGridTime);
  });

  it(`getNextGridTime with slot 1 month`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'month';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2015-06-01T00:00:00');

    expect(result).toEqual(nextGridTime);
  });

  it(`getNextGridTime with slot 1 year`, () => {
    const time = new TZDate('2015-05-05T12:10:00');
    const slot = 1;
    const unit = 'year';
    const result = getNextGridTime(time, slot, unit);
    const nextGridTime = new TZDate('2016-01-01T00:00:00');

    expect(result).toEqual(nextGridTime);
  });
});
