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

    describe('create()', function() {
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

