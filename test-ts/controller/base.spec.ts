import ModelController, { getContainDatesInSchedule } from '@src/controller/base';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { ScheduleData } from '@src/model';
import { stamp } from '@src/util';
import forEach from 'tui-code-snippet/collection/forEach';
import Collection from '@src/util/collection';

describe('controller/base', function() {
  let ctrl: ModelController;
  let set: ScheduleData[];

  beforeEach(function() {
    ctrl = new ModelController();
    set = fixture.load('schedule_set_string.json');
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('getContainDatesInSchedule()', function() {
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

      expect(getContainDatesInSchedule(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
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

      expect(getContainDatesInSchedule(schedule.getStarts(), schedule.getEnds())).toEqual(expected);
    });
  });

  describe('createSchedule()', function() {
    it('return itself for chaining pattern.', function() {
      const schedule = Schedule.create(set[0]);

      expect(schedule.equals(ctrl.createSchedule(set[0]))).toBe(true);
    });

    it('create schedule instance by raw schedule data.', function() {
      const id = stamp(ctrl.createSchedule(set[0]));
      const id2 = stamp(ctrl.createSchedule(set[1]));
      const id3 = stamp(ctrl.createSchedule(set[3]));

      expect(ctrl.schedules.length).toBe(3);
      expect(ctrl.idsOfDay).toEqual({
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

      set.forEach(data => {
        const item = ctrl.createSchedule(data);
        scheduleList.push(item);
        idList.push(stamp(item));
      });

      // Add returned viewmodel matcher.
      jasmine.addMatchers({
        toEqualViewModel(matchersUtil) {
          return {
            compare(
              actual: Record<string, Schedule[]>,
              expected: Record<string, Schedule[]>
            ): jasmine.CustomMatcherResult {
              const result: jasmine.CustomMatcherResult = {
                pass: false
              };
              let isEqual = true;

              forEach(expected, function(_compareTo: any, ymd: string) {
                const models: Schedule[] = actual[ymd];

                if (!models) {
                  isEqual = false;

                  return false;
                }

                const titleList = models.map((item: Schedule) => {
                  return item.title;
                });

                isEqual = matchersUtil.equals(titleList.sort(), expected[ymd].sort());

                return isEqual;
              });

              result.pass = isEqual;

              return result;
            }
          };
        }
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
      const expected = {
        '20150430': [],
        '20150501': ['hunting'],
        '20150502': ['hunting', 'A']
      };

      const start = new TZDate('2015/04/30');
      const end = new TZDate('2015/05/02');

      const result = ctrl.findByDateRange(start, end);

      expect(result).toEqualViewModel(expected);
    });

    it('return viewmodels in dates properly.', function() {
      const expected = {
        '20150502': ['hunting', 'A'],
        '20150503': ['A', 'meeting', 'physical training']
      };

      const start = new TZDate('2015/05/02');
      const end = new TZDate('2015/05/03');

      const result = ctrl.findByDateRange(start, end);

      expect(result).toEqualViewModel(expected);
    });
  });

  describe('updateSchedule()', function() {
    let id: number;
    let model: Schedule;

    it('update owned schedule and date matrix.', function() {
      model = ctrl.createSchedule({
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00'
      });
      id = stamp(model);

      ctrl.updateSchedule(model.id, model.calendarId, {
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/02',
        end: '2015/05/02'
      });

      const schedule = ctrl.schedules.single();

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

      expect(ctrl.idsOfDay).toEqual({
        '20150501': [],
        '20150502': [id]
      });
    });
  });

  describe('deleteSchedule()', function() {
    let schedule: Schedule;

    beforeEach(function() {
      schedule = ctrl.createSchedule({
        title: 'Go to work',
        isAllDay: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00'
      });
    });

    it('delete an schedule by model.', function() {
      expect(ctrl.deleteSchedule(schedule)).toEqual(schedule);
      expect(ctrl.schedules.length).toBe(0);
      expect(ctrl.idsOfDay).toEqual({
        '20150501': []
      });
    });
  });

  describe('splitScheduleByDateRange()', function() {
    let schedules: Schedule[];
    let collection: Collection<Schedule>;

    beforeEach(function() {
      collection = new Collection(item => {
        return String(stamp(item));
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
        ctrl.schedules.add(schedule);
        ctrl._addToMatrix(schedule);
      });
    });

    it('split schedule by ymd.', function() {
      const result = ctrl.splitScheduleByDateRange(
        new TZDate('2015-05-01T00:00:00+09:00'),
        new TZDate('2015-05-03T23:59:59+09:00'),
        collection
      );

      const getter = (item: Schedule) => String(stamp(item));
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
