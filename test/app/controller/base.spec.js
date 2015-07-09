/*eslint-disable*/
var Base = ne.dooray.calendar.Base;
var Event = ne.dooray.calendar.Event;
describe('controller/base', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = new Base();
        set = getJSONFixture('event_set_string.json');
    });

    describe('_getContainDatesInEvent()', function() {
        var event;

        it('calculate contain dates for specific events.', function() {
            var expected = [
                new Date('2015/05/01'),
                new Date('2015/05/02'),
                new Date('2015/05/03')
            ];

            event = Event.create({
                title: 'A',
                isAllDay: true,
                starts: '2015/05/01',
                ends: '2015/05/03'
            });

            expect(ctrl._getContainDatesInEvent(event)).toEqual(expected);
        });

        it('can calculate non all day event.', function() {
            var expected = [
                new Date('2015/05/01'),
                new Date('2015/05/02'),
                new Date('2015/05/03')
            ];

            event = Event.create({
                title: 'A',
                isAllDay: false,
                starts: '2015/05/01 12:30:00',
                ends: '2015/05/03 09:20:00'
            });

            expect(ctrl._getContainDatesInEvent(event)).toEqual(expected);
        });
    });

    describe('createEvent()', function() {
        var created;

        it('return itself for chaining pattern.', function() {
            var event = Event.create(set[0]);
            expect(event.equals(ctrl.createEvent(set[0]))).toBe(true);
        });

        it('create event instance by raw event data.', function() {
            var id = util.stamp(ctrl.createEvent(set[0])),
                id2 = util.stamp(ctrl.createEvent(set[1])),
                id3;

            id3 = util.stamp(ctrl.createEvent({
                title: 'A',
                isAllDay: false,
                starts: '2015/05/02 12:30:00',
                ends: '2015/05/03 09:20:00'
            }));

            expect(ctrl.events.length).toBe(3);
            expect(ctrl.dateMatrix).toEqual({
                '20150501': [id],
                '20150502': [id, id3],
                '20150503': [id2, id3]
            });
        });
    });
});

