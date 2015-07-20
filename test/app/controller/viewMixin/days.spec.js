/*eslint-disable*/
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var DaysViewModel = ne.dooray.calendar.DaysViewModel;
describe('Base.Days', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = ControllerFactory(['Days']);
        set = getJSONFixture('event_set_string.json');
    });

    describe('findByDateRange', function() {
        var eventList,
            idList;

        beforeEach(function() {
            eventList = [];
            idList = [];

            util.forEach(set, function(data) {
                var item = ctrl.createEvent(data);
                eventList.push(DaysViewModel.create(item));
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
                '20150501': [eventList[0]],
                '20150502': [eventList[0], eventList[3]]
            };

            var starts = new Date('2015/04/30'),
                ends = new Date('2015/05/02');

            var result = ctrl.Days.findByDateRange(starts, ends);

            expect(result).toEqual(expected);
        });
    });

});

