/*eslint-disable*/
var util = require('tui-code-snippet');
var array = require('common/array');
var Collection = require('common/collection');
var ControllerFactory = require('factory/controller');
var Schedule = require('model/schedule');
var ScheduleViewModel = require('model/viewModel/scheduleViewModel');
var datetime = require('common/datetime');
var TZDate = require('common/timezone').Date;

describe('controller/base', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = ControllerFactory();
        set = fixture.load('schedule_set_string.json');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    describe('_getContainDatesInSchedule()', function() {
        var schedule;

        it('calculate contain dates for specific schedules.', function() {
            var expected = [
                new TZDate('2015/05/01'),
                new TZDate('2015/05/02'),
                new TZDate('2015/05/03')
            ];

            schedule = Schedule.create({
                title: 'A',
                isAllDay: true,
                start: '2015/05/01',
                end: '2015/05/03'
            });

            expect(ctrl._getContainDatesInSchedule(schedule)).toEqual(expected);
        });

        it('can calculate non all day schedule.', function() {
            var expected = [
                new TZDate('2015/05/01'),
                new TZDate('2015/05/02'),
                new TZDate('2015/05/03')
            ];

            schedule = Schedule.create({
                title: 'A',
                isAllDay: false,
                start: '2015/05/01 12:30:00',
                end: '2015/05/03 09:20:00'
            });

            expect(ctrl._getContainDatesInSchedule(schedule)).toEqual(expected);
        });
    });

    describe('createSchedule()', function() {
        var created;

        it('return itself for chaining pattern.', function() {
            var schedule = Schedule.create(set[0]);
            expect(schedule.equals(ctrl.createSchedule(set[0]))).toBe(true);
        });

        it('create schedule instance by raw schedule data.', function() {
            var id = util.stamp(ctrl.createSchedule(set[0])),
                id2 = util.stamp(ctrl.createSchedule(set[1])),
                id3 = util.stamp(ctrl.createSchedule(set[3]));

            expect(ctrl.schedules.length).toBe(3);
            expect(ctrl.dateMatrix).toEqual({
                '20150501': [id],
                '20150502': [id, id3],
                '20150503': [id2, id3]
            });
        });
    });

    describe('findByDateRange()', function() {
        var scheduleList,
            viewModels,
            idList;

        beforeEach(function() {
            scheduleList = [];
            viewModels = [];
            idList = [];

            util.forEach(set, function(data) {
                var item = ctrl.createSchedule(data);
                scheduleList.push(item);
                idList.push(util.stamp(item));
            });

            // Add returned viewmodel matcher.
            jasmine.addMatchers({
                toEqualViewModel: function(matchersUtil, customEqualityTesters) {
                    return {
                        compare: function(actual, expected) {
                            var result = {},
                                isEqual = true;

                                util.forEach(expected, function(compareTo, ymd) {
                                var models = actual[ymd];

                                if (!models) {
                                    isEqual = false;
                                    return false;
                                }

                                titleList = util.map(models.items, function(item) {
                                    return item.valueOf().title;
                                });

                                isEqual = matchersUtil.equals(titleList.sort(), expected[ymd].sort());

                                return isEqual;
                            });

                            result.pass = isEqual;

                            return result;
                        }
                    };
                }
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
                '20150430': [],
                '20150501': ['hunting'],
                '20150502': ['hunting', 'A']
            };

            var start = new TZDate('2015/04/30'),
                end = new TZDate('2015/05/02');

            var result = ctrl.findByDateRange(start, end);

            expect(result).toEqualViewModel(expected);
        });

        it('return viewmodels in dates properly.', function() {
            var expected = {
                '20150502': ['hunting', 'A'],
                '20150503': ['A', 'meeting', 'physical training']
            };

            var start = new TZDate('2015/05/02'),
                end = new TZDate('2015/05/03');

            var result = ctrl.findByDateRange(start, end);

            expect(result).toEqualViewModel(expected);
        });
    });

    describe('updateSchedule()', function() {
        var id,
            model;

        it('update owned schedule and date matrix.', function() {
            model = ctrl.createSchedule({
                title: 'Go to work',
                isAllDay: false,
                start: '2015/05/01 09:30:00',
                end: '2015/05/01 18:30:00'
            });
            id = util.stamp(model);

            ctrl.updateSchedule(model, {
                title: 'Go to work',
                isAllDay: false,
                start: '2015/05/02',
                end: '2015/05/02'
            });

            expect(ctrl.schedules.single()).toEqual(jasmine.objectContaining({
                title: 'Go to work',
                isAllDay: false,
                start: new TZDate('2015/05/02'),
                end: new TZDate('2015/05/02')
            }));

            expect(ctrl.dateMatrix).toEqual({
                '20150501': [],
                '20150502': [id]
            });
        });
    });

    describe('deleteSchedule()', function() {
        var id,
            schedule;

        beforeEach(function() {
            schedule = ctrl.createSchedule({
                title: 'Go to work',
                isAllDay: false,
                start: '2015/05/01 09:30:00',
                end: '2015/05/01 18:30:00'
            });
            id = util.stamp(schedule);
        });

        it('delete an schedule by model.', function() {
            expect(ctrl.deleteSchedule(schedule)).toEqual(schedule);
            expect(ctrl.schedules.length).toBe(0);
            expect(ctrl.dateMatrix).toEqual({
                '20150501': []
            });
        });
    });

    describe('splitScheduleByDateRange()', function() {
        var schedules,
            collection;

        beforeEach(function() {
            collection = new Collection(function(item) {
                return util.stamp(item);
            });

            schedules = [
                Schedule.create({
                    title: 'A',
                    isAllDay: false,
                    start: '2015/05/01 09:30:00',
                    end: '2015/05/01 18:30:00'
                }),
                Schedule.create({
                    title: 'B',
                    isAllDay: false,
                    start: '2015/05/02 09:30:00',
                    end: '2015/05/02 18:30:00'
                }),
                Schedule.create({
                    title: 'C',
                    isAllDay: true,
                    start: '2015/05/01 09:00:00',
                    end: '2015/05/02 09:00:00'
                })
            ];

            collection.add.apply(collection, schedules);

            ctrl.addSchedule(schedules[0]);
            ctrl.addSchedule(schedules[1]);
            ctrl.addSchedule(schedules[2]);
        });

        it('split schedule by ymd.', function() {
            var result = ctrl.splitScheduleByDateRange(
                new TZDate('2015-05-01T00:00:00+09:00'),
                new TZDate('2015-05-03T23:59:59+09:00'),
                collection
            );

            var expected = {
                '20150501': new Collection(function(item) {
                    return util.stamp(item);
                }),
                '20150502': new Collection(function(item) {
                    return util.stamp(item);
                }),
                '20150503': new Collection(function(item) {
                    return util.stamp(item);
                })
            };

            expected['20150501'].add(schedules[0]);
            expected['20150501'].add(schedules[2]);
            expected['20150502'].add(schedules[1]);
            expected['20150502'].add(schedules[2]);

            expect(result['20150501'].items).toEqual(expected['20150501'].items);
            expect(result['20150502'].items).toEqual(expected['20150502'].items);
            expect(result['20150503'].items).toEqual(expected['20150503'].items);
        });
    });
});

