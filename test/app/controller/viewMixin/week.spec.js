/*eslint-disable*/
var stamp = ne.util.stamp;
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var EventViewModel = ne.dooray.calendar.EventViewModel;
var Collection = ne.dooray.calendar.Collection;
describe('Base.Week', function() {
    var base,
        ctrl,
        fixture,
        eventList;

    beforeEach(function() {
        base = ControllerFactory(['Week']);
        ctrl = base.Week;
        fixture = getJSONFixture('event_set_string3.json');
        eventList = util.map(fixture, function(data) {
            return Event.create(data);
        }).sort(array.compare.event.asc);
    });
        
    it('getCollisionGroup can calculate collision group arccuratly.', function() {
        var expected = [
            [stamp(eventList[0].valueOf()), 
             stamp(eventList[1].valueOf()), 
             stamp(eventList[2].valueOf()), 
             stamp(eventList[3].valueOf())],

            [stamp(eventList[4].valueOf())],

            [stamp(eventList[5].valueOf()),
             stamp(eventList[6].valueOf())],

            [stamp(eventList[7].valueOf()),
             stamp(eventList[8].valueOf()),
             stamp(eventList[9].valueOf())],

            [stamp(eventList[10].valueOf())]
        ];

        var result = ctrl.getCollisionGroup(eventList);

        expect(result).toEqual(expected);
    });

    describe('_getLastRowInColumn()', function() {
        var test;
        beforeEach(function() {
            test = [
                [1, 1, 1],
                [1, undefined, 3],
                [4, undefined, undefined]
            ];
        });

        it('return false when column not exist.', function() {
            var result = ctrl.getLastRowInColumn(test, 4);
            expect(result).toBe(false);

        });

        it('can calculate last row in column in 2d array.', function() {
            var result = ctrl.getLastRowInColumn(test, 0);
            expect(result).toBe(2);
        });
    });

    describe('_calcMatrices()', function() {
        var collection,
            cg;

        beforeEach(function() {
            collection = new Collection(function(model) {
                return util.stamp(model);
            });
            collection.add.apply(collection, eventList);
            cg = ctrl.getCollisionGroup(eventList);
        });

        it('can calculate matrices accuratly.', function() {
            var expected = [
                [
                    [EventViewModel.create(eventList[0]), EventViewModel.create(eventList[1])],
                    [EventViewModel.create(eventList[2])],
                    [EventViewModel.create(eventList[3])]
                ], [
                    [EventViewModel.create(eventList[4])]
                ], [
                    [EventViewModel.create(eventList[5]), EventViewModel.create(eventList[6])]
                ], [
                    [EventViewModel.create(eventList[7]), EventViewModel.create(eventList[8])],
                    [EventViewModel.create(eventList[9])]
                ], [
                    [EventViewModel.create(eventList[10])]
                ]
            ];
            var result = ctrl.getMatrices(collection, cg);
            //
            // console.log(result[0]);
            // console.log(expected[0]);

            expect(result).toEqual(expected);
        });
    });

    describe('findByDateRange', function() {
        var eventList,
            idList;
 
        beforeEach(function() {
            eventList = [];
            idList = [];

            util.forEach(fixture, function(data) {
                base.createEvent(data);
            });

            /*
             * matrix: {
             * '20150501': [id1],
             * '20150502': [id1, id4],
             * '20150503': [id2, id3, id4]
             * }
             */
        });

        it('by YMD', function() {
            var starts = new Date('2015/04/30'),
                ends = new Date('2015/05/02');

            var result = ctrl.findByDateRange(starts, ends);

            expect(result['20150501'].time.length).toBe(5);
        });
    });

});

