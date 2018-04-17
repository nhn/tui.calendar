/*eslint-disable*/
var util = require('tui-code-snippet');
var array = require('common/array');
var Collection = require('common/collection');
var ControllerFactory = require('factory/controller');
var Schedule = require('model/schedule');
var ScheduleViewModel = require('model/viewModel/scheduleViewModel');
var datetime = require('common/datetime');

describe('Base.Week', function() {
    var stamp = util.stamp;

    var base,
        ctrl,
        mockData,
        scheduleList;

    beforeEach(function() {
        base = ControllerFactory(['Week']);
        ctrl = base.Week;
        mockData = fixture.load('schedule_set_string3.json');
        scheduleList = util.map(mockData, function(data) {
            return Schedule.create(data);
        }).sort(array.compare.schedule.asc);
    });

    afterEach(function() {
        fixture.cleanup();
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
        var scheduleList,
            idList,
            panels;

        beforeEach(function() {
            scheduleList = [];
            idList = [];
            panels = [
                {
                    name: 'time',
                    type: 'timegrid',
                    autoHeight: true,
                    handlers: ['click', 'creation', 'move', 'resize'],
                    show: true
                }
            ]

            util.forEach(mockData, function(data) {
                base.createSchedule(data);
            });

            /*
             * It is different from the actual data structure.
             * Please only refer to the schedule.
             * matrix: {
             * '20150501': [id1],
             * '20150502': [id1, id4],
             * '20150503': [id2, id3, id4]
             * }
             */
        });

        it('by YMD', function() {
            var start = new Date('2015/04/30'),
                end = new Date('2015/05/02');

            var result = ctrl.findByDateRange(start, end, panels);

            // There are 5 collision blocks on 5/1.
            expect(result.time['20150501'].length).toBe(5);
        });

        it('Can add more AND clause filter function by third parameter', function() {
            var start = new Date('2015/04/30'),
                end = new Date('2015/05/02');

            // Since there is only one event with title J
            var result = ctrl.findByDateRange(start, end, panels, function(model) {return model.title === 'J';});

            // One collision block in the timeline group
            expect(result.time['20150501'].length).toBe(1);
        });
    });

});

