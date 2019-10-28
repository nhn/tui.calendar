import {
  getDateRange,
  createScheduleCollection,
  createSchedule,
  findByDateRange,
  updateSchedule,
  deleteSchedule
} from '@src/controller/base';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { ScheduleData, DataStore } from '@src/model';

import viewModelsMatcher from '../../matcher/viewModels';

describe('controller/base', function() {
  let dataStore: DataStore;
  let scheduleDataList: ScheduleData[];

  beforeEach(function() {
    dataStore = {
      calendars: [],
      schedules: createScheduleCollection(),
      idsOfDay: {}
    };
    scheduleDataList = fixture.load('schedule_set_string.json');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('getDateRange()', function() {
    let schedule: Schedule;

    it('calculate contain dates for specific schedules.', function() {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03')
      ];

      schedule = Schedule.create({
        title: 'A',
        isAllDay: true,
        start: '2015/05/01',
        end: '2015/05/03'
      });

      expect(getDateRange(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
    });

    it('can calculate non all day schedule.', function() {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03')
      ];

      schedule = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015/05/01 12:30:00',
        end: '2015/05/03 09:20:00'
      });

      expect(getDateRange(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
    });
  });

  describe('createSchedule()', function() {
    it('return itself for chaining pattern.', function() {
      const schedule = Schedule.create(scheduleDataList[0]);

      expect(schedule.equals(createSchedule(dataStore, scheduleDataList[0]))).toBe(true);
    });

    it('create schedule instance by raw schedule data.', function() {
      const id = createSchedule(dataStore, scheduleDataList[0]).cid();
      const id2 = createSchedule(dataStore, scheduleDataList[1]).cid();
      const id3 = createSchedule(dataStore, scheduleDataList[3]).cid();

      expect(dataStore.schedules.length).toBe(3);
      expect(dataStore.idsOfDay).toEqual({
        '20150501': [id],
        '20150502': [id, id3],
        '20150503': [id2, id3]
      });
    });
  });

  describe('findByDateRange()', function() {
    let scheduleList: Schedule[];
    let idList: number[];

    beforeEach(function() {
      scheduleList = [];
      idList = [];

      scheduleDataList.forEach(data => {
        const item = createSchedule(dataStore, data);
        scheduleList.push(item);
        idList.push(item.cid());
      });

      // Add returned viewmodel matcher.
      jasmine.addMatchers(viewModelsMatcher);

      /*
       * matrix: {
       * '20150501': [id1],
       * '20150502': [id1, id4],
       * '20150503': [id2, id3, id4]
       * }
       */
    });

    it('by YMD', function() {
      const expected = {
        '20150430': [],
        '20150501': ['hunting'],
        '20150502': ['hunting', 'A']
      };

      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      const result = findByDateRange(dataStore, start, end);

      expect(result).toEqualViewModel(expected);
    });

    it('return viewmodels in dates properly.', function() {
      const expected = {
        '20150502': ['hunting', 'A'],
        '20150503': ['A', 'meeting', 'physical training']
      };

      const start = new TZDate('2015/05/02');
      const end = new TZDate('2015/05/03');

      const result = findByDateRange(dataStore, start, end);

      expect(result).toEqualViewModel(expected);
    });
  });

  describe('updateSchedule()', function() {
    it('update owned schedule and date matrix.', function() {
      const model = createSchedule(dataStore, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00'
      });
      const id = model.cid();

      updateSchedule(dataStore, model.id, model.calendarId, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/02',
        end: '2015/05/02'
      });

      const schedule = dataStore.schedules.single();

      expect(schedule).not.toBeNull();
      if (schedule) {
        expect(schedule).toEqual(
          jasmine.objectContaining<Schedule>({
            title: 'Go to work',
            isAllDay: false,
            start: new TZDate('2015/05/02'),
            end: new TZDate('2015/05/02')
          })
        );
      }

      expect(dataStore.idsOfDay).toEqual({
        '20150501': [],
        '20150502': [id]
      });
    });
  });

  describe('deleteSchedule()', function() {
    let schedule: Schedule;

    beforeEach(function() {
      schedule = createSchedule(dataStore, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00'
      });
    });

    it('delete an schedule by model.', function() {
      expect(deleteSchedule(dataStore, schedule)).toEqual(schedule);
      expect(dataStore.schedules.length).toBe(0);
      expect(dataStore.idsOfDay).toEqual({
        '20150501': []
      });
    });
  });
});
