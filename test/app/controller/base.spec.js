/*eslint-disable*/
var Base = ne.dooray.calendar.Base;
var Event = ne.dooray.calendar.Event;
describe('controller/base', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = new Base();
        set = getJSONFixture('event_set.json');
    });

    describe('create()', function() {
        var created;

        it('return itself for chaining pattern.', function() {
            expect(ctrl.create(set[0])).toBe(ctrl);
        });

        it('can create event instance by data object.', function() {
            ctrl.create(set[0]);

            expect(ctrl.events.length).toBe(1);
            created = ctrl.events.single();
            expect(created.starts).toEqual(new Date('2015-05-01'));
            expect(created.starts).not.toEqual(new Date('2015-01-01'));
            expect(created.isAllDay).toBe(true);
        });

        it('when supplied model instance then just add to collection without create it.', function() {
            var event = Event.create(set[0]);
            expect(ctrl.create(event).events.single()).toBe(event);
        });
    });
});

