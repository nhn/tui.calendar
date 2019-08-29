/*eslint-disable*/
var dt = require('common/datetime');
var TZDate = require('common/timezone').Date;

describe('datetime', function() {
    describe('millisecondsTo()', function() {
        it('convert millisecond value to other types.', function() {
            expect(dt.millisecondsTo('hour', 86400000)).toBe(24);
            expect(dt.millisecondsTo('minutes', 1800000)).toBe(30);
            expect(dt.millisecondsTo('seconds', 10000)).toBe(10);
        });

        it('return false when not supported type', function() {
            expect(dt.millisecondsTo('month', 86400000)).toBe(false);
        });
    });

    describe('millisecondsFrom()', function() {
        it('convert value to milliseconds', function() {
            expect(dt.millisecondsFrom('hour', 24)).toBe(86400000);
        });

        it('return false when supplied parameter is not supported', function() {
            expect(dt.millisecondsFrom('month', 24)).toBe(false);
        });
    });

    xdescribe('range()', function() {
        it('makes date array by supplied dates.', function() {
            var start = new TZDate('2015/05/01'),
                end = new TZDate('2015/05/03'),
                step = dt.MILLISECONDS_PER_DAY;

            var expected = [
                new TZDate('2015/05/01'),
                new TZDate('2015/05/02'),
                new TZDate('2015/05/03')
            ];

            expect(dt.range(start, end, step)).toEqual(expected);
        });

        it('step test', function() {
            var start = new TZDate('2015/05/01 09:30:00'),
                end = new TZDate('2015/05/01 18:30:00');

            var expected = [
                new TZDate('2015/05/01 09:30:00'),
                new TZDate('2015/05/01 10:30:00'),
                new TZDate('2015/05/01 11:30:00'),
                new TZDate('2015/05/01 12:30:00'),
                new TZDate('2015/05/01 13:30:00'),
                new TZDate('2015/05/01 14:30:00'),
                new TZDate('2015/05/01 15:30:00'),
                new TZDate('2015/05/01 16:30:00'),
                new TZDate('2015/05/01 17:30:00'),
                new TZDate('2015/05/01 18:30:00')
            ];

            expect(dt.range(start, end, dt.MILLISECONDS_PER_HOUR)).toEqual(expected);
        });
    });

    it('start() return 00:00:00 supplied date.', function() {
        var d = new TZDate('2015/05/21 18:30:00');
        expect(dt.start(d)).toEqual(new TZDate('2015/05/21'));
        expect(d).toEqual(new TZDate('2015/05/21 18:30:00'));
    });

    it('end() return 23:59:59 supplied date.', function() {
        var d = new TZDate('2015/05/21 18:30:00');
        expect(dt.end(d)).toEqual(new TZDate('2015/05/21 23:59:59'));
    });

    it('raw() return date object from Date.', function() {
        var d = new TZDate('2015/05/01 13:20:05');

        expect(dt.raw(d)).toEqual({
            y: 2015,
            M: 4,
            d: 1,
            h: 13,
            m: 20,
            s: 5,
            ms: 0
        });
    });

    describe('clone()', function() {
        it('clone Date object', function() {
            var d1 = new TZDate();
            var cloned = dt.clone(d1);

            expect(d1.getTime() === cloned.getTime()).toBe(true);
        });
    });

    describe('compare()', function() {
        it('return -1 when first supplied date latest then second.', function() {
            var d1 = new TZDate();
            var d2 = new TZDate();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d2, d1)).toBe(1);
        });

        it('return 0 when two date are equals.', function() {
            var d1 = new TZDate();
            var d2 = new TZDate(d1.getTime());

            expect(dt.compare(d1, d2)).toBe(0);
        });

        it('return 1 when second date latest then first.', function() {
            var d1 = new TZDate();
            var d2 = new TZDate();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d1, d2)).toBe(-1);
        });
    });

    it('toUTC() convert non UTC date to UTC.', function() {
        var timezoneOffset = Math.abs(new Date().getTimezoneOffset());
        var d = new TZDate('1970-01-01T00:00:00Z'),
            utc = dt.toUTC(d);

        expect(Math.abs(utc - d)).toBe(timezoneOffset * 60 * 1000);
        expect(d).not.toEqual(utc);
    });

    describe('isValid()', function() {
        it('return true when supplied parameter is valid dates.', function() {
            var valid = new TZDate(),
                notDate = null,
                notValid = new TZDate('qweqd');

            expect(dt.isValid(valid)).toBe(true);
            expect(dt.isValid(notDate)).toBe(false);
            expect(dt.isValid(notValid)).toBe(false);
        });
    });

    describe('leadingZero()', function() {
        it('pad zero to supplied number and length.', function() {
            var num = 2;
            expect(dt.leadingZero(num, 2)).toBe('02');
            expect(dt.leadingZero(num, 3)).toBe('002');
            num = 2300;

            expect(dt.leadingZero(num, 5)).toBe('02300');
        });

        it('if number string length longer then length, then just convert string and return it.', function() {
            var num = 3000;

            expect(dt.leadingZero(num, 2)).toBe('3000');
        });
    });

    describe('parse()', function() {
        it('parse date string for safe usage.', function() {
            var str1 = '2015-06-01 12:20:00',
                str2 = '2015/06/01 10:00:00',
                str3 = '20150601';

            expect(dt.parse(str2)).toEqual(new TZDate(2015, 5, 1, 10, 0, 0));
            expect(dt.parse(str1)).toEqual(new TZDate(2015, 5, 1, 12, 20, 0));
            expect(dt.parse(str3)).toEqual(new TZDate(2015, 5, 1, 0, 0, 0));
        });

        it('return false when supplied date string is not valid.', function() {
            var valid = '2015-05-01 00:00:00';
            var notValid = '2015-5-1 3:00:00';
            var notValid2 = '2015-06-21T22:00:00Z';    // ISO date format.

            expect(dt.parse(valid)).not.toBe(false);
            expect(dt.parse(notValid)).toBe(false);
            expect(dt.parse(notValid2)).toBe(false);
        });

        it('can adjust month value fixing options.', function() {
            var str = '2015-05-01';
            expect(dt.parse(str, +1)).toEqual(new TZDate(2015, 6, 1, 0, 0, 0));
        });
    });

    describe('format()', function() {
        it('return formatted date string as basis of supplied string.', function() {
            var birth = new TZDate('1988-09-25T15:30:00+09:00');
            expect(dt.format(birth, '')).toBe('');
            expect(dt.format(birth, 'YYYY')).toBe('1988');
            expect(dt.format(birth, 'MM')).toBe('09');
            expect(dt.format(birth, 'DD')).toBe('25');
            expect(dt.format(birth, 'YYYYMMDD')).toBe('19880925');
            expect(dt.format(birth, 'HH:mm')).toBe(
                dt.leadingZero(birth.getHours(), 2) + ':' +
                dt.leadingZero(birth.getMinutes(), 2)
            );

            // expect(new TZDate(dt.format(birth, 'LOCAL'))).toEqual(birth);

            // var d2 = new TZDate('2015-05-01T09:30:00');
            // var d3 = new TZDate('2015-05-01T10:00:00');
            // expect(new TZDate(dt.format(d2, 'LOCAL'))).not.toEqual(d3);
        });
    });

    function createDate(y, M, d) {
        y = y + '';
        M = M + '';
        d = d + '';

        M.length < 2 && (M = '0' + M);
        d.length < 2 && (d = '0' + d);

        return new TZDate([y, M, d].join('-') + 'T00:00:00+09:00');
    }

    describe('arr2dCalendar()', function() {
        var options = {
            startDayOfWeek: 0,
            isAlways6Week: false
        };

        it('Providing iteratee allows you to manipulate each date element.', function() {
            var month = new TZDate('2014-10-01T00:00:00+09:00');

            var actual = dt.arr2dCalendar(month, options, function(date) {
                return { customize: true, date: date };
            });

            expect(actual[0][0]).toEqual({ customize: true, date: new TZDate('2014-09-28T00:00:00+09:00') });
        });

        it('2014/10 will be rendered on 9/28 - 11/1 at Sunday time.', function() {
            var month = new TZDate('2014-10-01T00:00:00');
            var actual = dt.arr2dCalendar(month, options);
            var expected = [
                [createDate(2014, 9, 28),
                 createDate(2014, 9, 29),
                 createDate(2014, 9, 30),
                 createDate(2014, 10, 1),
                 createDate(2014, 10, 2),
                 createDate(2014, 10, 3),
                 createDate(2014, 10, 4)],

                [createDate(2014, 10, 5),
                 createDate(2014, 10, 6),
                 createDate(2014, 10, 7),
                 createDate(2014, 10, 8),
                 createDate(2014, 10, 9),
                 createDate(2014, 10, 10),
                 createDate(2014, 10, 11)],

                [createDate(2014, 10, 12),
                 createDate(2014, 10, 13),
                 createDate(2014, 10, 14),
                 createDate(2014, 10, 15),
                 createDate(2014, 10, 16),
                 createDate(2014, 10, 17),
                 createDate(2014, 10, 18)],

                [createDate(2014, 10, 19),
                 createDate(2014, 10, 20),
                 createDate(2014, 10, 21),
                 createDate(2014, 10, 22),
                 createDate(2014, 10, 23),
                 createDate(2014, 10, 24),
                 createDate(2014, 10, 25)],

                [createDate(2014, 10, 26),
                 createDate(2014, 10, 27),
                 createDate(2014, 10, 28),
                 createDate(2014, 10, 29),
                 createDate(2014, 10, 30),
                 createDate(2014, 10, 31),
                 createDate(2014, 11, 1)]
            ];

            expect(actual).toEqual(expected);
        });

        it('2015/12 will be rendered from 11/30 to 2013/1/3 as of Monday.', function() {
            var month = new TZDate('2015-12-01T00:00:00+09:00');
            var actual = dt.arr2dCalendar(month, {
                startDayOfWeek: 1,
                isAlways6Week: false
            });
            var expected = [
                [createDate(2015, 11, 30),
                 createDate(2015, 12, 1),
                 createDate(2015, 12, 2),
                 createDate(2015, 12, 3),
                 createDate(2015, 12, 4),
                 createDate(2015, 12, 5),
                 createDate(2015, 12, 6)],

                [createDate(2015, 12, 7),
                 createDate(2015, 12, 8),
                 createDate(2015, 12, 9),
                 createDate(2015, 12, 10),
                 createDate(2015, 12, 11),
                 createDate(2015, 12, 12),
                 createDate(2015, 12, 13)],

                [createDate(2015, 12, 14),
                 createDate(2015, 12, 15),
                 createDate(2015, 12, 16),
                 createDate(2015, 12, 17),
                 createDate(2015, 12, 18),
                 createDate(2015, 12, 19),
                 createDate(2015, 12, 20)],

                [createDate(2015, 12, 21),
                 createDate(2015, 12, 22),
                 createDate(2015, 12, 23),
                 createDate(2015, 12, 24),
                 createDate(2015, 12, 25),
                 createDate(2015, 12, 26),
                 createDate(2015, 12, 27)],

                [createDate(2015, 12, 28),
                 createDate(2015, 12, 29),
                 createDate(2015, 12, 30),
                 createDate(2015, 12, 31),
                 createDate(2016, 1, 1),
                 createDate(2016, 1, 2),
                 createDate(2016, 1, 3)]
            ];

            expect(actual).toEqual(expected);
        });

        it('2016/8 will be rendered from 7/26 to 9/5 on Tuesday.', function() {
            var month = new TZDate('2016-08-01T00:00:00+09:00');
            var actual = dt.arr2dCalendar(month, {
                startDayOfWeek: 2
            });
            var expected = [
                [createDate(2016, 7, 26),
                 createDate(2016, 7, 27),
                 createDate(2016, 7, 28),
                 createDate(2016, 7, 29),
                 createDate(2016, 7, 30),
                 createDate(2016, 7, 31),
                 createDate(2016, 8, 1)],

                [createDate(2016, 8, 2),
                 createDate(2016, 8, 3),
                 createDate(2016, 8, 4),
                 createDate(2016, 8, 5),
                 createDate(2016, 8, 6),
                 createDate(2016, 8, 7),
                 createDate(2016, 8, 8)],

                [createDate(2016, 8, 9),
                 createDate(2016, 8, 10),
                 createDate(2016, 8, 11),
                 createDate(2016, 8, 12),
                 createDate(2016, 8, 13),
                 createDate(2016, 8, 14),
                 createDate(2016, 8, 15)],

                [createDate(2016, 8, 16),
                 createDate(2016, 8, 17),
                 createDate(2016, 8, 18),
                 createDate(2016, 8, 19),
                 createDate(2016, 8, 20),
                 createDate(2016, 8, 21),
                 createDate(2016, 8, 22)],

                [createDate(2016, 8, 23),
                 createDate(2016, 8, 24),
                 createDate(2016, 8, 25),
                 createDate(2016, 8, 26),
                 createDate(2016, 8, 27),
                 createDate(2016, 8, 28),
                 createDate(2016, 8, 29)],

                [createDate(2016, 8, 30),
                 createDate(2016, 8, 31),
                 createDate(2016, 9, 1),
                 createDate(2016, 9, 2),
                 createDate(2016, 9, 3),
                 createDate(2016, 9, 4),
                 createDate(2016, 9, 5)]
            ];

            expect(actual).toEqual(expected);
        });

        it('2015/11 will be rendered until 11/1 to 12/5 on Sunday.', function() {
            var month = new TZDate('2015-11-01T00:00:00+09:00');
            var actual = dt.arr2dCalendar(month, options);
            var expected = [
                [createDate(2015, 11, 1),
                 createDate(2015, 11, 2),
                 createDate(2015, 11, 3),
                 createDate(2015, 11, 4),
                 createDate(2015, 11, 5),
                 createDate(2015, 11, 6),
                 createDate(2015, 11, 7)],

                [createDate(2015, 11, 8),
                 createDate(2015, 11, 9),
                 createDate(2015, 11, 10),
                 createDate(2015, 11, 11),
                 createDate(2015, 11, 12),
                 createDate(2015, 11, 13),
                 createDate(2015, 11, 14)],

                [createDate(2015, 11, 15),
                 createDate(2015, 11, 16),
                 createDate(2015, 11, 17),
                 createDate(2015, 11, 18),
                 createDate(2015, 11, 19),
                 createDate(2015, 11, 20),
                 createDate(2015, 11, 21)],

                [createDate(2015, 11, 22),
                 createDate(2015, 11, 23),
                 createDate(2015, 11, 24),
                 createDate(2015, 11, 25),
                 createDate(2015, 11, 26),
                 createDate(2015, 11, 27),
                 createDate(2015, 11, 28)],

                [createDate(2015, 11, 29),
                 createDate(2015, 11, 30),
                 createDate(2015, 12, 1),
                 createDate(2015, 12, 2),
                 createDate(2015, 12, 3),
                 createDate(2015, 12, 4),
                 createDate(2015, 12, 5)]
            ];

            expect(actual).toEqual(expected);
        });
    });

    it('isSameMonth', function() {
        var d1 = new TZDate('2015-06-12T09:30:00');
        var d2 = new TZDate('2015-06-13T09:30:00');
        var d3 = new TZDate('2015-07-12T09:30:00');

        expect(dt.isSameMonth(d1, d2)).toBe(true);
        expect(dt.isSameMonth(d1, d3)).toBe(false);
    });

    it('isSameDate', function() {
        var d1 = new TZDate('2015-06-12T09:30:00');
        var d2 = new TZDate('2015-06-13T09:30:00');
        var d3 = new TZDate('2015-07-12T09:30:00');

        expect(dt.isSameDate(d1, d2)).toBe(false);
        expect(dt.isSameDate(d1, d3)).toBe(false);
    });

    it('startDateOfMonth', function() {
        var month = new TZDate('2015-11-24T09:30:00+09:00');
        expect(dt.startDateOfMonth(month)).toEqual(new TZDate('2015-11-01T00:00:00+09:00'));

        month = new TZDate('2015-06-24T00:00:00+09:00');
        expect(dt.startDateOfMonth(month)).toEqual(new TZDate('2015-06-01T00:00:00+09:00'));
    });

    it('endDateOfMonth', function() {
        var month = new TZDate('2015-11-24T09:30:00+09:00');
        expect(dt.endDateOfMonth(month)).toEqual(new TZDate('2015-11-30T23:59:59+09:00'));

        var month = new TZDate('2015-07-15T00:00:00+09:00');
        expect(dt.endDateOfMonth(month)).toEqual(new TZDate('2015-07-31T23:59:59+09:00'));
    });
});
