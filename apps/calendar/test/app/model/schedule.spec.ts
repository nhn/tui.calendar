import { advanceTo } from 'jest-date-mock';

import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';

describe('model/schedule basic', () => {
  let schedule: Schedule;

  beforeEach(() => {
    schedule = new Schedule();
  });

  it('creation', () => {
    expect(schedule.isAllDay).toBe(false);
  });

  describe('init()', () => {
    beforeEach(() => {
      advanceTo(new Date('2015/05/01 00:00:00').getTime());
    });

    it('initialize schedule with supplied options.', () => {
      const expected = {
        id: '123',
        title: 'Go home',
        isAllDay: false,
        start: new TZDate('2015-05-01T00:00:00'),
        end: new TZDate('2015-05-02T00:00:00'),
        color: '#000',
        bgColor: '#a1b56c',
      };

      schedule.init({
        id: '123',
        title: 'Go home',
        isAllDay: false,
        start: '2015-05-01T00:00:00',
        end: '2015-05-02T00:00:00',
      });

      expect(schedule).toEqual(expect.objectContaining(expected));
    });
  });

  describe('equals()', () => {
    let schedule2: Schedule;

    beforeEach(() => {
      schedule = new Schedule();
      schedule2 = new Schedule();
    });

    it("return true when schedule's property are same", () => {
      schedule.title = 'dance';
      schedule2.title = 'dance';
      schedule.isAllDay = true;
      schedule2.isAllDay = true;
      schedule.start = new TZDate('2015/05/01');
      schedule2.start = new TZDate('2015/05/01');
      schedule.end = new TZDate('2015/05/02');
      schedule2.end = new TZDate('2015/05/02');

      expect(schedule.equals(schedule2)).toBe(true);
    });

    it('return false when title is not equals.', () => {
      schedule.title = 'meeting';
      schedule2.title = 'working';

      expect(schedule.equals(schedule2)).toBe(false);
    });

    it('return false when two schedule has different all day flags.', () => {
      schedule.title = 'dance';
      schedule2.title = 'dance';
      schedule.isAllDay = true;
      schedule2.isAllDay = false;

      expect(schedule.equals(schedule2)).toBe(false);
    });

    it('return false when two schedule has different start or end.', () => {
      schedule.title = 'dance';
      schedule2.title = 'dance';
      schedule.isAllDay = true;
      schedule2.isAllDay = true;
      schedule.start = new TZDate('2015/05/01');
      schedule2.start = new TZDate('2015/04/01');

      expect(schedule.equals(schedule2)).toBe(false);

      schedule2.start = new TZDate('2015/05/01');

      schedule.end = new TZDate('2015/06/01');
      schedule2.end = new TZDate('2015/07/01');

      expect(schedule.equals(schedule2)).toBe(false);
    });
  });

  describe('duration()', () => {
    beforeEach(() => {
      schedule.start = new TZDate('2015-09-25T05:00:00');
      schedule.end = new TZDate('2015-09-26T05:00:00');
    });

    it('can calculate duration between start and end.', () => {
      expect(+Number(schedule.duration())).toBe(+Number(new TZDate('1970-01-02T00:00:00Z')));
    });

    it('return 24 hours when schedule is all day schedule.', () => {
      schedule.isAllDay = true;

      expect(+Number(schedule.duration())).toBe(+Number(new TZDate('1970-01-02T23:59:59.999Z')));
    });
  });

  describe('Schedule.create()', () => {
    it('create schedule model instance from data object.', () => {
      const mock = {
        title: 'hunting',
        isAllDay: true,
        start: '2015/05/02',
        end: '2015/05/02',
      };

      const compare = new Schedule();
      compare.title = 'hunting';
      compare.isAllDay = true;
      compare.start = new TZDate('2015/05/02');
      compare.start.setHours(0, 0, 0);
      compare.end = new TZDate('2015/05/02');
      compare.end.setHours(23, 59, 59);

      expect(Schedule.create(mock).equals(compare)).toBe(true);
    });
  });

  describe('collidesWith()', () => {
    /**
     * type - A
     * |---|
     * | A |---|
     * |---| B |
     *     |---|
     *
     * type - B
     *     |---|
     * |---| B |
     * | A |---|
     * |---|
     */
    it('Check type A, B', () => {
      const a = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = Schedule.create({
        title: 'B',
        isAllDay: false,
        start: '2015-05-01T09:40:00',
        end: '2015-05-01T10:10:00',
      });

      expect(a.collidesWith(b)).toBe(true);
      expect(b.collidesWith(a)).toBe(true);
    });

    /**
     * type - C
     *
     * |---|
     * |   |---|
     * | A | B |
     * |   |---|
     * |---|
     *
     * type - D
     *     |---|
     * |---|   |
     * | A | B |
     * |---|   |
     *     |---|
     */
    it('check type C, D', () => {
      const a = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = Schedule.create({
        title: 'B',
        isAllDay: false,
        start: '2015-05-01T09:00:00',
        end: '2015-05-01T10:30:00',
      });

      expect(a.collidesWith(b)).toBe(true);
      expect(b.collidesWith(a)).toBe(true);
    });

    /**
     * type - E
     * |---|
     * | A |
     * |---|
     *     |---|
     *     | B |
     *     |---|
     *
     * type - F
     *     |---|
     *     | B |
     *     |---|
     * |---|
     * | A |
     * |---|
     */
    it('check type E, F', () => {
      const a = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = Schedule.create({
        title: 'B',
        isAllDay: false,
        start: '2015-05-01T10:00:00',
        end: '2015-05-01T10:30:00',
      });

      expect(a.collidesWith(b)).toBe(false);
      expect(b.collidesWith(a)).toBe(false);
    });

    /**
     * type - G
     * |---|
     * | A |
     * |---|
     *
     *     |---|
     *     | B |
     *     |---|
     *
     * type - H
     *     |---|
     *     | B |
     *     |---|
     *
     * |---|
     * | A |
     * |---|
     */
    it('check type G, H', () => {
      const a = Schedule.create({
        title: 'A',
        isAllDay: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T09:50:00',
      });
      const b = Schedule.create({
        title: 'B',
        isAllDay: false,
        start: '2015-05-01T10:10:00',
        end: '2015-05-01T10:30:00',
      });

      expect(a.collidesWith(b)).toBe(false);
      expect(b.collidesWith(a)).toBe(false);
    });
  });
});

describe('model/Schedule advanced', () => {
  let scheduleData: ScheduleData[];

  beforeEach(() => {
    scheduleData = [
      {
        title: '스크럼',
        category: 'time',
        dueDateClass: '',
        start: '2015-10-26T09:40:00',
        end: '2015-10-26T10:00:00',
      },
      {
        title: '[홍길동]연차',
        category: 'allday',
        dueDateClass: '',
        start: '2015-10-26T00:00:00',
        end: '2015-10-26T23:59:59',
      },
      {
        title: '테스트 마일스톤1',
        category: 'milestone',
        dueDateClass: '',
        start: '',
        end: '2015-10-26T23:59:59',
      },
      {
        title: '테스트 업무',
        category: 'task',
        dueDateClass: 'morning',
        start: '',
        end: '2015-10-26T23:59:59',
      },
    ];
  });

  it('factory function (create())', () => {
    type CompatableSchedule = Record<string, any>;

    let e = Schedule.create(scheduleData[0]);

    let expected: ScheduleData = {
      title: '스크럼',
      category: 'time',
      dueDateClass: '',
      isAllDay: false,
      start: new TZDate('2015-10-26T09:40:00'),
      end: new TZDate('2015-10-26T10:00:00'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableSchedule>(expected));

    e = Schedule.create(scheduleData[1]);
    expected = {
      title: '[홍길동]연차',
      category: 'allday',
      dueDateClass: '',
      isAllDay: true,
      start: new TZDate(2015, 9, 26),
      end: new TZDate(2015, 9, 26, 23, 59, 59),
    };

    expect(e).toEqual(expect.objectContaining<CompatableSchedule>(expected));

    e = Schedule.create(scheduleData[2]);
    expected = {
      title: '테스트 마일스톤1',
      category: 'milestone',
      dueDateClass: '',
      isAllDay: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableSchedule>(expected));

    e = Schedule.create(scheduleData[3]);
    expected = {
      title: '테스트 업무',
      category: 'task',
      dueDateClass: 'morning',
      isAllDay: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableSchedule>(expected));
  });

  it('raw data', () => {
    const raw: {
      hello: string;
      hello2?: string;
    } = {
      hello: 'world',
    };
    const e = Schedule.create({
      title: '굿',
      category: 'task',
      dueDateClass: 'morning',
      isAllDay: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
      raw,
    });

    expect(e.raw).toEqual({ hello: 'world' });

    raw.hello2 = 'good';

    expect(e.raw).toEqual({ hello: 'world', hello2: 'good' });
  });
});
