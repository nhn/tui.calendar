'use strict';

var util = require('tui-code-snippet');
var array = require('common/array');
var controllerFactory = require('factory/controller');
var Schedule = require('model/schedule');
var TZDate = require('common/timezone').Date;
var matricesMatcher = require('../../../matcher/matrices');

describe('Base.Month', function() {
    var undef = (function() {})(),
        base,
        controller,
        mockData,
        scheduleList,
        actual;

    beforeEach(function() {
        base = controllerFactory();
        controller = base.Month;

        mockData = fixture.load('schedule_set_month.json');
        // mock schedule list
        scheduleList = util.map(mockData, function(data) {
            return Schedule.create(data);
        }).sort(array.compare.schedule.asc);
    });

    afterEach(function() {
        fixture.cleanup();
    });

    describe('findByDateRange()', function() {
        beforeEach(function() {
            // add schedule instance to controller
            util.forEach(scheduleList, function(schedule) {
                base.addSchedule(schedule);
            });

            // test/matcher/matrices.js
            jasmine.addMatchers(matricesMatcher());
        });

        it('get schedules instance in month', function() {
            var start = new TZDate(2015, 10, 1),
                end = new TZDate(2015, 10, 30);

            /**
* |15        |16        |17        |18        |19        |20        |21        |
* |<<<<[김동우] 휴가>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|
* |          |<<<<김태용[오전반차]>>>>>>>>>>>>|          |          |          |
* |          |<<[류진경]>>|<<<<[일본 출장] 김지해, 장세영>>>>>>>>>>>>>|          |
* |          |<FE스크-1>|<<[김성호]>>|<FE스크-3>|<FE스크-4>|<FE스크-5>|          |
* |          |          |<FE스크-2>|<[코드리]>|<팀스터디>|<주간보고>|          |
* |          |          |<팀스터디>|          |<캘린더이>|          |          |
*/
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

            actual = controller.findByDateRange(start, end, null, true);

            expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
            expect(actual[0]).toEqualMatricesTop(expectedTop);
        });
    });

    describe('findByDateRange() by stacking time and all-day schedule', function() {
        beforeEach(function() {
            // add schedule instance to controller
            util.forEach(scheduleList, function(schedule) {
                base.addSchedule(schedule);
            });

            // test/matcher/matrices.js
            jasmine.addMatchers(matricesMatcher());
        });

        it('get schedules instance in month', function() {
            var start = new TZDate(2015, 10, 1),
                end = new TZDate(2015, 10, 30);

            /**
* |15        |16        |17        |18        |19        |20        |21        |
* |<<<<[김동우] 휴가>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|
* |          |<<<<김태용[일본출장]    >>>>>>>>>>>>| <FE스크-4>| <FE스크-5>|          |
* |          |<<[류진경]>>|<<<<[일본 출장] 김지해, 장세영>>>>>>>>>>>>>>>>>>|          |
* |          | <FE스크-1>|<<[김성호]>>| <FE스크-3>|  <팀스터디>|  <주간보고>|          |
* |          |          |  <FE스크-2>| <[코드리]>|  <캘린더이>|          |          |
* |          |          |   <팀스터디>|         |          |          |          |
*/
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
                [undef, 2, 3],
                [undef, 4, 4],
                [undef, 2, 5],
                [undef, 4, 6],
                [undef, undef, 4],
                [undef, undef, 5],
                [undef, undef, 5]
            ];

            actual = controller.findByDateRange(start, end);

            expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
            expect(actual[0]).toEqualMatricesTop(expectedTop);
        });
    });
});

