/*eslint-disable*/
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var Event = ne.dooray.calendar.Event;
var Collection = ne.dooray.calendar.Collection;
var util = ne.util;
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
            idList;

        beforeEach(function() {
            eventList = [];
            idList = [];

            util.forEach(set, function(data) {
                var item = ctrl.createEvent(data);
                eventList.push(item);
                idList.push(util.stamp(item));
            });

            // Add event collection equation tester.
            jasmine.addCustomEqualityTester(function(first, second) {
                var isEqual = true;
                if (first.constructor === Collection && second.constructor === Collection) {
                    if (first.length !== second.length) {
                        return false;
                    }

                    first.each(function(item, id) {
                        if (!item.equals(second.items[id])) {
                            isEqual = false;
                            return false;
                        }
                    });
                }

                return isEqual;
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
            var col1 = new Collection(function(event) {
                return util.stamp(event);
            });
            var col2 = new Collection(function(event) {
                return util.stamp(event);
            });
            var col3 = new Collection(function(event) {
                return util.stamp(event);
            });
            col2.add(eventList[0]);
            col3.add(eventList[0], eventList[1]);

            var expected = {
                '20150430': col1,
                '20150501': col2,
                '20150502': col3
            };

            var starts = new Date('2015/04/30'),
                ends = new Date('2015/05/02');

            var result = ctrl.findByDateRange(starts, ends);

            expect(result).toEqual(expected);
        });

        it('return sorted dates.', function() {
            var col1 = new Collection(function(event) {
                return util.stamp(event);
            });
            var col2 = new Collection(function(event) {
                return util.stamp(event);
            });
            col1.add(eventList[0], eventList[3]);
            col2.add(eventList[3], eventList[1], eventList[2]);

            var expected = {
                '20150502': col1,
                '20150503': col2
            };

            var starts = new Date('2015/05/02'),
                ends = new Date('2015/05/03');

            var result = ctrl.findByDateRange(starts, ends);

            expect(result).toEqual(expected);
        });
    });

    xdescribe('updateEvent()', function() {
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
                '20150502': [id]
            });
        });

    });
});

