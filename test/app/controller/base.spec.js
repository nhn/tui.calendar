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
        it('can create event instance by data object.', function() {
            ctrl.create(set[0]);
            expect(ctrl.events.length).toBe(1);

            console.log(ctrl.events.items);
            
        });
    });
});
