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
        
    describe('getLastRowInColumn()', function() {
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

    describe('getMatrices()', function() {
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

    describe('_hasCollide()', function() {
        var supplied;

        beforeEach(function() {
            supplied = [[2, 5], [8, 11], [14, 17]];
        });

        it('return false when supplied empty array', function() {
            expect(ctrl.hasCollide([], 3, 4)).toBe(false);
        });

        it('calculate collision information properly.', function() {
            var expected = {collision: 0, emptySpace:1};
            expect(ctrl.hasCollide(supplied, 6, 7)).toBe(false);
        });
    });

    describe('generateTimeArrayInRow()', function() {
        /**
         * |---|---|
         * | 1 | 2 |
         * |---|---|
         * | 3 | 5 |
         * |---|---|
         * | 4 |   |
         * |---|---|
         *
         * to
         *
         * [
         *     [[2.start, 2.end], [5.start, 5.end]]
         * ]
         */

        var supplied,
            expected;

        function TimeMock(start, end) {
            this.getStarts = function() {
                return {
                    getTime: function() {return start;}
                };
            };

            this.getEnds = function () {
                return {
                    getTime: function() {return end;}
                };
            };
        }

        function getTime(start, end) {
            return new TimeMock(start, end);
        }

        beforeEach(function() {
            supplied = [
                [getTime(1, 2), getTime(1, 2)],
                [getTime(4, 5), getTime(5, 6)],
                [getTime(7, 8)]
            ];

            expected = [
                [[1, 2], [5, 6]]
            ];
        });

        it('get rowmap properly.', function() {
            expect(ctrl.generateTimeArrayInRow(supplied)).toEqual(expected);
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

            expect(result.time['20150501'].length).toBe(5);
        });
    });

});

