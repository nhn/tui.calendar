/*eslint-disable*/
var Event = ne.dooray.calendar.Event;

describe('model/event', function() {
    var event;

    beforeEach(function() {
        event = new Event();
    });

    it('creation', function() {
        expect(event.isAllDay).toBe(false);

        console.log(event.isValid());
        event.title = '  ';

        console.log(event.isValid());
    });
});
