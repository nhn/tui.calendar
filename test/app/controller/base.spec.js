/*eslint-disable*/
var Base = ne.dooray.calendar.Base;
describe('controller/base', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = new Base();
        set = getJSONFixture('event_set.json');
    });

    describe('create()', function() {
        var created;

        it('can create event instance by data object.', function() {
            ctrl.create(set[0]);

            expect(ctrl.events.length).toBe(1);
            created = ctrl.events.single();
            expect(created.starts).toEqual(new Date('2015-05-01'));
            expect(created.starts).not.toEqual(new Date('2015-01-01'));
            expect(created.isAllDay).toBe(true);
        });
    });
});
