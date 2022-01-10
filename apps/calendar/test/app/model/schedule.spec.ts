import { advanceTo } from 'jest-date-mock';

import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { EventModelData } from '@t/events';

describe('model/event basic', () => {
  let event: EventModel;

  beforeEach(() => {
    event = new EventModel();
  });

  it('creation', () => {
    expect(event.isAllDay).toBe(false);
  });

  describe('init()', () => {
    beforeEach(() => {
      advanceTo(new Date('2015/05/01 00:00:00').getTime());
    });

    it('initialize event with supplied options.', () => {
      const expected = {
        id: '123',
        title: 'Go home',
        isAllDay: false,
        start: new TZDate('2015-05-01T00:00:00'),
        end: new TZDate('2015-05-02T00:00:00'),
        color: '#000',
        bgColor: '#a1b56c',
      };

      event.init({
        id: '123',
        title: 'Go home',
        isAllday: false,
        start: '2015-05-01T00:00:00',
        end: '2015-05-02T00:00:00',
      });

      expect(event).toEqual(expect.objectContaining(expected));
    });
  });

  describe('equals()', () => {
    let event2: EventModel;

    beforeEach(() => {
      event = new EventModel();
      event2 = new EventModel();
    });

    it("return true when event's property are same", () => {
      event.title = 'dance';
      event2.title = 'dance';
      event.isAllDay = true;
      event2.isAllDay = true;
      event.start = new TZDate('2015/05/01');
      event2.start = new TZDate('2015/05/01');
      event.end = new TZDate('2015/05/02');
      event2.end = new TZDate('2015/05/02');

      expect(event.equals(event2)).toBe(true);
    });

    it('return false when title is not equals.', () => {
      event.title = 'meeting';
      event2.title = 'working';

      expect(event.equals(event2)).toBe(false);
    });

    it('return false when two event has different all day flags.', () => {
      event.title = 'dance';
      event2.title = 'dance';
      event.isAllDay = true;
      event2.isAllDay = false;

      expect(event.equals(event2)).toBe(false);
    });

    it('return false when two event has different start or end.', () => {
      event.title = 'dance';
      event2.title = 'dance';
      event.isAllDay = true;
      event2.isAllDay = true;
      event.start = new TZDate('2015/05/01');
      event2.start = new TZDate('2015/04/01');

      expect(event.equals(event2)).toBe(false);

      event2.start = new TZDate('2015/05/01');

      event.end = new TZDate('2015/06/01');
      event2.end = new TZDate('2015/07/01');

      expect(event.equals(event2)).toBe(false);
    });
  });

  describe('duration()', () => {
    beforeEach(() => {
      event.start = new TZDate('2015-09-25T05:00:00');
      event.end = new TZDate('2015-09-26T05:00:00');
    });

    it('can calculate duration between start and end.', () => {
      expect(+Number(event.duration())).toBe(+Number(new TZDate('1970-01-02T00:00:00Z')));
    });

    it('return 24 hours when event is all day event.', () => {
      event.isAllDay = true;

      expect(+Number(event.duration())).toBe(+Number(new TZDate('1970-01-02T23:59:59.999Z')));
    });
  });

  describe('EventModel.create()', () => {
    it('create event model instance from data object.', () => {
      const mock = {
        title: 'hunting',
        isAllDay: true,
        start: '2015/05/02',
        end: '2015/05/02',
      };

      const compare = new EventModel();
      compare.title = 'hunting';
      compare.isAllDay = true;
      compare.start = new TZDate('2015/05/02');
      compare.start.setHours(0, 0, 0);
      compare.end = new TZDate('2015/05/02');
      compare.end.setHours(23, 59, 59);

      expect(EventModel.create(mock).equals(compare)).toBe(true);
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
      const a = EventModel.create({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = EventModel.create({
        title: 'B',
        isAllday: false,
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
      const a = EventModel.create({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = EventModel.create({
        title: 'B',
        isAllday: false,
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
      const a = EventModel.create({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = EventModel.create({
        title: 'B',
        isAllday: false,
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
      const a = EventModel.create({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T09:50:00',
      });
      const b = EventModel.create({
        title: 'B',
        isAllday: false,
        start: '2015-05-01T10:10:00',
        end: '2015-05-01T10:30:00',
      });

      expect(a.collidesWith(b)).toBe(false);
      expect(b.collidesWith(a)).toBe(false);
    });
  });
});

describe('model/EventModel advanced', () => {
  let eventData: EventModelData[];

  beforeEach(() => {
    eventData = [
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
    type CompatableEvent = Record<string, any>;

    let e = EventModel.create(eventData[0]);

    let expected: EventModelData = {
      title: '스크럼',
      category: 'time',
      dueDateClass: '',
      isAllday: false,
      start: new TZDate('2015-10-26T09:40:00'),
      end: new TZDate('2015-10-26T10:00:00'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableEvent>(expected));

    e = EventModel.create(eventData[1]);
    expected = {
      title: '[홍길동]연차',
      category: 'allday',
      dueDateClass: '',
      isAllday: true,
      start: new TZDate(2015, 9, 26),
      end: new TZDate(2015, 9, 26, 23, 59, 59),
    };

    expect(e).toEqual(expect.objectContaining<CompatableEvent>(expected));

    e = EventModel.create(eventData[2]);
    expected = {
      title: '테스트 마일스톤1',
      category: 'milestone',
      dueDateClass: '',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableEvent>(expected));

    e = EventModel.create(eventData[3]);
    expected = {
      title: '테스트 업무',
      category: 'task',
      dueDateClass: 'morning',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toEqual(expect.objectContaining<CompatableEvent>(expected));
  });

  it('raw data', () => {
    const raw: {
      hello: string;
      hello2?: string;
    } = {
      hello: 'world',
    };
    const e = EventModel.create({
      title: '굿',
      category: 'task',
      dueDateClass: 'morning',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
      raw,
    });

    expect(e.raw).toEqual({ hello: 'world' });

    raw.hello2 = 'good';

    expect(e.raw).toEqual({ hello: 'world', hello2: 'good' });
  });
});
