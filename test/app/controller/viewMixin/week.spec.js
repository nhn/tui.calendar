/*eslint-disable*/
var ControllerFactory = ne.dooray.calendar.ControllerFactory;
var EventViewModel = ne.dooray.calendar.EventViewModel;
describe('Base.Week', function() {
    var ctrl,
        set;

    beforeEach(function() {
        ctrl = ControllerFactory(['Week']);
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

