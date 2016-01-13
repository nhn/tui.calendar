describe('Base.Month', function() {
    var undef = (function() {})(),
        util = tui.util,
        ControllerFactory = ne.dooray.calendar.ControllerFactory,
        CalEvent = ne.dooray.calendar.CalEvent,
        CalEventViewModel = ne.dooray.calendar.CalEventViewModel,

        base,
        controller,
        collection,
        fixture,
        eventList,
        expected,
        actual;

    beforeEach(function() {
        base = ControllerFactory(); 
        controller = base.Month;

        fixture = getJSONFixture('event_set_month.json');
        // mock event list
        eventList = util.map(fixture, function(data) {
            return CalEvent.create(data);
        }).sort(array.compare.event.asc);

        // mock controller events collection
        collection = new Collection(function(model) {
            return util.stamp(model);
        });
    });

    describe('findByDateRange()', function() {
        beforeEach(function() {
            // add event instance to controller
            util.forEach(eventList, function(event) {
                base.addEvent(event);
            });

            // test/matcher/matrices.js
            jasmine.addMatchers(matricesMatcher());
        });

        it('get events instance in month', function() {
            var starts = new Date('2015-11-01'),
                ends = new Date('2015-11-30');

            actual = controller.findByDateRange(starts, ends);
/**
* |15        |16        |17        |18        |19        |20        |21        |
* |<<<<[김동우] 휴가>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|
* |          |<<<<김태용[오전반차]>>>>>>>>>>>>|          |          |          |
* |          |<[류진경]>|<<<<[일본 출장] 김지해, 장세영>>>>>>>>>>>>>|          |
* |          |<FE스크-1>|<[김성호]>|<FE스크-3>|<FE스크-4>|<FE스크-5>|          |
* |          |          |<FE스크-2>|<[코드리]>|<팀스터디>|<주간보고>|          |
* |          |          |<팀스터디>|          |<캘린더이>|          |          |
*/
            var expectedCountByDate = {
                '20151115': 1,
                '20151116': 4,
                '20151117': 6,
                '20151118': 5,
                '20151119': 5,
                '20151120': 4,
                '20151121': 1
            };

            var expectedMatrix = [
                ['[김동우] 휴가', '김태용[일본출장]', '[류진경] 오전반차', '[김성호] 연차'],
                [undef, 'FE 스크럼 - 4', '[일본 출장] 김지해, 장세영'],
                [undef, '팀 스터디 - B', 'FE 스크럼 - 1'],
                [undef, 'FE 스크럼 - 5', 'FE 스크럼 - 2'],
                [undef, '주간보고 작성', '팀 스터디 - A'],
                [undef, undef, 'FE 스크럼 - 3'],
                [undef, undef, '[코드리뷰] 콤보차트 리펙토링'],
                [undef, undef, '캘린더이야기']
            ];

            var expectedTop = [
                [1, 2, 3, 4],
                [undef, 4, 3],
                [undef, 5, 4],
                [undef, 4, 5],
                [undef, 5, 6],
                [undef, undef, 4],
                [undef, undef, 5],
                [undef, undef, 6]
            ];

            expect(actual.countByDate).toEqual(expectedCountByDate);
            expect(actual.matrices[0]).toEqualMatricesTitle(expectedMatrix);
            expect(actual.matrices[0]).toEqualMatricesTop(expectedTop);
        });
    });
});

