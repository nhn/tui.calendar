/*eslint-disable*/
var Schedule = require('model/Schedule');
var TZDate = require('common/timezone').Date;

describe('model/schedule basic', function() {
    var schedule;

    beforeEach(function() {
        schedule = new Schedule();
    });

    it('creation', function() {
        expect(schedule.isAllDay).toBe(false);
    });

    describe('init()', function() {
        var oldDate;
        beforeEach(function() {
            jasmine.clock().mockDate(new Date('2015/05/01 00:00:00'));
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('initialize schedule with default values when data is not supplied.', function() {
            var expected = {
                id: '',
                title: '',
                isAllDay: false,
                starts: null,
                ends: null,
                color: '#000',
                bgColor: '#a1b56c'
            };

            expect(schedule).toEqual(jasmine.objectContaining(expected));
        });

        it('initialize schedule with supplied options.', function() {
            var expected = {
                id: '123',
                title: 'Go home',
                isAllDay: false,
                starts: new TZDate('2015-05-01T00:00:00+09:00'),
                ends: new TZDate('2015-05-02T00:00:00+09:00'),
                color: '#000',
                bgColor: '#a1b56c'
            };

            var myObj = {};

            schedule.init({
                id: '123',
                title: 'Go home',
                isAllDay: false,
                starts: '2015-05-01T00:00:00+09:00',
                ends: '2015-05-02T00:00:00+09:00'
            });

            expect(schedule).toEqual(jasmine.objectContaining(expected));
        });
    });

    describe('equals()', function() {
        var schedule,
            schedule2;

        beforeEach(function() {
            schedule = new Schedule(),
            schedule2 = new Schedule();
        });

        it('return true when schedule\'s property are same', function() {
            schedule.title = 'dance';
            schedule2.title = 'dance';
            schedule.isAllDay = true;
            schedule2.isAllDay = true;
            schedule.starts = new TZDate('2015/05/01');
            schedule2.starts = new TZDate('2015/05/01');
            schedule.ends = new TZDate('2015/05/02');
            schedule2.ends = new TZDate('2015/05/02');

            expect(schedule.equals(schedule2)).toBe(true);
        });

        it('return false when title is not equals.', function() {
            schedule.title = 'meeting';
            schedule2.title = 'working';

            expect(schedule.equals(schedule2)).toBe(false);
        });

        it('return false when two schedule has different all day flags.', function() {
            schedule.title = 'dance';
            schedule2.title = 'dance';
            schedule.isAllDay = true;
            schedule2.isAllDay = false;

            expect(schedule.equals(schedule2)).toBe(false);
        });

        it('return false when two schedule has different starts or ends.', function() {
            schedule.title = 'dance';
            schedule2.title = 'dance';
            schedule.isAllDay = true;
            schedule2.isAllDay = true;
            schedule.starts = new TZDate('2015/05/01');
            schedule2.starts = new TZDate('2015/04/01');

            expect(schedule.equals(schedule2)).toBe(false);

            schedule2.starts = new TZDate('2015/05/01');

            schedule.ends = new TZDate('2015/06/01');
            schedule2.ends = new TZDate('2015/07/01');

            expect(schedule.equals(schedule2)).toBe(false);
        });
    });

    describe('duration()', function() {
        beforeEach(function() {
            schedule.starts = new TZDate('2015-09-25T05:00:00+09:00');
            schedule.ends = new TZDate('2015-09-26T05:00:00+09:00');
        });

        it('can calculate duration between starts and ends.', function() {
            expect(+schedule.duration()).toBe(+new TZDate('1970-01-02T00:00:00Z'));
        });

        it('return 24 hours when schedule is all day schedule.', function() {
            schedule.isAllDay = true;
            expect(+schedule.duration()).toBe(+new TZDate('1970-01-03T08:59:59+09:00'));
        });
    });

    describe('Schedule.create()', function() {
        it('create schedule model instance from data object.', function() {
            var mock = {
                title: 'hunting',
                isAllDay: true,
                starts: '2015/05/02',
                ends: '2015/05/02'
            };

            var schedule = Schedule.create(mock);

            var compare = new Schedule();
            compare.title = 'hunting',
            compare.isAllDay = true;
            compare.starts = new TZDate('2015/05/02');
            compare.starts.setHours(0, 0, 0);
            compare.ends = new TZDate('2015/05/02');
            compare.ends.setHours(23, 59, 59);

            expect(schedule.equals(compare)).toBe(true);
        });

        it('no error for empty some properties', function() {
            expect(function() {
                Schedule.create();
            }).not.toThrow();
        });
    });

    describe('collidesWith()', function() {
        /**
         * type - A
         * |---|
         * | A |---|
         * |---| B |
         *     |---|
         *
         * type - B
         *     |---|
         * |---| B |
         * | A |---|
         * |---|
         */
        it('Check type A, B', function() {
            var a = Schedule.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = Schedule.create({
                title: 'B',
                isAllDay: false,
                starts: '2015-05-01T09:40:00+09:00',
                ends: '2015-05-01T10:10:00+09:00'
            });

            expect(a.collidesWith(b)).toBe(true);
            expect(b.collidesWith(a)).toBe(true);
        });

        /**
         * type - C
         *
         * |---|
         * |   |---|
         * | A | B |
         * |   |---|
         * |---|
         *
         * type - D
         *     |---|
         * |---|   |
         * | A | B |
         * |---|   |
         *     |---|
         */
        it('check type C, D', function() {
            var a = Schedule.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = Schedule.create({
                title: 'B',
                isAllDay: false,
                starts: '2015-05-01T09:00:00+09:00',
                ends: '2015-05-01T10:30:00+09:00'
            });

            expect(a.collidesWith(b)).toBe(true);
            expect(b.collidesWith(a)).toBe(true);
        });

        /**
         * type - E
         * |---|
         * | A |
         * |---|
         *     |---|
         *     | B |
         *     |---|
         *
         * type - F
         *     |---|
         *     | B |
         *     |---|
         * |---|
         * | A |
         * |---|
         */
        it('check type E, F', function() {
            var a = Schedule.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = Schedule.create({
                title: 'B',
                isAllDay: false,
                starts: '2015-05-01T10:00:00+09:00',
                ends: '2015-05-01T10:30:00+09:00'
            });

            expect(a.collidesWith(b)).toBe(false);
            expect(b.collidesWith(a)).toBe(false);
        });

        /**
         * type - G
         * |---|
         * | A |
         * |---|
         *
         *     |---|
         *     | B |
         *     |---|
         *
         * type - H
         *     |---|
         *     | B |
         *     |---|
         *
         * |---|
         * | A |
         * |---|
         */
        it('check type G, H', function() {
            var a = Schedule.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T09:50:00+09:00'
            });
            var b = Schedule.create({
                title: 'B',
                isAllDay: false,
                starts: '2015-05-01T10:10:00+09:00',
                ends: '2015-05-01T10:30:00+09:00'
            });

            expect(a.collidesWith(b)).toBe(false);
            expect(b.collidesWith(a)).toBe(false);
        });
    });
});

describe('model/Schedule advanced', function() {
    var jsonFixtures;

    beforeEach(function() {
        jsonFixtures = fixture.load('mock_tasks.json');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('factory function (create())', function() {
        var e = Schedule.create(jsonFixtures[0]);

        expect(e).toEqual(jasmine.objectContaining({
            title: '스크럼',
            category: 'time',
            dueDateClass: '',
            isAllDay: false,
            starts: new TZDate('2015-10-26T09:40:00+09:00'),
            ends: new TZDate('2015-10-26T10:00:00+09:00')
        }));

        e = Schedule.create(jsonFixtures[1]);

        expect(e).toEqual(jasmine.objectContaining({
            title: '[홍길동]연차',
            category: 'allday',
            dueDateClass: '',
            isAllDay: true,
            starts: new TZDate(2015, 9, 26),
            ends: new TZDate(2015, 9, 26, 23, 59, 59)
        }));

        e = Schedule.create(jsonFixtures[2]);

        expect(e).toEqual(jasmine.objectContaining({
            title: '테스트 마일스톤1',
            category: 'milestone',
            dueDateClass: '',
            isAllDay: false,
            starts: new TZDate('2015-10-26T23:59:59+09:00'),
            ends: new TZDate('2015-10-26T23:59:59+09:00')
        }));

        e = Schedule.create(jsonFixtures[3]);

        expect(e).toEqual(jasmine.objectContaining({
            title: '테스트 업무',
            category: 'task',
            dueDateClass: 'morning',
            isAllDay: false,
            starts: new TZDate('2015-10-26T23:59:59+09:00'),
            ends: new TZDate('2015-10-26T23:59:59+09:00')
        }));
    });

    it('raw data', function() {
        var raw = {
            hello: 'world'
        };
        var e = Schedule.create({
            title: '굿',
            category: 'task',
            dueDateClass: 'morning',
            isAllDay: false,
            starts: new TZDate('2015-10-26T23:59:59+09:00'),
            ends: new TZDate('2015-10-26T23:59:59+09:00'),
            raw: raw
        });

        expect(e.raw).toEqual({hello: 'world'});

        raw.hello2 = 'good';

        expect(e.raw).toEqual({hello: 'world', hello2: 'good'});
    });
});