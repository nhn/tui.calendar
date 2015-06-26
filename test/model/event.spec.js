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
});

