import { createScheduleCollection, addSchedule } from '@src/controller/base';
import { ScheduleData, DataStore } from '@src/model';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import array from '@src/util/array';
import { findByDateRange } from '@src/controller/month';

import matricesMatcher from '@test/matcher/matrices';

describe('Base.Month', function() {
  // eslint-disable-next-line no-undefined
  const undef = undefined;
  let dataStore: DataStore;
  let mockData: ScheduleData[];
  let scheduleList: Schedule[];
  let actual;

  beforeEach(function() {
    dataStore = {
      calendars: [],
      schedules: createScheduleCollection(),
      idsOfDay: {}
    };

    mockData = fixture.load('schedule_set_month.json');
    // mock schedule list
    scheduleList = mockData.map(data => Schedule.create(data)).sort(array.compare.schedule.asc);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('findByDateRange()', function() {
    beforeEach(function() {
      // add schedule instance to controller
      scheduleList.forEach(schedule => {
        addSchedule(dataStore, schedule);
      });

      // test/matcher/matrices.js
      jasmine.addMatchers(matricesMatcher);
    });

    it('get schedules instance in month', function() {
      const start = new TZDate(2015, 10, 1);
      const end = new TZDate(2015, 10, 30);

      /**
       * |15        |16        |17        |18        |19        |20        |21        |
       * |<<<<[김동우] 휴가>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|
       * |          |<<<<김태용[오전반차]>>>>>>>>>>>>|          |          |          |
       * |          |<<[류진경]>>|<<<<[일본 출장] 김지해, 장세영>>>>>>>>>>>>>|          |
       * |          |<FE스크-1>|<<[김성호]>>|<FE스크-3>|<FE스크-4>|<FE스크-5>|          |
       * |          |          |<FE스크-2>|<[코드리]>|<팀스터디>|<주간보고>|          |
       * |          |          |<팀스터디>|          |<캘린더이>|          |          |
       */
      const expectedMatrix = [
        ['[김동우] 휴가', '김태용[일본출장]', '[류진경] 오전반차', '[김성호] 연차'],
        [undef, 'FE 스크럼 - 4', '[일본 출장] 김지해, 장세영'],
        [undef, '팀 스터디 - B', 'FE 스크럼 - 1'],
        [undef, 'FE 스크럼 - 5', 'FE 스크럼 - 2'],
        [undef, '주간보고 작성', '팀 스터디 - A'],
        [undef, undef, 'FE 스크럼 - 3'],
        [undef, undef, '[코드리뷰] 콤보차트 리펙토링'],
        [undef, undef, '캘린더이야기']
      ];

      const expectedTop = [
        [1, 2, 3, 4],
        [undef, 4, 3],
        [undef, 5, 4],
        [undef, 4, 5],
        [undef, 5, 6],
        [undef, undef, 4],
        [undef, undef, 5],
        [undef, undef, 6]
      ];

      actual = findByDateRange(dataStore, { start, end, andFilters: [], alldayFirstMode: true });

      expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
      expect(actual[0]).toEqualMatricesTop(expectedTop);
    });
  });

  describe('findByDateRange() by stacking time and all-day schedule', function() {
    beforeEach(function() {
      // add schedule instance to controller
      scheduleList.forEach(schedule => {
        addSchedule(dataStore, schedule);
      });

      // test/matcher/matrices.js
      jasmine.addMatchers(matricesMatcher);
    });

    it('get schedules instance in month for all-day schedule', function() {
      const start = new TZDate(2015, 10, 1);
      const end = new TZDate(2015, 10, 30);

      /**
       * |15        |16        |17        |18        |19        |20        |21        |
       * |<<<<[김동우] 휴가>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>|
       * |          |<<<<김태용[일본출장]    >>>>>>>>>>>>| <FE스크-4>| <FE스크-5>|          |
       * |          |<<[류진경]>>|<<<<[일본 출장] 김지해, 장세영>>>>>>>>>>>>>>>>>>|          |
       * |          | <FE스크-1>|<<[김성호]>>| <FE스크-3>|  <팀스터디>|  <주간보고>|          |
       * |          |          |  <FE스크-2>| <[코드리]>|  <캘린더이>|          |          |
       * |          |          |   <팀스터디>|         |          |          |          |
       */
      const expectedMatrix = [
        ['[김동우] 휴가', '김태용[일본출장]', '[류진경] 오전반차', '[김성호] 연차'],
        [undef, 'FE 스크럼 - 4', '[일본 출장] 김지해, 장세영'],
        [undef, '팀 스터디 - B', 'FE 스크럼 - 1'],
        [undef, 'FE 스크럼 - 5', 'FE 스크럼 - 2'],
        [undef, '주간보고 작성', '팀 스터디 - A'],
        [undef, undef, 'FE 스크럼 - 3'],
        [undef, undef, '[코드리뷰] 콤보차트 리펙토링'],
        [undef, undef, '캘린더이야기']
      ];

      const expectedTop = [
        [1, 2, 3, 4],
        [undef, 2, 3],
        [undef, 4, 4],
        [undef, 2, 5],
        [undef, 4, 6],
        [undef, undef, 4],
        [undef, undef, 5],
        [undef, undef, 5]
      ];

      actual = findByDateRange(dataStore, { start, end });

      expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
      expect(actual[0]).toEqualMatricesTop(expectedTop);
    });
  });
});
