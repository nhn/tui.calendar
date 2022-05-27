import {
  createEvent,
  createEventCollection,
  deleteEvent,
  findByDateRange,
  getDateRange,
  updateEvent,
} from '@src/controller/base';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import type { CalendarData, EventObject } from '@t/events';

describe('controller/base', () => {
  let calendarData: CalendarData;
  let eventDataList: EventObject[];

  beforeEach(() => {
    calendarData = {
      calendars: [],
      events: createEventCollection(),
      idsOfDay: {},
    };
    eventDataList = [
      {
        title: 'hunting',
        isAllday: true,
        start: '2015/05/01',
        end: '2015/05/02',
      },
      {
        title: 'meeting',
        isAllday: false,
        start: '2015/05/03 12:30:00',
        end: '2015/05/03 16:00:00',
      },
      {
        title: 'physical training',
        isAllday: false,
        start: '2015/05/03 18:30:00',
        end: '2015/05/03 19:30:00',
      },
      {
        title: 'A',
        isAllday: false,
        start: '2015/05/02 12:30:00',
        end: '2015/05/03 09:20:00',
      },
    ];
  });

  describe('getDateRange()', () => {
    let event: EventModel;

    it('calculate contain dates for specific events.', () => {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03'),
      ];

      event = new EventModel({
        title: 'A',
        isAllday: true,
        start: '2015/05/01',
        end: '2015/05/03',
      });

      expect(getDateRange(event.getStarts(), event.getEnds())).toEqual(expected);
    });

    it('can calculate non all day event.', () => {
      const expected = [
        new TZDate('2015/05/01'),
        new TZDate('2015/05/02'),
        new TZDate('2015/05/03'),
      ];

      event = new EventModel({
        title: 'A',
        isAllday: false,
        start: '2015/05/01 12:30:00',
        end: '2015/05/03 09:20:00',
      });

      expect(getDateRange(event.getStarts(), event.getEnds())).toEqual(expected);
    });
  });

  describe('createEvent()', () => {
    it('return itself for chaining pattern.', () => {
      const event = new EventModel(eventDataList[0]);

      expect(event.equals(createEvent(calendarData, eventDataList[0]))).toBe(true);
    });

    it('create event instance by raw event data.', () => {
      const id = createEvent(calendarData, eventDataList[0]).cid();
      const id2 = createEvent(calendarData, eventDataList[1]).cid();
      const id3 = createEvent(calendarData, eventDataList[3]).cid();

      expect(calendarData.events.size).toBe(3);
      expect(calendarData.idsOfDay).toEqual({
        '20150501': [id],
        '20150502': [id, id3],
        '20150503': [id2, id3],
      });
    });
  });

  describe('findByDateRange()', () => {
    let eventList: EventModel[];
    let idList: number[];

    beforeEach(() => {
      eventList = [];
      idList = [];

      eventDataList.forEach((data) => {
        const item = createEvent(calendarData, data);
        eventList.push(item);
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
      const result = findByDateRange(calendarData, { start, end });

      expect(result).toEqualUIModelByTitle(expected);
    });

    it('return ui models in dates properly.', () => {
      const expected = {
        '20150502': ['hunting', 'A'],
        '20150503': ['A', 'meeting', 'physical training'],
      };

      const start = new TZDate('2015/05/02');
      const end = new TZDate('2015/05/03');

      const result = findByDateRange(calendarData, { start, end });

      expect(result).toEqualUIModelByTitle(expected);
    });
  });

  describe('updateEvent()', () => {
    it('update owned event and date matrix.', () => {
      const model = createEvent(calendarData, {
        title: 'Go to work',
        isAllday: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00',
      });
      const id = model.cid();

      updateEvent(calendarData, model.id, model.calendarId, {
        title: 'Go to work',
        isAllday: false,
        start: '2015/05/02',
        end: '2015/05/02',
      });

      const event = calendarData.events.getFirstItem();

      expect(event).not.toBeNull();

      type CompatableEvent = Record<string, any>;

      expect(event).toEqual(
        expect.objectContaining<CompatableEvent>({
          title: 'Go to work',
          isAllday: false,
          start: new TZDate('2015/05/02'),
          end: new TZDate('2015/05/02'),
        })
      );

      expect(calendarData.idsOfDay).toEqual({
        '20150501': [],
        '20150502': [id],
      });
    });
  });

  describe('deleteEvent()', () => {
    let event: EventModel;

    beforeEach(() => {
      event = createEvent(calendarData, {
        title: 'Go to work',
        isAllday: false,
        start: '2015/05/01 09:30:00',
        end: '2015/05/01 18:30:00',
      });
    });

    it('delete an event by model.', () => {
      expect(deleteEvent(calendarData, event)).toEqual(event);
      expect(calendarData.events.size).toBe(0);
      expect(calendarData.idsOfDay).toEqual({
        '20150501': [],
      });
    });
  });
});
