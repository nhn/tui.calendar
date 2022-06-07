import { advanceTo } from 'jest-date-mock';

import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import type { EventObject } from '@t/events';

describe('model/event basic', () => {
  let event: EventModel;

  beforeEach(() => {
    event = new EventModel();
  });

  it('creation', () => {
    expect(event.isAllday).toBe(false);
  });

  describe('init()', () => {
    beforeEach(() => {
      advanceTo(new Date('2015/05/01 00:00:00').getTime());
    });

    it('initialize event with supplied options.', () => {
      const expected = {
        id: '123',
        title: 'Go home',
        isAllday: false,
        start: new TZDate('2015-05-01T00:00:00'),
        end: new TZDate('2015-05-02T00:00:00'),
      };

      event.init({
        id: '123',
        title: 'Go home',
        isAllday: false,
        start: '2015-05-01T00:00:00',
        end: '2015-05-02T00:00:00',
      });

      expect(event).toMatchObject(expected);
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
      event.isAllday = true;
      event2.isAllday = true;
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
      event.isAllday = true;
      event2.isAllday = false;

      expect(event.equals(event2)).toBe(false);
    });

    it('return false when two event has different start or end.', () => {
      event.title = 'dance';
      event2.title = 'dance';
      event.isAllday = true;
      event2.isAllday = true;
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
      event.isAllday = true;

      expect(+Number(event.duration())).toBe(+Number(new TZDate('1970-01-02T23:59:59.999Z')));
    });
  });

  describe('new EventModel()', () => {
    it('create event model instance from data object.', () => {
      const mockEventObject = {
        title: 'hunting',
        isAllday: true,
        start: new TZDate('2015/05/02'),
        end: new TZDate('2015/05/02'),
      };
      mockEventObject.start.setHours(0, 0, 0);
      mockEventObject.end.setHours(23, 59, 59);

      const mockEventModel = new EventModel(mockEventObject);

      expect(mockEventModel).toMatchObject(mockEventObject);
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
      const a = new EventModel({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = new EventModel({
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
      const a = new EventModel({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = new EventModel({
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
      const a = new EventModel({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T10:00:00',
      });
      const b = new EventModel({
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
      const a = new EventModel({
        title: 'A',
        isAllday: false,
        start: '2015-05-01T09:30:00',
        end: '2015-05-01T09:50:00',
      });
      const b = new EventModel({
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
  let eventData: EventObject[];

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
    let e = new EventModel(eventData[0]);

    let expected: EventObject = {
      title: '스크럼',
      category: 'time',
      dueDateClass: '',
      isAllday: false,
      start: new TZDate('2015-10-26T09:40:00'),
      end: new TZDate('2015-10-26T10:00:00'),
    };

    expect(e).toMatchObject(expected);

    e = new EventModel(eventData[1]);
    expected = {
      title: '[홍길동]연차',
      category: 'allday',
      dueDateClass: '',
      isAllday: true,
      start: new TZDate(2015, 9, 26),
      end: new TZDate(2015, 9, 26, 23, 59, 59),
    };

    expect(e).toMatchObject(expected);

    e = new EventModel(eventData[2]);
    expected = {
      title: '테스트 마일스톤1',
      category: 'milestone',
      dueDateClass: '',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toMatchObject(expected);

    e = new EventModel(eventData[3]);
    expected = {
      title: '테스트 업무',
      category: 'task',
      dueDateClass: 'morning',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
    };

    expect(e).toMatchObject(expected);
  });

  it('raw data', () => {
    const raw: {
      hello: string;
      hello2?: string;
    } = {
      hello: 'world',
    };
    const e = new EventModel({
      title: '굿',
      category: 'task',
      dueDateClass: 'morning',
      isAllday: false,
      start: new TZDate('2015-10-26T23:59:59'),
      end: new TZDate('2015-10-26T23:59:59'),
      raw,
    });

    expect(e.raw).toMatchObject({ hello: 'world' });

    raw.hello2 = 'good';

    expect(e.raw).toMatchObject({ hello: 'world', hello2: 'good' });
  });
});
