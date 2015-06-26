/*eslint-disable*/
var util = ne.util;
var Event = ne.dooray.calendar.Event;
var Collection = ne.dooray.calendar.Colleciton;
var SortController = ne.dooray.calendar.SortController;

describe('controller/sort', function() {
    var col,
        ctrl,
        fixture;

    beforeEach(function() {
        col = new Collection(function(model) {
            return util.stamp(model);
        });
        ctrl = new SortController();
        fixture = getJSONFixture('event_set.json');

        util.forEach(fixture, function(data) {
            col.add(Event.create(data));
        });
    });

    describe('process()', function() {
        it('test', function() {
            ctrl.process(col);
        });
    });
});

