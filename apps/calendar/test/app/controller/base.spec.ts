import {
  getDateRange,
  createScheduleCollection,
  createSchedule,
  findByDateRange,
  updateSchedule,
  deleteSchedule,
} from '@src/controller/base';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { ScheduleData, DataStore } from '@src/model';

describe('controller/base', () => {
  let dataStore: DataStore;
  let scheduleDataList: ScheduleData[];

  beforeEach(() => {
    dataStore = {
      calendars: [],
      schedules: createScheduleCollection(),
      idsOfDay: {},
    };
    scheduleDataList = [
      {
        title: 'hunting',
        isAllDay: true,
        start: '2015/05/01',
        end: '2015/05/02',
      },
      {
        title: 'meeting',
        isAllDay: false,
        start: '2015/05/03 12:30:00',
        end: '2015/05/03 16:00:00',
      },
      {
        title: 'physical training',
        isAllDay: false,
        start: '2015/05/03 18:30:00',
        end: '2015/05/03 19:30:00',
      },
      {
        title: 'A',
        isAllDay: false,
        start: '2015/05/02 12:30:00',
        end: '2015/05/03 09:20:00',
      },
    ];
  });

  describe('getDateRange()', () => {
    let schedule: Schedule;

    it('calculate contain dates for specific schedules.', () => {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03'),
      ];

      schedule = Schedule.create({
        title: 'A',
        isAllDay: true,
        start: '2015/05/01',
        end: '2015/05/03',
      });

      expect(getDateRange(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
    });

    it('can calculate non all day schedule.', () => {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03'),
      ];

      schedule = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015/05/01 12:30:00',
        end: '2015/05/03 09:20:00',
      });

      expect(getDateRange(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
    });
  });

  describe('createSchedule()', () => {
    it('return itself for chaining pattern.', () => {
      const schedule = Schedule.create(scheduleDataList[0]);

      expect(schedule.equals(createSchedule(dataStore, scheduleDataList[0]))).toBe(true);
    });

    it('create schedule instance by raw schedule data.', () => {
      const id = createSchedule(dataStore, scheduleDataList[0]).cid();
      const id2 = createSchedule(dataStore, scheduleDataList[1]).cid();
      const id3 = createSchedule(dataStore, scheduleDataList[3]).cid();

      expect(dataStore.schedules.length).toBe(3);
      expect(dataStore.idsOfDay).toEqual({
        '20150501': [id],
        '20150502': [id, id3],
        '20150503': [id2, id3],
      });
    });
  });

  describe('findByDateRange()', () => {
    let scheduleList: Schedule[];
    let idList: number[];

    beforeEach(() => {
      scheduleList = [];
      idList = [];

      scheduleDataList.forEach((data) => {
        const item = createSchedule(dataStore, data);
        scheduleList.push(item);
        idList.push(item.cid());
      });

      /*
       * matrix: {
       * '20150501': [id1],
       * '20150502': [id1, id4],
       * '20150503': [id2, id3, id4]
       * }
       */
    });

    it('by YMD', () => {
      const expected = {
        '20150430': [],
        '20150501': ['hunting'],
        '20150502': ['hunting', 'A'],
      };

      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');
      const result = findByDateRange(dataStore, { start, end });

      expect(result).toEqualViewModelByTitle(expected);
    });

    it('return viewmodels in dates properly.', () => {
      const expected = {
        '20150502': ['hunting', 'A'],
        '20150503': ['A', 'meeting', 'physical training'],
      };

      const start = new TZDate('2015/05/02');
      const end = new TZDate('2015/05/03');

      const result = findByDateRange(dataStore, { start, end });

      expect(result).toEqualViewModelByTitle(expected);
    });
  });

  describe('updateSchedule()', () => {
    it('update owned schedule and date matrix.', () => {
      const model = createSchedule(dataStore, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00',
      });
      const id = model.cid();

      updateSchedule(dataStore, model.id, model.calendarId, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/02',
        end: '2015/05/02',
      });

      const schedule = dataStore.schedules.single();

      expect(schedule).not.toBeNull();

      type CompatableSchedule = Record<string, any>;

      expect(schedule).toEqual(
        expect.objectContaining<CompatableSchedule>({
          title: 'Go to work',
          isAllDay: false,
          start: new TZDate('2015/05/02'),
          end: new TZDate('2015/05/02'),
        })
      );

      expect(dataStore.idsOfDay).toEqual({
        '20150501': [],
        '20150502': [id],
      });
    });
  });

  describe('deleteSchedule()', () => {
    let schedule: Schedule;

    beforeEach(() => {
      schedule = createSchedule(dataStore, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00',
      });
    });

    it('delete an schedule by model.', () => {
      expect(deleteSchedule(dataStore, schedule)).toEqual(schedule);
      expect(dataStore.schedules.length).toBe(0);
      expect(dataStore.idsOfDay).toEqual({
        '20150501': [],
      });
    });
  });
});
