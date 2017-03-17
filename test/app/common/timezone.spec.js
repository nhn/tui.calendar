var tz = require('common/timezone');

fdescribe('module:timezone', function() {
    it('Constructor can get Date instance and time and nothing', function() {
        var d1, d2, d3;

        jasmine.clock().install();

        d1 = new tz.Date();
        d2 = new tz.Date(new Date());
        d3 = new tz.Date(Date.now());

        expect(d1.getTime()).toBe(d2.getTime());
        expect(d2.getTime()).toBe(d3.getTime());

        jasmine.clock().uninstall();
    });

    it('If timezone is default, all getter methods returns same value as the original date', function() {
        var date = new Date();
        var tzdate = new tz.Date(date);

        expect(date.getFullYear()).toBe(tzdate.getFullYear());
        expect(date.getMonth()).toBe(tzdate.getMonth());
        expect(date.getDate()).toBe(tzdate.getDate());
        expect(date.getDay()).toBe(tzdate.getDay());
        expect(date.getHours()).toBe(tzdate.getHours());
        expect(date.getMinutes()).toBe(tzdate.getMinutes());
        expect(date.getHours()).toBe(tzdate.getHours());
        expect(date.getMilliseconds()).toBe(tzdate.getMilliseconds());
    });

    it('with +01:30 timezone', function() {
        var tzdate;

        tz.setTimezone(-90);
        tzdate = new tz.Date(Date.UTC(2017, 0, 1));

        expect(tzdate.getFullYear()).toBe(2017);
        expect(tzdate.getMonth()).toBe(0);
        expect(tzdate.getDate()).toBe(1);
        expect(tzdate.getDay()).toBe(0);
        expect(tzdate.getHours()).toBe(1);
        expect(tzdate.getMinutes()).toBe(30);
        expect(tzdate.getSeconds()).toBe(0);
        expect(tzdate.getMilliseconds()).toBe(0);

        tz.restoreTimezone();
    });

    it('with -01:30 timezone', function() {
        var tzdate;

        tz.setTimezone(90);
        tzdate = new tz.Date(Date.UTC(2017, 0, 1));

        expect(tzdate.getFullYear()).toBe(2016);
        expect(tzdate.getMonth()).toBe(11);
        expect(tzdate.getDay()).toBe(6);
        expect(tzdate.getDate()).toBe(31);
        expect(tzdate.getHours()).toBe(22);
        expect(tzdate.getMinutes()).toBe(30);
        expect(tzdate.getSeconds()).toBe(0);
        expect(tzdate.getMilliseconds()).toBe(0);

        tz.restoreTimezone();
    });

    it('Setters should not affected by the timezone', function() {
        var tzdate;

        tz.setTimezone(90);
        tzdate = new tz.Date(Date.UTC(2017, 0, 1));

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

    it('getTime() should not be affected by the timezone', function() {
        var time, date, tzdate;

        tz.setTimezone(120);
        time = Date.UTC(2017, 0, 1);

        date = new Date(time);
        tzdate = new tz.Date(time);

        expect(date.getTime()).toBe(tzdate.getTime());
    });

    it('setTime() should not be affected by the timezone', function() {
        var time, tzdate;

        tz.setTimezone(120);
        time = Date.UTC(2017, 0, 1);

        tzdate = new tz.Date(Date.now());
        tzdate.setTime(time);

        expect(tzdate.getTime()).toBe(time);
    });
});
