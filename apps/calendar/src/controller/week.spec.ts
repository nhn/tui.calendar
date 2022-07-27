import { addToMatrix, createEvent, createEventCollection } from '@src/controller/base';
import { _makeHourRangeFilter, findByDateRange, splitEventByDateRange } from '@src/controller/week';
import EventModel from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import Collection from '@src/utils/collection';

import type { CalendarData, EventObject, Matrix3d, TimeGridEventMatrix } from '@t/events';
import type { Panel } from '@t/panel';

describe('Base.Week', () => {
  let calendarData: CalendarData;
  let mockData: EventObject[];

  beforeEach(() => {
    calendarData = {
      calendars: [],
      events: createEventCollection(),
      idsOfDay: {},
    };
    mockData = [
      {
        title: 'A',
        isAllday: false,
        start: '2015-05-01T10:20:00',
        end: '2015-05-01T10:40:00',
        category: 'time',
      },
      {
        title: 'B',
        isAllday: false,
        start: '2015-05-01T10:30:00',
        end: '2015-05-01T11:30:00',
        category: 'time',
      },
      {
        title: 'C',
        isAllday: false,
        start: '2015-05-01T11:20:00',
        end: '2015-05-01T12:00:00',
        category: 'time',
      },
      {
        title: 'D',
        isAllday: false,
        start: '2015-05-01T10:50:00',
        end: '2015-05-01T11:10:00',
        category: 'time',
      },
      {
        title: 'E',
        isAllday: false,
        start: '2015-05-01T13:20:00',
        end: '2015-05-01T13:40:00',
        category: 'time',
      },
      {
        title: 'F',
        isAllday: false,
        start: '2015-05-01T14:00:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'G',
        isAllday: false,
        start: '2015-05-01T14:10:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'H',
        isAllday: false,
        start: '2015-05-01T16:00:00',
        end: '2015-05-01T18:00:00',
        category: 'time',
      },
      {
        title: 'I',
        isAllday: false,
        start: '2015-05-01T17:00:00',
        end: '2015-05-01T20:00:00',
        category: 'time',
      },
      {
        title: 'J',
        isAllday: false,
        start: '2015-05-01T19:00:00',
        end: '2015-05-01T21:00:00',
        category: 'time',
      },
      {
        title: '물고기 밥주기',
        isAllday: false,
        start: '2015-05-01T22:00:00',
        end: '2015-05-01T22:10:00',
        category: 'time',
      },
    ];
  });

  describe('findByDateRange', () => {
    let panels: Panel[];

    beforeEach(() => {
      panels = [
        {
          name: 'time',
          type: 'timegrid',
          handlers: ['click', 'creation', 'move', 'resize'],
          show: true,
        },
      ];

      mockData.forEach((data) => {
        createEvent(calendarData, data);
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

    it('by YMD', () => {
      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      const result = findByDateRange(calendarData, {
        start,
        end,
        panels,
        andFilters: [],
        options: {
          hourStart: 0,
          hourEnd: 24,
        },
      });

      // There are 5 collision blocks on 5/1.
      expect((result.time as TimeGridEventMatrix)['20150501'].length).toBe(5);
    });

    it('Can add more AND clause filter function by third parameter', () => {
      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      // Since there is only one event with title J
      const result = findByDateRange(calendarData, {
        start,
        end,
        panels,
        andFilters: [(model: EventModel | EventUIModel) => (model as EventModel).title === 'J'],
        options: { hourStart: 0, hourEnd: 24 },
      }) as Record<string, Record<string, Matrix3d<EventUIModel>>>;

      // One collision block in the timeline group
      expect(result.time['20150501'].length).toBe(1);
    });
  });

  describe('_getHourRangeFilter()', () => {
    let hourRangeFilter: (event: EventModel) => boolean;
    let event: EventModel;

    beforeEach(() => {
      // 8:00 ~ 20:00
      hourRangeFilter = _makeHourRangeFilter(10, 12);
      event = new EventModel();
    });

    it('filter event by start, end date visible', () => {
      event.start = new TZDate('2018-05-02T09:30:00');
      event.end = new TZDate('2018-05-02T13:30:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T00:00:00');
      event.end = new TZDate('2018-05-02T10:30:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T10:30:00');
      event.end = new TZDate('2018-05-02T11:30:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T11:30:00');
      event.end = new TZDate('2018-05-02T15:00:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T00:00:00');
      event.end = new TZDate('2018-05-02T10:00:00');

      expect(hourRangeFilter(event)).toBe(false);

      event.start = new TZDate('2018-05-02T10:00:00');
      event.end = new TZDate('2018-05-02T12:00:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T12:00:00');
      event.end = new TZDate('2018-05-02T15:00:00');

      expect(hourRangeFilter(event)).toBe(false);

      event.start = new TZDate('2018-05-02T09:00:00');
      event.end = new TZDate('2018-05-02T15:00:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T09:00:00');
      event.end = new TZDate('2018-05-02T15:00:00');

      expect(hourRangeFilter(event)).toBe(true);

      event.start = new TZDate('2018-05-02T09:00:00');
      event.end = new TZDate('2018-05-03T09:00:00');

      expect(hourRangeFilter(event)).toBe(true); // true, false??

      event.start = new TZDate('2018-05-02T11:00:00');
      event.end = new TZDate('2018-05-03T09:00:00');

      expect(hourRangeFilter(event)).toBe(true);
    });
  });

  describe('splitEventByDateRange()', () => {
    let events: EventModel[];
    let collection: Collection<EventModel>;

    beforeEach(() => {
      collection = new Collection((item) => {
        return item.cid();
      });

      events = [
        {
          title: 'A',
          isAllday: false,
          start: '2015/05/01 09:30:00',
          end: '2015/05/01 18:30:00',
        },
        {
          title: 'B',
          isAllday: false,
          start: '2015/05/02 09:30:00',
          end: '2015/05/02 18:30:00',
        },
        {
          title: 'C',
          isAllday: true,
          start: '2015/05/01 09:00:00',
          end: '2015/05/02 09:00:00',
        },
      ].map((eventData) => new EventModel(eventData));

      collection.add(...events);

      events.forEach((event) => {
        calendarData.events.add(event);
        addToMatrix(calendarData.idsOfDay, event);
      });
    });

    it('split event by ymd.', () => {
      const result = splitEventByDateRange(
        calendarData.idsOfDay,
        new TZDate('2015-05-01T00:00:00'),
        new TZDate('2015-05-03T23:59:59'),
        collection
      );

      const getter = (item: EventModel) => item.cid();
      const expected = {
        '20150501': new Collection(getter),
        '20150502': new Collection(getter),
        '20150503': new Collection(getter),
      };

      expected['20150501'].add(events[0]);
      expected['20150501'].add(events[2]);
      expected['20150502'].add(events[1]);
      expected['20150502'].add(events[2]);

      expect(result['20150501'].toArray()).toEqual(expected['20150501'].toArray());
      expect(result['20150502'].toArray()).toEqual(expected['20150502'].toArray());
      expect(result['20150503'].toArray()).toEqual(expected['20150503'].toArray());
    });
  });
});
