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
                new Date(2015, 5, 1),
                new Date(2015, 5, 2),
                new Date(2015, 5, 3)
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
                new Date(2015, 5, 1),
                new Date(2015, 5, 2),
                new Date(2015, 5, 3)
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

    xdescribe('create()', function() {
        var created;

        it('return itself for chaining pattern.', function() {
            expect(ctrl.create(set[0])).toBe(ctrl);
        });

        it('when created evnets, grouped them by YYYYMMDD formats.', function() {		
            ctrl.create(set[1]);		
            expect(ctrl.dates['20150503']).toBeDefined();		
            ctrl.create(set[2]);		
            expect(ctrl.dates['20150503'].length).toBe(2);		
        });		
        
        it('create an event model instance by supplied data object.', function() {		
            ctrl.create(set[0]);		
            expect(ctrl.dates['20150501'][0].equals(Event.create(set[0]))).toBe(true);		
        });
    });
});

