'use strict';

var tz = require('common/timezone');

describe('module:timezone TZDate', function() {
    beforeEach(function() {
        jasmine.clock().mockDate();
    });

    afterEach(function() {
        tz.restoreOffset();
        jasmine.clock().uninstall();
    });

    it('constructor can get Date instance or timestamp or nothing', function() {
        var d1, d2, d3;

        d1 = new tz.Date();
        d2 = new tz.Date(new Date());
        d3 = new tz.Date(Date.now());

        expect(d1.getTime()).toBe(d2.getTime());
        expect(d2.getTime()).toBe(d3.getTime());
    });

    it('constructor can get null and should treat it as a number 0', function() {
        var date = new tz.Date(null);

        expect(date.getTime()).toBe(0);
    });

    it('constructor can get TZDate', function() {
        var d1, d2;

        d1 = new tz.Date();
        d2 = new tz.Date(d1);

        expect(d1).not.toBe(d2);
        expect(d1.getTime()).toBe(d2.getTime());
    });

    describe('constructor has same API as the native Date', function() {
        var offsetMin = 30;
        var offsetMS = offsetMin * 60 * 1000;

        beforeEach(function() {
            tz.setOffset(30);
        });

        it('with date-string', function() {
            var utcTime = Date.parse('2015-01-01T09:30');
            var localTime = (new tz.Date('2015-01-01T09:30')).getTime();

            expect(utcTime).toBe(localTime);
        });

        it('with year, month', function() {
            var utcTime = Date.UTC(2015, 0);
            var localTime = (new tz.Date(2015, 0)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });

        it('with year, month, date', function() {
            var utcTime = Date.UTC(2015, 0, 1);
            var localTime = (new tz.Date(2015, 0, 1)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });

        it('with year, month, date, hours', function() {
            var utcTime = Date.UTC(2015, 0, 1, 9);
            var localTime = (new tz.Date(2015, 0, 1, 9)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });

        it('with year, month, date, hours, minutes', function() {
            var utcTime = Date.UTC(2015, 0, 1, 9, 30);
            var localTime = (new tz.Date(2015, 0, 1, 9, 30)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });

        it('with year, month, date, hours, minutes, seconds', function() {
            var utcTime = Date.UTC(2015, 0, 1, 9, 30, 20);
            var localTime = (new tz.Date(2015, 0, 1, 9, 30, 20)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });

        it('with year, month, date, hours, minutes, seconds, milliseconds', function() {
            var utcTime = Date.UTC(2015, 0, 1, 9, 30, 20, 500);
            var localTime = (new tz.Date(2015, 0, 1, 9, 30, 20, 500)).getTime();

            expect(utcTime + offsetMS).toBe(localTime);
        });
    });

    it('should be usable as a number type', function() {
        var d1, d2;

        tz.setOffset(0);

        d1 = new tz.Date(Date.UTC(2017, 0, 1, 9, 30, 0));
        d2 = new tz.Date(Date.UTC(2017, 0, 1, 9, 30, 1));

        expect(Number(d1)).toBe(d1.getTime());
        expect(d2 - d1).toBe(1000);
    });

    describe('getters: ', function() {
        it('if offset is default, getters should return same value as the original date', function() {
            var date = new Date();
            var tzdate = new tz.Date(date);

            expect(date.getFullYear()).toBe(tzdate.getFullYear());
            expect(date.getMonth()).toBe(tzdate.getMonth());
            expect(date.getDate()).toBe(tzdate.getDate());
            expect(date.getDay()).toBe(tzdate.getDay());
            expect(date.getHours()).toBe(tzdate.getHours());
            expect(date.getMinutes()).toBe(tzdate.getMinutes());
            expect(date.getMilliseconds()).toBe(tzdate.getMilliseconds());
        });

        it('with +01:30(-90) offset', function() {
            var tzdate;

            tz.setOffset(-90);
            tzdate = new tz.Date(Date.UTC(2017, 0, 1));

            expect(tzdate.getFullYear()).toBe(2017);
            expect(tzdate.getMonth()).toBe(0);
            expect(tzdate.getDate()).toBe(1);
            expect(tzdate.getDay()).toBe(0);
            expect(tzdate.getHours()).toBe(1);
            expect(tzdate.getMinutes()).toBe(30);
            expect(tzdate.getSeconds()).toBe(0);
            expect(tzdate.getMilliseconds()).toBe(0);
        });

        it('with -01:30(90) offset', function() {
            var tzdate;

            tz.setOffset(90);
            tzdate = new tz.Date(Date.UTC(2017, 0, 1));

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
        var tzdate;

        tz.setOffset(90);
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

        tz.setOffset(120);
        time = Date.UTC(2017, 0, 1);

        date = new Date(time);
        tzdate = new tz.Date(time);

        expect(date.getTime()).toBe(tzdate.getTime());
    });
});
