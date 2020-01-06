import { createScheduleCollection, createSchedule, addToMatrix } from '@src/controller/base';
import { ScheduleData, DataStore } from '@src/model';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { MILLISECONDS_SCHEDULE_MIN_DURATION } from '@src/time/datetime';
import {
  hasCollision,
  generateTimeArrayInRow,
  Panel,
  findByDateRange,
  _makeHourRangeFilter,
  PANEL_NAME,
  splitScheduleByDateRange
} from '@src/controller/week';
import { ScheduleMatrix } from '@src/controller/core';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import Collection from '@src/util/collection';

const SCHEDULE_MIN_DURATION = MILLISECONDS_SCHEDULE_MIN_DURATION;

describe('Base.Week', function() {
  let dataStore: DataStore;
  let mockData: ScheduleData[];

  beforeEach(function() {
    dataStore = {
      calendars: [],
      schedules: createScheduleCollection(),
      idsOfDay: {}
    };
    mockData = fixture.load('schedule_set_string3.json');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('hasCollision()', function() {
    let supplied: Array<number[]>;

    beforeEach(function() {
      supplied = [
        [2, 5],
        [8, 11],
        [14, 17]
      ];
    });

    it('return false when supplied empty array', function() {
      expect(hasCollision([], 3, 4)).toBe(false);
    });

    it('calculate collision information properly.', function() {
      expect(hasCollision(supplied, 6, 7)).toBe(false);
    });
  });

  describe('generateTimeArrayInRow()', function() {
    /**
     * |---|---|
     * | 1 | 2 |
     * |---|---|
     * | 3 | 5 |
     * |---|---|
     * | 4 |   |
     * |---|---|
     *
     * to
     *
     * [
     *     [[2.start, 2.end], [5.start, 5.end]]
     * ]
     */

    let supplied: Array<Schedule[]>;
    let expected: Array<Array<number[]>>;

    function getTime(start: number, end: number) {
      return new Schedule().init({ start, end });
    }

    beforeEach(function() {
      supplied = [[getTime(1, 2), getTime(1, 2)], [getTime(4, 5), getTime(5, 6)], [getTime(7, 8)]];

      expected = [
        [
          [1, 2 + SCHEDULE_MIN_DURATION],
          [5, 6 + SCHEDULE_MIN_DURATION]
        ]
      ];
    });

    it('get rowmap properly.', function() {
      expect(generateTimeArrayInRow(supplied)).toEqual(expected);
    });
  });

  describe('findByDateRange', function() {
    let panels: Panel[];

    beforeEach(function() {
      panels = [
        {
          name: 'time',
          type: 'timegrid',
          handlers: ['click', 'creation', 'move', 'resize'],
          show: true
        }
      ];

      mockData.forEach(data => {
        createSchedule(dataStore, data);
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

    it('by YMD', function() {
      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      const result = findByDateRange(dataStore, {
        start,
        end,
        panels,
        andFilters: [],
        options: {
          hourStart: 0,
          hourEnd: 24
        }
      }) as Record<PANEL_NAME, Record<string, ScheduleMatrix<ScheduleViewModel>>>;

      // There are 5 collision blocks on 5/1.
      expect(result.time['20150501'].length).toBe(5);
    });

    it('Can add more AND clause filter function by third parameter', function() {
      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      // Since there is only one event with title J
      const result = findByDateRange(dataStore, {
        start,
        end,
        panels,
        andFilters: [(model: Schedule | ScheduleViewModel) => (model as Schedule).title === 'J'],
        options: { hourStart: 0, hourEnd: 24 }
      }) as Record<PANEL_NAME, Record<string, ScheduleMatrix<ScheduleViewModel>>>;

      // One collision block in the timeline group
      expect(result.time['20150501'].length).toBe(1);
    });
  });

  describe('_getHourRangeFilter()', function() {
    let hourRangeFilter: (schedule: Schedule) => boolean;
    let schedule: Schedule;

    beforeEach(function() {
      // 8:00 ~ 20:00
      hourRangeFilter = _makeHourRangeFilter(10, 12);
      schedule = new Schedule();
    });

    it('filter schedule by start, end date visible', function() {
      schedule.start = new TZDate('2018-05-02T09:30:00+09:00');
      schedule.end = new TZDate('2018-05-02T13:30:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T00:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T10:30:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T10:30:00+09:00');
      schedule.end = new TZDate('2018-05-02T11:30:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T11:30:00+09:00');
      schedule.end = new TZDate('2018-05-02T15:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T00:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T10:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(false);

      schedule.start = new TZDate('2018-05-02T10:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T12:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T12:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T15:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(false);

      schedule.start = new TZDate('2018-05-02T09:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T15:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T09:00:00+09:00');
      schedule.end = new TZDate('2018-05-02T15:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);

      schedule.start = new TZDate('2018-05-02T09:00:00+09:00');
      schedule.end = new TZDate('2018-05-03T09:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true); // true, false??

      schedule.start = new TZDate('2018-05-02T11:00:00+09:00');
      schedule.end = new TZDate('2018-05-03T09:00:00+09:00');

      expect(hourRangeFilter(schedule)).toBe(true);
    });
  });

  describe('splitScheduleByDateRange()', function() {
    let schedules: Schedule[];
    let collection: Collection<Schedule>;

    beforeEach(function() {
      collection = new Collection(item => {
        return item.cid();
      });

      schedules = [
        {
          title: 'A',
          isAllDay: false,
          start: '2015/05/01 09:30:00',
          end: '2015/05/01 18:30:00'
        },
        {
          title: 'B',
          isAllDay: false,
          start: '2015/05/02 09:30:00',
          end: '2015/05/02 18:30:00'
        },
        {
          title: 'C',
          isAllDay: true,
          start: '2015/05/01 09:00:00',
          end: '2015/05/02 09:00:00'
        }
      ].map(scheduleData => Schedule.create(scheduleData));

      collection.add(...schedules);

      schedules.forEach(schedule => {
        dataStore.schedules.add(schedule);
        addToMatrix(dataStore.idsOfDay, schedule);
      });
    });

    it('split schedule by ymd.', function() {
      const result = splitScheduleByDateRange(
        dataStore.idsOfDay,
        new TZDate('2015-05-01T00:00:00+09:00'),
        new TZDate('2015-05-03T23:59:59+09:00'),
        collection
      );

      const getter = (item: Schedule) => item.cid();
      const expected = {
        '20150501': new Collection(getter),
        '20150502': new Collection(getter),
        '20150503': new Collection(getter)
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
