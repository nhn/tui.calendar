describe('Base.Core', function() {
    var array = ne.dooray.calendar.array,
        Collection = ne.dooray.calendar.Collection,
        ControllerFactory = ne.dooray.calendar.ControllerFactory,
        CalEvent = ne.dooray.calendar.CalEvent,
        CalEventviewModel = ne.dooray.calendar.CalEventViewModel,

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

    describe('limitRenderRange', function() {
        var collection;

        beforeEach(function() {
            collection = new Collection(function(viewModel) {
                return viewModel.cid();
            });
        });

        it('fill renderStarts, renderEnds to each view model in collection.', function() {
            // 5/1 10:20 ~ 5/1 10:40
            collection.add(CalEventViewModel.create(eventList[0]));

            var limit1 = new Date('2015-05-01T10:30:00+09:00');
            var limit2 = new Date('2015-05-01T10:40:00+09:00');
            var viewModel;

            controller.Core.limitRenderRange(limit1, limit2, collection);

            viewModel = collection.single();

            expect(viewModel.renderStarts).toEqual(limit1);
            expect(viewModel.renderEnds).toBe(null);
        });
    });

    describe('getEventInDateRangeFilter', function() {
        var collection;

        beforeEach(function() {
            collection = new Collection(function(viewModel) {
                return viewModel.cid();
            });
        });

        it('filter events properly.', function() {
            var filter, d1, d2;

            //                     starts ------------- ends
            // A ownStart - ownEnd
            // B ownStart -------- ownEnd
            // C ownStart ------------------ ownEnd
            // D                   ownSta -- ownEnd
            // E                           ownS - ownE
            // F                            ownSta --- ownEn
            // G                             ownStart ------------------- ownEnd
            // H                                        ownS ------------ ownEnd
            // I                                               ownStart - ownEnd
            // L ownStart ----------------------------------------------- ownEnd

            // 10:20 ~ 10:40
            collection.add(CalEventViewModel.create(eventList[0]));

            // A: 09:30 ~ 10:10
            d1 = new Date('2015-05-01T09:30:00+09:00');
            d2 = new Date('2015-05-01T10:10:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(0);

            // B: 09:30 ~ 10:20
            d1 = new Date('2015-05-01T09:30:00+09:00');
            d2 = new Date('2015-05-01T10:20:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);

            // C: 09:30 ~ 10:30
            d1 = new Date('2015-05-01T09:30:00+09:00');
            d2 = new Date('2015-05-01T10:30:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);

            // D: 10:20 ~ 10:30
            d1 = new Date('2015-05-01T10:20:00+09:00');
            d2 = new Date('2015-05-01T10:30:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);

            // E: 10:25 ~ 10:35
            d1 = new Date('2015-05-01T10:25:00+09:00');
            d2 = new Date('2015-05-01T10:35:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);

            // F: 10:30 ~ 10:40
            d1 = new Date('2015-05-01T10:30:00+09:00');
            d2 = new Date('2015-05-01T10:40:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);
            
            // G: 10:30 ~ 10:50
            d1 = new Date('2015-05-01T10:30:00+09:00');
            d2 = new Date('2015-05-01T10:50:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);
            
            // H: 10:40 ~ 10:50
            d1 = new Date('2015-05-01T10:40:00+09:00');
            d2 = new Date('2015-05-01T10:50:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);

            // I: 10:50 ~ 10:55
            d1 = new Date('2015-05-01T10:50:00+09:00');
            d2 = new Date('2015-05-01T10:55:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(0);

            // L: 10:10 ~ 10:50
            d1 = new Date('2015-05-01T10:10:00+09:00');
            d2 = new Date('2015-05-01T10:50:00+09:00');
            filter = controller.Core.getEventInDateRangeFilter(d1, d2);
            expect(collection.find(filter).length).toBe(1);
        });
    });
});

