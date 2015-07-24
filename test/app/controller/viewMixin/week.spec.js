/*eslint-disable*/
var stamp = ne.util.stamp;
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var EventViewModel = ne.dooray.calendar.EventViewModel;
var Collection = ne.dooray.calendar.Collection;
describe('Base.Week', function() {
    var ctrl,
        fixture,
        eventList;

    beforeEach(function() {
        ctrl = ControllerFactory(['Week']).Week;
        fixture = getJSONFixture('event_set_string3.json');
        eventList = util.map(fixture, function(data) {
            var event = Event.create(data);
            return EventViewModel.create(event);
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
            collection = new Collection(function(viewModel) {
                return util.stamp(viewModel.model);
            });
            collection.add.apply(collection, eventList);
            cg = ctrl.getCollisionGroup(eventList);
        });

        it('can calculate matrices accuratly.', function() {
            var expected = [
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
            var result = ctrl.getMatrices(collection, cg);

            expect(result).toEqual(expected);
        });
    });

    xdescribe('findByDateRange', function() {
        var eventList,
            idList;

        beforeEach(function() {
            eventList = [];
            idList = [];

            util.forEach(set, function(data) {
                var item = ctrl.createEvent(data);
                eventList.push(EventViewModel.create(item));
                idList.push(util.stamp(item));
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
            var expected = {
                '20150430': {
                    allday: [],
                    task: [],
                    time: []
                },
                '20150501': {
                    allday: [eventList[0]],
                    task: [],
                    time: []
                },
                '20150502': {
                    allday: [eventList[0]],
                    task: [],
                    time: [eventList[3]]
                }
            };

            var starts = new Date('2015/04/30'),
                ends = new Date('2015/05/02');

            var result = ctrl.Week.findByDateRange(starts, ends);
            
            expect(result).toEqual(expected);

            // expect(result['20150501'].allday).toBeDefined();
            // expect(result['20150501'].allday.single().model).toBe(eventList[0].model);
            // expect(result['20150502'].time.single().model).toBe(eventList[3].model);
        });
    });

});

