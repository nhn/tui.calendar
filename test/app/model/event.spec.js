/*eslint-disable*/
var Event = ne.dooray.calendar.Event;

describe('model/event', function() {
    var event;

    beforeEach(function() {
        event = new Event();
    });

    it('creation', function() {
        expect(event.isAllDay).toBe(false);
    });

    describe('isSame()', function() {
        var event,
            event2;

        beforeEach(function() {
            event = new Event(),
            event2 = new Event();
        });

        it('return true when event\'s property are same', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = true;
            event.starts = moment('2015-05-01');
            event2.starts = moment('2015-05-01');
            event.ends = moment('2015-05-02');
            event2.ends = moment('2015-05-02');

            expect(event.isSame(event2)).toBe(true);
        });

        it('return false when title is not equals.', function() {
            event.title = 'meeting';
            event2.title = 'working';

            expect(event.isSame(event2)).toBe(false);
        });

        it('return false when two event has different all day flags.', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = false;

            expect(event.isSame(event2)).toBe(false);
        });

        it('return false when two event has different starts or ends.', function() {
            event.title = 'dance';
            event2.title = 'dance';
            event.isAllDay = true;
            event2.isAllDay = true;
            event.starts = moment('2015-05-01');
            event2.starts = moment('2015-04-01');

            expect(event.isSame(event2)).toBe(false);

            event2.starts = moment('2015-05-01');

            event.ends = moment('2015-06-01');
            event2.ends = moment('2015-07-01');

            expect(event.isSame(event2)).toBe(false);
        });
    });

    describe('duration()', function() {
        beforeEach(function() {
            event.starts = moment('9/25 12:30', 'MM/DD HH:mm');
            event.ends = moment('9/25 13:00', 'MM/DD HH:mm');
        });

        it('can calculate duration between starts and ends.', function() {
            expect(event.duration()+'').toEqual(moment.duration('00:30:00')+'');
        });

        it('return 24 hours when event is all day event.', function() {
            event.isAllDay = true;

            expect(event.duration()+'').toEqual(moment.duration('24:00:00')+'');
        });

        it('starts and ends are invalid then return 00:00:00.', function() {
            event.starts = null;

            expect(event.duration()+'').toEqual(moment.duration('00:00:00')+'');
        });
    });

    describe('Event.create()', function() {
        it('create event model instance from data object.', function() {
            var mock = {
                title: 'hunting',
                isAllDay: true,
                starts: '2015-05-02',
                ends: '2015-05-02'
            };

            var event = Event.create(mock);

            var compare = new Event();
            compare.title = 'hunting',
            compare.isAllDay = true;
            compare.starts = moment('2015-05-02');
            compare.ends = moment('2015-05-02');

            expect(event.isSame(compare)).toBe(true);
        });
    });
});

