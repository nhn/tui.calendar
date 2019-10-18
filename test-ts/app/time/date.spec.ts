import TZDate from '@src/time/date';

describe('module:timezone TZDate', function() {
  beforeEach(function() {
    jasmine.clock().mockDate();
  });

  afterEach(function() {
    TZDate.restoreOffset();
    jasmine.clock().uninstall();
  });

  it('constructor can get Date instance or timestamp or nothing', function() {
    const d1 = new TZDate();
    const d2 = new TZDate(new Date());
    const d3 = new TZDate(Date.now());

    expect(d1.getTime()).toBe(d2.getTime());
    expect(d2.getTime()).toBe(d3.getTime());
  });

  it('constructor can get TZDate', function() {
    const d1 = new TZDate();
    const d2 = new TZDate(d1);

    expect(d1).not.toBe(d2);
    expect(d1.getTime()).toBe(d2.getTime());
  });

  describe('constructor has same API as the native Date', function() {
    const offsetMin = 30;
    // const offsetMS = offsetMin * 60 * 1000;

    beforeEach(function() {
      TZDate.setOffsetByTimezoneOption(offsetMin);
    });

    it('with date-string', function() {
      const utcTime = Date.parse('2015-01-01T09:30');
      const localTime = new TZDate('2015-01-01T09:30').getTime();

      expect(utcTime).toBe(localTime);
    });

    // this constructor is removed. But test codes remain for the record
    // xit('with year, month', function() {
    //   const utcTime = Date.UTC(2015, 0);
    //   const localTime = new TZDate(2015, 0).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });

    // xit('with year, month, date', function() {
    //   const utcTime = Date.UTC(2015, 0, 1);
    //   const localTime = new TZDate(2015, 0, 1).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });

    // xit('with year, month, date, hours', function() {
    //   const utcTime = Date.UTC(2015, 0, 1, 9);
    //   const localTime = new TZDate(2015, 0, 1, 9).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });

    // xit('with year, month, date, hours, minutes', function() {
    //   const utcTime = Date.UTC(2015, 0, 1, 9, 30);
    //   const localTime = new TZDate(2015, 0, 1, 9, 30).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });

    // xit('with year, month, date, hours, minutes, seconds', function() {
    //   const utcTime = Date.UTC(2015, 0, 1, 9, 30, 20);
    //   const localTime = new TZDate(2015, 0, 1, 9, 30, 20).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });

    // xit('with year, month, date, hours, minutes, seconds, milliseconds', function() {
    //   const utcTime = Date.UTC(2015, 0, 1, 9, 30, 20, 500);
    //   const localTime = new TZDate(2015, 0, 1, 9, 30, 20, 500).getTime();

    //   expect(utcTime + offsetMS).toBe(localTime);
    // });
  });

  it('should be usable as a number type', function() {
    TZDate.setOffsetByTimezoneOption(0);

    const d1 = new TZDate(Date.UTC(2017, 0, 1, 9, 30, 0));
    const d2 = new TZDate(Date.UTC(2017, 0, 1, 9, 30, 1));

    expect(Number(d1)).toBe(d1.getTime());
    expect(Number(d2) - Number(d1)).toBe(1000);
  });

  describe('getters: ', function() {
    it('if offset is default, getters should return same value as the original date', function() {
      const date = new Date();
      const tzdate = new TZDate(date);

      expect(date.getFullYear()).toBe(tzdate.getFullYear());
      expect(date.getMonth()).toBe(tzdate.getMonth());
      expect(date.getDate()).toBe(tzdate.getDate());
      expect(date.getDay()).toBe(tzdate.getDay());
      expect(date.getHours()).toBe(tzdate.getHours());
      expect(date.getMinutes()).toBe(tzdate.getMinutes());
      expect(date.getMilliseconds()).toBe(tzdate.getMilliseconds());
    });

    // [TODO] must be back
    xit('with +01:30(-90) offset', function() {
      TZDate.setOffsetByTimezoneOption(-90);
      const tzdate = new TZDate(Date.UTC(2017, 0, 1));

      expect(tzdate.getFullYear()).toBe(2017);
      expect(tzdate.getMonth()).toBe(0);
      expect(tzdate.getDate()).toBe(1);
      expect(tzdate.getDay()).toBe(0);
      expect(tzdate.getHours()).toBe(1);
      expect(tzdate.getMinutes()).toBe(30);
      expect(tzdate.getSeconds()).toBe(0);
      expect(tzdate.getMilliseconds()).toBe(0);
    });

    // [TODO] must be back
    xit('with -01:30(90) offset', function() {
      TZDate.setOffsetByTimezoneOption(90);
      const tzdate = new TZDate(Date.UTC(2017, 0, 1));

      expect(tzdate.getFullYear()).toBe(2016);
      expect(tzdate.getMonth()).toBe(11);
      expect(tzdate.getDay()).toBe(6);
      expect(tzdate.getDate()).toBe(31);
      expect(tzdate.getHours()).toBe(22);
      expect(tzdate.getMinutes()).toBe(30);
      expect(tzdate.getSeconds()).toBe(0);
      expect(tzdate.getMilliseconds()).toBe(0);
    });
  });

  it('Setters should not affected by the timezone', function() {
    TZDate.setOffsetByTimezoneOption(90);
    const tzdate = new TZDate(Date.UTC(2017, 0, 1));

    tzdate.setMilliseconds(10);

    expect(tzdate.getMilliseconds()).toBe(10);

    tzdate.setSeconds(50);

    expect(tzdate.getSeconds()).toBe(50);

    tzdate.setMinutes(30);

    expect(tzdate.getMinutes()).toBe(30);

    tzdate.setHours(20);

    expect(tzdate.getHours()).toBe(20);

    tzdate.setDate(10);

    expect(tzdate.getDate()).toBe(10);

    tzdate.setMonth(5);

    expect(tzdate.getMonth()).toBe(5);

    tzdate.setFullYear(2010);

    expect(tzdate.getFullYear()).toBe(2010);
  });

  it('getUTCTime() should not be affected by the timezone', function() {
    TZDate.setOffsetByTimezoneOption(120);
    const time = Date.UTC(2017, 0, 1);

    const date = new Date(time);
    const tzdate = new TZDate(time);

    expect(date.getTime()).toBe(tzdate.getUTCTime());
  });
});
