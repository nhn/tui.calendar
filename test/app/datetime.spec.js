/*eslint-disable*/
var dt = ne.dooray.calendar.datetime;
describe('datetime', function() {
    describe('millisecondsTo()', function() {
        it('convert millisecond value to other types.', function() {
            expect(dt.millisecondsTo('hour', 86400000)).toBe(24);
            expect(dt.millisecondsTo('minutes', 1800000)).toBe(30);
            expect(dt.millisecondsTo('seconds', 10000)).toBe(10);
        });

        it('return false when not supported type', function() {
            expect(dt.millisecondsTo('day', 86400000)).toBe(false);
        });
    });

    describe('millisecondsFrom()', function() {
        it('convert value to milliseconds', function() {
            expect(dt.millisecondsFrom('hour', 24)).toBe(86400000);
        });

        it('return false when supplied parameter is not supported', function() {
            expect(dt.millisecondsFrom('day', 24)).toBe(false);
        });
    });

    describe('range()', function() {
        it('makes date array by supplied dates.', function() {
            var start = new Date('2015/05/01'),
                end = new Date('2015/05/03'),
                step = dt.MILLISECONDS_PER_DAY;

            var expected = [
                new Date('2015/05/01'),
                new Date('2015/05/02'),
                new Date('2015/05/03')
            ];

            expect(dt.range(start, end, step)).toEqual(expected);
        });

        it('step test', function() {
            var start = new Date('2015/05/01 09:30:00'),
                end = new Date('2015/05/01 18:30:00');

            var expected = [
                new Date('2015/05/01 09:30:00'),
                new Date('2015/05/01 10:30:00'),
                new Date('2015/05/01 11:30:00'),
                new Date('2015/05/01 12:30:00'),
                new Date('2015/05/01 13:30:00'),
                new Date('2015/05/01 14:30:00'),
                new Date('2015/05/01 15:30:00'),
                new Date('2015/05/01 16:30:00'),
                new Date('2015/05/01 17:30:00'),
                new Date('2015/05/01 18:30:00')
            ];

            expect(dt.range(start, end, dt.MILLISECONDS_PER_HOUR)).toEqual(expected);
        });
    });

    it('start() return 00:00:00 supplied date.', function() {
        var d = new Date('2015/05/21 18:30:00');
        expect(dt.start(d)).toEqual(new Date('2015/05/21'));
        expect(d).toEqual(new Date('2015/05/21 18:30:00'));
    });

    it('end() return 23:59:59 supplied date.', function() {
        var d = new Date('2015/05/21 18:30:00');
        expect(dt.end(d)).toEqual(new Date('2015/05/21 23:59:59'));
    });

    it('raw() return date object from Date.', function() {
        var d = new Date('2015/05/01 13:20:05');

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
            var d1 = new Date();
            var cloned = dt.clone(d1);

            expect(d1.getTime() === cloned.getTime()).toBe(true);
        });
    });

    describe('compare()', function() {
        it('return -1 when first supplied date latest then second.', function() {
            var d1 = new Date();
            var d2 = new Date();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d2, d1)).toBe(1);
        });

        it('return 0 when two date are equals.', function() {
            var d1 = new Date();
            var d2 = new Date(d1.getTime());

            expect(dt.compare(d1, d2)).toBe(0);
        });

        it('return 1 when second date latest then first.', function() {
            var d1 = new Date();
            var d2 = new Date();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d1, d2)).toBe(-1);
        });
    });

    it('toUTC() convert non UTC date to UTC.', function() {
        var d = new Date('1970-01-01T00:00:00Z'),
            utc = dt.toUTC(d);

        expect(Math.abs(utc - d)).toBe(9 * 60 * 60 * 1000);
        expect(d).not.toEqual(utc);
    });

    describe('isValid()', function() {
        it('return true when supplied parameter is valid dates.', function() {
            var valid = new Date(),
                notDate = null,
                notValid = new Date('qweqd');

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

            expect(dt.parse(str2)).toEqual(new Date(2015, 5, 1, 10, 0, 0));
            expect(dt.parse(str1)).toEqual(new Date(2015, 5, 1, 12, 20, 0));
            expect(dt.parse(str3)).toEqual(new Date(2015, 5, 1, 0, 0, 0));
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
            expect(dt.parse(str, +1)).toEqual(new Date(2015, 6, 1, 0, 0, 0));
        });
    });

    describe('format()', function() {
        it('return formatted date string as basis of supplied string.', function() {
            var birth = new Date('1988-09-25T15:30:00+09:00');
            expect(dt.format(birth, '')).toBe('');
            expect(dt.format(birth, 'YYYY')).toBe('1988');
            expect(dt.format(birth, 'MM')).toBe('09');
            expect(dt.format(birth, 'DD')).toBe('25');
            expect(dt.format(birth, 'YYYYMMDD')).toBe('19880925');
            expect(dt.format(birth, 'HH:mm')).toBe(
                dt.leadingZero(birth.getHours(), 2) + ':' +
                dt.leadingZero(birth.getMinutes(), 2)
            );
        });
    });

    describe('arr2dCalendar()', function() {
        it('2014/10은 일요일 기준일 때 9/28 ~ 11/1 까지 렌더링된다.', function() {
            var month = new Date('2014-10-01T00:00:00+09:00');
            var actual = datetime.arr2dCalendar(month, 0);
            var expected = [
                [{y:2014,m:8,d:28,prev:true,next:false},
                 {y:2014,m:8,d:29,prev:true,next:false},
                 {y:2014,m:8,d:30,prev:true,next:false},
                 {y:2014,m:9,d:1,prev:false,next:false},
                 {y:2014,m:9,d:2,prev:false,next:false},
                 {y:2014,m:9,d:3,prev:false,next:false},
                 {y:2014,m:9,d:4,prev:false,next:false}],

                [{y:2014,m:9,d:5,prev:false,next:false},
                 {y:2014,m:9,d:6,prev:false,next:false},
                 {y:2014,m:9,d:7,prev:false,next:false},
                 {y:2014,m:9,d:8,prev:false,next:false},
                 {y:2014,m:9,d:9,prev:false,next:false},
                 {y:2014,m:9,d:10,prev:false,next:false},
                 {y:2014,m:9,d:11,prev:false,next:false}],

                [{y:2014,m:9,d:12,prev:false,next:false},
                 {y:2014,m:9,d:13,prev:false,next:false},
                 {y:2014,m:9,d:14,prev:false,next:false},
                 {y:2014,m:9,d:15,prev:false,next:false},
                 {y:2014,m:9,d:16,prev:false,next:false},
                 {y:2014,m:9,d:17,prev:false,next:false},
                 {y:2014,m:9,d:18,prev:false,next:false}],

                [{y:2014,m:9,d:19,prev:false,next:false},
                 {y:2014,m:9,d:20,prev:false,next:false},
                 {y:2014,m:9,d:21,prev:false,next:false},
                 {y:2014,m:9,d:22,prev:false,next:false},
                 {y:2014,m:9,d:23,prev:false,next:false},
                 {y:2014,m:9,d:24,prev:false,next:false},
                 {y:2014,m:9,d:25,prev:false,next:false}],

                [{y:2014,m:9,d:26,prev:false,next:false},
                 {y:2014,m:9,d:27,prev:false,next:false},
                 {y:2014,m:9,d:28,prev:false,next:false},
                 {y:2014,m:9,d:29,prev:false,next:false},
                 {y:2014,m:9,d:30,prev:false,next:false},
                 {y:2014,m:9,d:31,prev:false,next:false},
                 {y:2014,m:10,d:1,prev:false,next:true}]
            ];

            expect(actual).toEqual(expected);
        });

        it('2015/12는 월요일 기준일 때 11/30 ~ 2016/1/3까지 렌더링된다.', function() {
            var month = new Date('2015-12-01T00:00:00+09:00');
            var actual = datetime.arr2dCalendar(month, 1);
            var expected = [
                [{y:2015,m:10,d:30,prev:true,next:false},
                 {y:2015,m:11,d:1,prev:false,next:false},
                 {y:2015,m:11,d:2,prev:false,next:false},
                 {y:2015,m:11,d:3,prev:false,next:false},
                 {y:2015,m:11,d:4,prev:false,next:false},
                 {y:2015,m:11,d:5,prev:false,next:false},
                 {y:2015,m:11,d:6,prev:false,next:false}],

                [{y:2015,m:11,d:7,prev:false,next:false},
                 {y:2015,m:11,d:8,prev:false,next:false},
                 {y:2015,m:11,d:9,prev:false,next:false},
                 {y:2015,m:11,d:10,prev:false,next:false},
                 {y:2015,m:11,d:11,prev:false,next:false},
                 {y:2015,m:11,d:12,prev:false,next:false},
                 {y:2015,m:11,d:13,prev:false,next:false}],

                [{y:2015,m:11,d:14,prev:false,next:false},
                 {y:2015,m:11,d:15,prev:false,next:false},
                 {y:2015,m:11,d:16,prev:false,next:false},
                 {y:2015,m:11,d:17,prev:false,next:false},
                 {y:2015,m:11,d:18,prev:false,next:false},
                 {y:2015,m:11,d:19,prev:false,next:false},
                 {y:2015,m:11,d:20,prev:false,next:false}],

                [{y:2015,m:11,d:21,prev:false,next:false},
                 {y:2015,m:11,d:22,prev:false,next:false},
                 {y:2015,m:11,d:23,prev:false,next:false},
                 {y:2015,m:11,d:24,prev:false,next:false},
                 {y:2015,m:11,d:25,prev:false,next:false},
                 {y:2015,m:11,d:26,prev:false,next:false},
                 {y:2015,m:11,d:27,prev:false,next:false}],

                [{y:2015,m:11,d:28,prev:false,next:false},
                 {y:2015,m:11,d:29,prev:false,next:false},
                 {y:2015,m:11,d:30,prev:false,next:false},
                 {y:2015,m:11,d:31,prev:false,next:false},
                 {y:2016,m:0,d:1,prev:false,next:true},
                 {y:2016,m:0,d:2,prev:false,next:true},
                 {y:2016,m:0,d:3,prev:false,next:true}]
            ];

            expect(actual).toEqual(expected);
        });

        it('2016/8은 화요일 기준일 때 7/26 ~ 9/5까지 렌더링된다.', function() {
            var month = new Date('2016-08-01T00:00:00+09:00');
            var actual = datetime.arr2dCalendar(month, 2);
            var expected = [
                [{y:2016,m:6,d:26,prev:true,next:false},
                 {y:2016,m:6,d:27,prev:true,next:false},
                 {y:2016,m:6,d:28,prev:true,next:false},
                 {y:2016,m:6,d:29,prev:true,next:false},
                 {y:2016,m:6,d:30,prev:true,next:false},
                 {y:2016,m:6,d:31,prev:true,next:false},
                 {y:2016,m:7,d:1,prev:false,next:false}],

                [{y:2016,m:7,d:2,prev:false,next:false},
                 {y:2016,m:7,d:3,prev:false,next:false},
                 {y:2016,m:7,d:4,prev:false,next:false},
                 {y:2016,m:7,d:5,prev:false,next:false},
                 {y:2016,m:7,d:6,prev:false,next:false},
                 {y:2016,m:7,d:7,prev:false,next:false},
                 {y:2016,m:7,d:8,prev:false,next:false}],

                [{y:2016,m:7,d:9,prev:false,next:false},
                 {y:2016,m:7,d:10,prev:false,next:false},
                 {y:2016,m:7,d:11,prev:false,next:false},
                 {y:2016,m:7,d:12,prev:false,next:false},
                 {y:2016,m:7,d:13,prev:false,next:false},
                 {y:2016,m:7,d:14,prev:false,next:false},
                 {y:2016,m:7,d:15,prev:false,next:false}],

                [{y:2016,m:7,d:16,prev:false,next:false},
                 {y:2016,m:7,d:17,prev:false,next:false},
                 {y:2016,m:7,d:18,prev:false,next:false},
                 {y:2016,m:7,d:19,prev:false,next:false},
                 {y:2016,m:7,d:20,prev:false,next:false},
                 {y:2016,m:7,d:21,prev:false,next:false},
                 {y:2016,m:7,d:22,prev:false,next:false}],

                [{y:2016,m:7,d:23,prev:false,next:false},
                 {y:2016,m:7,d:24,prev:false,next:false},
                 {y:2016,m:7,d:25,prev:false,next:false},
                 {y:2016,m:7,d:26,prev:false,next:false},
                 {y:2016,m:7,d:27,prev:false,next:false},
                 {y:2016,m:7,d:28,prev:false,next:false},
                 {y:2016,m:7,d:29,prev:false,next:false}],

                [{y:2016,m:7,d:30,prev:false,next:false},
                 {y:2016,m:7,d:31,prev:false,next:false},
                 {y:2016,m:8,d:1,prev:false,next:true},
                 {y:2016,m:8,d:2,prev:false,next:true},
                 {y:2016,m:8,d:3,prev:false,next:true},
                 {y:2016,m:8,d:4,prev:false,next:true},
                 {y:2016,m:8,d:5,prev:false,next:true}]
            ];

            expect(actual).toEqual(expected);
        });

        it('2015/11은 일요일 기준일 때 11/1 ~ 12/5까지 렌더링된다.', function() {
            var month = new Date('2015-11-01T00:00:00+09:00');
            var actual = datetime.arr2dCalendar(month, 0);
            var expected = [
                [{y:2015,m:10,d:1,prev:false,next:false},
                 {y:2015,m:10,d:2,prev:false,next:false},
                 {y:2015,m:10,d:3,prev:false,next:false},
                 {y:2015,m:10,d:4,prev:false,next:false},
                 {y:2015,m:10,d:5,prev:false,next:false},
                 {y:2015,m:10,d:6,prev:false,next:false},
                 {y:2015,m:10,d:7,prev:false,next:false}],

                [{y:2015,m:10,d:8,prev:false,next:false},
                 {y:2015,m:10,d:9,prev:false,next:false},
                 {y:2015,m:10,d:10,prev:false,next:false},
                 {y:2015,m:10,d:11,prev:false,next:false},
                 {y:2015,m:10,d:12,prev:false,next:false},
                 {y:2015,m:10,d:13,prev:false,next:false},
                 {y:2015,m:10,d:14,prev:false,next:false}],

                [{y:2015,m:10,d:15,prev:false,next:false},
                 {y:2015,m:10,d:16,prev:false,next:false},
                 {y:2015,m:10,d:17,prev:false,next:false},
                 {y:2015,m:10,d:18,prev:false,next:false},
                 {y:2015,m:10,d:19,prev:false,next:false},
                 {y:2015,m:10,d:20,prev:false,next:false},
                 {y:2015,m:10,d:21,prev:false,next:false}],

                [{y:2015,m:10,d:22,prev:false,next:false},
                 {y:2015,m:10,d:23,prev:false,next:false},
                 {y:2015,m:10,d:24,prev:false,next:false},
                 {y:2015,m:10,d:25,prev:false,next:false},
                 {y:2015,m:10,d:26,prev:false,next:false},
                 {y:2015,m:10,d:27,prev:false,next:false},
                 {y:2015,m:10,d:28,prev:false,next:false}],

                [{y:2015,m:10,d:29,prev:false,next:false},
                 {y:2015,m:10,d:30,prev:false,next:false},
                 {y:2015,m:11,d:1,prev:false,next:true},
                 {y:2015,m:11,d:2,prev:false,next:true},
                 {y:2015,m:11,d:3,prev:false,next:true},
                 {y:2015,m:11,d:4,prev:false,next:true},
                 {y:2015,m:11,d:5,prev:false,next:true}]
            ];

            expect(actual).toEqual(expected);
        });
    });
});
