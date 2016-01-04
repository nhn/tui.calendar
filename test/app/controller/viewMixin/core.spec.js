describe('Base.Core', function() {
    var array = ne.dooray.calendar.array,
        Collection = ne.dooray.calendar.Collection,
        ControllerFactory = ne.dooray.calendar.ControllerFactory,
        CalEvent = ne.dooray.calendar.CalEvent,

        fixture,
        eventList,
        controller,
        expected,
        actual;

    beforeEach(function() {
        controller = ControllerFactory();
        fixture = getJSONFixture('event_set_string3.json');
        eventList = util.map(fixture, function(data) {
            return CalEvent.create(data);
        }).sort(array.compare.event.asc);
    });

    describe('getCollisionGroup()', function() {
        it('Get collision group properly.', function() {
            actual = controller.Core.getCollisionGroup(eventList);
            expected = [
                [100, 101, 103, 102],
                [104],
                [105, 106],
                [107, 108, 109],
                [110]
            ];

            expect(actual).toEqual(expected);
        });
    });

    describe('getLastRowInColumn()', function() {
        var test;
        beforeEach(function() {
            test = [
                [1,     1,          1        ],
                [1,     undefined,  3        ],
                [4,     undefined,  undefined]
            ];
        });

        it('return false when column not exist.', function() {
            var result = controller.Core.getLastRowInColumn(test, 4);
            expect(result).toBe(false);

        });

        it('can calculate last row in column in 2d array.', function() {
            var result = controller.Core.getLastRowInColumn(test, 0);
            expect(result).toBe(2);
        });
    });

    describe('getMatrices()', function() {
        var collection,
            cg;

        beforeEach(function() {
            collection = new Collection(function(model) {
                return util.stamp(model);
            });
            collection.add.apply(collection, eventList);
            cg = controller.Core.getCollisionGroup(eventList);
        });

        it('can calculate matrices accuratly.', function() {
            expected = [
                [
                    [eventList[0], eventList[1]],
                    [eventList[2]],
                    [eventList[3]]
                ], [
                    [eventList[4]]
                ], [
                    [eventList[5], eventList[6]]
                ], [
                    [eventList[7], eventList[8]],
                    [eventList[9]]
                ], [
                    [eventList[10]]
                ]
            ];
            actual = controller.Core.getMatrices(collection, cg);

            expect(actual).toEqual(expected);
        });
    });
});

