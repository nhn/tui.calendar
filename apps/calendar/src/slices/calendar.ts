import produce from 'immer';

import {
  clearEvents,
  createEventCollection,
  createEvents,
  updateEvent,
} from '@src/controller/base';
import EventModel from '@src/model/eventModel';

import { CalendarData, EventModelData } from '@t/events';
import { CalendarInfo } from '@t/options';
import { CalendarStore, SetState } from '@t/store';

export type CalendarSlice = { calendar: CalendarData };

type UpdateEventParams = { event: EventModel; eventData: EventModelData };

export type CalendarDispatchers = {
  createEvents: (events: (EventModel | EventModelData)[]) => void;
  updateEvent: (params: UpdateEventParams) => void;
  clearEvents: () => void;
};

export function createCalendarSlice(calendars: CalendarInfo[] = []): CalendarSlice {
  return {
    calendar: {
      calendars,
      events: createEventCollection(),
      idsOfDay: {},
    },
  };
}

export function createCalendarDispatchers(set: SetState<CalendarStore>): CalendarDispatchers {
  return {
    createEvents: (events: (EventModel | EventModelData)[]) =>
      set(
        produce((state) => {
          createEvents(state.calendar, events);
        })
      ),
    updateEvent: ({ event, eventData }: UpdateEventParams) =>
      set(
        produce((state) => {
          updateEvent(state.calendar, event.id, event.calendarId, eventData);
        })
      ),
    clearEvents: () =>
      set(
        produce((state) => {
          clearEvents(state.calendar);
        })
      ),
  };
}
