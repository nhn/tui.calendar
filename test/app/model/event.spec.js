/*eslint-disable*/
var CalEvent = require('model/calEvent');
var TZDate = require('common/timezone').Date;

describe('model/event', function() {
    var event;

    beforeEach(function() {
        event = new CalEvent();
    });

    it('creation', function() {
        expect(event.isAllDay).toBe(false);
    });

    describe('init()', function() {
        var oldDate;
        beforeEach(function() {
            jasmine.clock().mockDate(new Date('2015/05/01 00:00:00'));
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('initialize event with default values when data is not supplied.', function() {
            var expected = {
                id: '',
                title: '',
                isAllDay: false,
                starts: null,
                ends: null,
                color: '#000',
                bgColor: '#a1b56c'
            };

            expect(event).toEqual(jasmine.objectContaining(expected));
        });

        it('initialize event with supplied options.', function() {
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

            event.init({
                id: '123',
                title: 'Go home',
                isAllDay: false,
                starts: '2015-05-01T00:00:00+09:00',
                ends: '2015-05-02T00:00:00+09:00'
            });

            expect(event).toEqual(jasmine.objectContaining(expected));
        });
    });

    describe('equals()', function() {
        var event,
            event2;

        beforeEach(function() {
            event = new CalEvent(),
            event2 = new CalEvent();
        });

        it('return true when event\'s property are same', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = true;
            event.starts = new TZDate('2015/05/01');
            event2.starts = new TZDate('2015/05/01');
            event.ends = new TZDate('2015/05/02');
            event2.ends = new TZDate('2015/05/02');

            expect(event.equals(event2)).toBe(true);
        });

        it('return false when title is not equals.', function() {
            event.title = 'meeting';
            event2.title = 'working';

            expect(event.equals(event2)).toBe(false);
        });

        it('return false when two event has different all day flags.', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = false;

            expect(event.equals(event2)).toBe(false);
        });

        it('return false when two event has different starts or ends.', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = true;
            event.starts = new TZDate('2015/05/01');
            event2.starts = new TZDate('2015/04/01');

            expect(event.equals(event2)).toBe(false);

            event2.starts = new TZDate('2015/05/01');

            event.ends = new TZDate('2015/06/01');
            event2.ends = new TZDate('2015/07/01');

            expect(event.equals(event2)).toBe(false);
        });
    });

    describe('duration()', function() {
        beforeEach(function() {
            event.starts = new TZDate('2015-09-25T05:00:00+09:00');
            event.ends = new TZDate('2015-09-26T05:00:00+09:00');
        });

        it('can calculate duration between starts and ends.', function() {
            expect(+event.duration()).toBe(+new TZDate('1970-01-02T00:00:00Z'));
        });

        it('return 24 hours when event is all day event.', function() {
            event.isAllDay = true;
            expect(+event.duration()).toBe(+new TZDate('1970-01-03T08:59:59+09:00'));
        });
    });

    describe('CalEvent.create()', function() {
        it('create event model instance from data object.', function() {
            var mock = {
                title: 'hunting',
                isAllDay: true,
                starts: '2015/05/02',
                ends: '2015/05/02'
            };

            var event = CalEvent.create(mock);

            var compare = new CalEvent();
            compare.title = 'hunting',
            compare.isAllDay = true;
            compare.starts = new TZDate('2015/05/02');
            compare.starts.setHours(0, 0, 0);
            compare.ends = new TZDate('2015/05/02');
            compare.ends.setHours(23, 59, 59);

            expect(event.equals(compare)).toBe(true);
        });

        it('no error for empty some properties', function() {
            expect(function() {
                CalEvent.create();
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
            var a = CalEvent.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = CalEvent.create({
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
            var a = CalEvent.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = CalEvent.create({
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
            var a = CalEvent.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T10:00:00+09:00'
            });
            var b = CalEvent.create({
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
            var a = CalEvent.create({
                title: 'A',
                isAllDay: false,
                starts: '2015-05-01T09:30:00+09:00',
                ends: '2015-05-01T09:50:00+09:00'
            });
            var b = CalEvent.create({
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

