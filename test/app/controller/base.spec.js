/*eslint-disable*/
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var Event = ne.dooray.calendar.Event;
var Collection = ne.dooray.calendar.Collection;
var util = tui.util;
describe('controller/base', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = ControllerFactory();
        set = getJSONFixture('event_set_string.json');
    });

    describe('_getContainDatesInEvent()', function() {
        var event;

        it('calculate contain dates for specific events.', function() {
            var expected = [
                new Date('2015/05/01'),
                new Date('2015/05/02'),
                new Date('2015/05/03')
            ];

            event = Event.create({
                title: 'A',
                isAllDay: true,
                starts: '2015/05/01',
                ends: '2015/05/03'
            });

            expect(ctrl._getContainDatesInEvent(event)).toEqual(expected);
        });

        it('can calculate non all day event.', function() {
            var expected = [
                new Date('2015/05/01'),
                new Date('2015/05/02'),
                new Date('2015/05/03')
            ];

            event = Event.create({
                title: 'A',
                isAllDay: false,
                starts: '2015/05/01 12:30:00',
                ends: '2015/05/03 09:20:00'
            });

            expect(ctrl._getContainDatesInEvent(event)).toEqual(expected);
        });
    });

    describe('createEvent()', function() {
        var created;

        it('return itself for chaining pattern.', function() {
            var event = Event.create(set[0]);
            expect(event.equals(ctrl.createEvent(set[0]))).toBe(true);
        });

        it('create event instance by raw event data.', function() {
            var id = util.stamp(ctrl.createEvent(set[0])),
                id2 = util.stamp(ctrl.createEvent(set[1])),
                id3 = util.stamp(ctrl.createEvent(set[3]));

            expect(ctrl.events.length).toBe(3);
            expect(ctrl.dateMatrix).toEqual({
                '20150501': [id],
                '20150502': [id, id3],
                '20150503': [id2, id3]
            });
        });
    });

    describe('findByDateRange()', function() {
        var eventList,
            viewModels,
            idList;

        beforeEach(function() {
            eventList = [];
            viewModels = [];
            idList = [];

            util.forEach(set, function(data) {
                var item = ctrl.createEvent(data);
                eventList.push(item);
                idList.push(util.stamp(item));
            });

            // Add returned viewmodel matcher.
            jasmine.addMatchers({
                toEqualViewModel: function(util, customEqualityTesters) {
                    return {
                        compare: function(actual, expected) {
                            var result = {},
                                isEqual = true;

                            tui.util.forEach(expected, function(compareTo, ymd) {
                                var models = actual[ymd];

                                if (!models) {
                                    isEqual = false;
                                    return false;
                                }

                                titleList = tui.util.map(models.items, function(item) {
                                    return item.valueOf().title;
                                });

                                isEqual = util.equals(titleList.sort(), expected[ymd].sort());

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

            var starts = new Date('2015/04/30'),
                ends = new Date('2015/05/02');

            var result = ctrl.findByDateRange(starts, ends);

            expect(result).toEqualViewModel(expected);
        });

        it('return viewmodels in dates properly.', function() {
            var expected = {
                '20150502': ['hunting', 'A'],
                '20150503': ['A', 'meeting', 'physical training']
            };

            var starts = new Date('2015/05/02'),
                ends = new Date('2015/05/03');

            var result = ctrl.findByDateRange(starts, ends);

            expect(result).toEqualViewModel(expected);
        });
    });

    describe('updateEvent()', function() {
        var id,
            event;

        it('update owned event and date matrix.', function() {
            event = ctrl.createEvent({
                title: 'Go to work',
                isAllDay: false,
                starts: '2015/05/01 09:30:00',
                ends: '2015/05/01 18:30:00'
            });
            id = util.stamp(event);

            ctrl.updateEvent(id, {
                title: 'Go to work',
                isAllDay: false,
                starts: '2015/05/02',
                ends: '2015/05/02'
            });

            expect(ctrl.events.single()).toEqual(jasmine.objectContaining({
                title: 'Go to work',
                isAllDay: false,
                starts: new Date('2015/05/02'),
                ends: new Date('2015/05/02')
            }));

            expect(ctrl.dateMatrix).toEqual({
                '20150501': [],
                '20150502': [id]
            });
        });
    });

    describe('deleteEvent()', function() {
        var id,
            event;

        beforeEach(function() {
            event = ctrl.createEvent({
                title: 'Go to work',
                isAllDay: false,
                starts: '2015/05/01 09:30:00',
                ends: '2015/05/01 18:30:00'
            });
            id = util.stamp(event);
        });

        it('delete an event by modelID.', function() {
            expect(ctrl.deleteEvent(id)).toEqual(event);
            expect(ctrl.events.length).toBe(0);
            expect(ctrl.dateMatrix).toEqual({
                '20150501': []
            });
        });
    });

    describe('splitEventByDateRange()', function() {
        var events,
            collection;

        beforeEach(function() {
            collection = new Collection(function(item) {
                return util.stamp(item);
            });

            events = [
                Event.create({
                    title: 'A',
                    isAllDay: false,
                    starts: '2015/05/01 09:30:00',
                    ends: '2015/05/01 18:30:00'
                }),
                Event.create({
                    title: 'B',
                    isAllDay: false,
                    starts: '2015/05/02 09:30:00',
                    ends: '2015/05/02 18:30:00'
                }),
                Event.create({
                    title: 'C',
                    isAllDay: true,
                    starts: '2015/05/01 09:00:00',
                    ends: '2015/05/02 09:00:00'
                })
            ];

            collection.add.apply(collection, events);

            ctrl.addEvent(events[0]);
            ctrl.addEvent(events[1]);
            ctrl.addEvent(events[2]);
        });

        it('split event by ymd.', function() {
            var result = ctrl.splitEventByDateRange(
                new Date('2015-05-01T00:00:00+09:00'),
                new Date('2015-05-03T23:59:59+09:00'),
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

            expected['20150501'].add(events[0]);
            expected['20150501'].add(events[2]);
            expected['20150502'].add(events[1]);
            expected['20150502'].add(events[2]);

            expect(result['20150501'].items).toEqual(expected['20150501'].items);
            expect(result['20150502'].items).toEqual(expected['20150502'].items);
            expect(result['20150503'].items).toEqual(expected['20150503'].items);
        });
    });
});

