import { addEvent, createEventCollection } from '@src/controller/base';
import { findByDateRange } from '@src/controller/month';
import { CalendarData, EventModelData } from '@src/model';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import array from '@src/util/array';

describe('Base.Month', () => {
  // eslint-disable-next-line no-undefined
  const undef = undefined;
  let calendarData: CalendarData;
  let mockData: EventModelData[];
  let eventList: EventModel[];
  let actual;

  beforeEach(() => {
    calendarData = {
      calendars: [],
      events: createEventCollection(),
      idsOfDay: {},
    };

    mockData = [
      {
        title: '[김동우] 휴가',
        isAllDay: true,
        start: '2015-11-15T00:00:00',
        end: '2015-11-21T23:59:59',
      },
      {
        title: '김태용[일본출장]',
        isAllDay: true,
        start: '2015-11-16T00:00:00',
        end: '2015-11-18T23:59:59',
      },
      {
        title: '[류진경] 오전반차',
        isAllDay: true,
        start: '2015-11-16T00:00:00',
        end: '2015-11-16T23:59:59',
      },
      {
        title: '[일본 출장] 김지해, 장세영',
        isAllDay: true,
        start: '2015-11-17T00:00:00',
        end: '2015-11-20T23:59:59',
      },
      {
        title: 'FE 스크럼 - 1',
        isAllDay: false,
        start: '2015-11-16T09:40:00',
        end: '2015-11-16T10:00:00',
      },
      {
        title: '[김성호] 연차',
        isAllDay: true,
        start: '2015-11-17T00:00:00',
        end: '2015-11-17T23:59:59',
      },
      {
        title: 'FE 스크럼 - 2',
        isAllDay: false,
        start: '2015-11-17T09:40:00',
        end: '2015-11-17T10:00:00',
      },
      {
        title: '팀 스터디 - A',
        isAllDay: false,
        start: '2015-11-17T12:30:00',
        end: '2015-11-17T13:00:00',
      },
      {
        title: 'FE 스크럼 - 3',
        isAllDay: false,
        start: '2015-11-18T09:40:00',
        end: '2015-11-18T10:00:00',
      },
      {
        title: '[코드리뷰] 콤보차트 리펙토링',
        isAllDay: false,
        start: '2015-11-18T10:00:00',
        end: '2015-11-18T11:00:00',
      },
      {
        title: 'FE 스크럼 - 4',
        isAllDay: false,
        start: '2015-11-19T09:40:00',
        end: '2015-11-19T10:00:00',
      },
      {
        title: '팀 스터디 - B',
        isAllDay: false,
        start: '2015-11-19T12:00:00',
        end: '2015-11-19T13:00:00',
      },
      {
        title: '캘린더이야기',
        isAllDay: false,
        start: '2015-11-19T12:30:00',
        end: '2015-11-19T13:00:00',
      },
      {
        title: 'FE 스크럼 - 5',
        isAllDay: false,
        start: '2015-11-20T09:40:00',
        end: '2015-11-20T10:00:00',
      },
      {
        title: '주간보고 작성',
        isAllDay: false,
        start: '2015-11-20T14:00:00',
        end: '2015-11-20T15:00:00',
      },
    ];
    // mock schedule list
    eventList = mockData.map((data) => EventModel.create(data)).sort(array.compare.event.asc);
  });

  describe('findByDateRange()', () => {
    beforeEach(() => {
      // add schedule instance to controller
      eventList.forEach((event) => {
        addEvent(calendarData, event);
      });
    });

    it('get events in month', () => {
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
        [undef, undef, '캘린더이야기'],
      ];

      const expectedTop = [
        [1, 2, 3, 4],
        [undef, 4, 3],
        [undef, 5, 4],
        [undef, 4, 5],
        [undef, 5, 6],
        [undef, undef, 4],
        [undef, undef, 5],
        [undef, undef, 6],
      ];

      actual = findByDateRange(calendarData, { start, end, andFilters: [], alldayFirstMode: true });

      expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
      expect(actual[0]).toEqualMatricesTop(expectedTop);
    });
  });

  describe('findByDateRange() by stacking time and all-day event', () => {
    beforeEach(() => {
      // add schedule instance to controller
      eventList.forEach((event) => {
        addEvent(calendarData, event);
      });
    });

    it('get events in month for all-day event', () => {
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
        [undef, undef, '캘린더이야기'],
      ];

      const expectedTop = [
        [1, 2, 3, 4],
        [undef, 2, 3],
        [undef, 4, 4],
        [undef, 2, 5],
        [undef, 4, 6],
        [undef, undef, 4],
        [undef, undef, 5],
        [undef, undef, 5],
      ];

      actual = findByDateRange(calendarData, { start, end });

      expect(actual[0]).toEqualMatricesTitle(expectedMatrix);
      expect(actual[0]).toEqualMatricesTop(expectedTop);
    });
  });
});
