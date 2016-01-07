describe('Base.Month', function() {
    var util = tui.util,
        ControllerFactory = ne.dooray.calendar.ControllerFactory,
        CalEvent = ne.dooray.calendar.CalEvent,
        CalEventViewModel = ne.dooray.calendar.CalEventViewModel,

        base,
        controller,
        collection,
        fixture,
        eventList,
        expected,
        actual;

    beforeEach(function() {
        base = ControllerFactory(); 
        controller = base.Month;

        fixture = getJSONFixture('event_set_month.json');
        // mock event list
        eventList = util.map(fixture, function(data) {
            return CalEvent.create(data);
        }).sort(array.compare.event.asc);

        // mock controller events collection
        collection = new Collection(function(model) {
            return util.stamp(model);
        });
    });

    describe('findByDateRange()', function() {
        beforeEach(function() {
            // add event instance to controller
            util.forEach(eventList, function(event) {
                base.addEvent(event);
            });

            // test/matcher/matrices.js
            jasmine.addMatchers(matricesMatcher());
        });

        it('get events instance in month', function() {
            var starts = new Date('2015-05-01'),
                ends = new Date('2015-05-31');

            actual = controller.findByDateRange(starts, ends);

            var expectedMatrix = [
                ['A', 'B'],
                ['C']
            ];
            expect(actual[0]).toEqualMatricesTitle(expectedMatrix);

            var expectedTops = [
                [1, 2],
                [3]
            ];
            expect(actual[0]).toEqualMatricesTop(expectedTops);
        });
    });
});

