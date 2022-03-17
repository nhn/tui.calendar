import produce from 'immer';

import {
  clearEvents,
  createEventCollection,
  createEvents,
  deleteEvent,
  updateEvent,
} from '@src/controller/base';
import EventModel from '@src/model/eventModel';

import { CalendarData, EventModelData } from '@t/events';
import { CalendarInfo } from '@t/options';
import { CalendarState, CalendarStore, SetState } from '@t/store';

export type CalendarSlice = { calendar: CalendarData };

type UpdateEventParams = { event: EventModel; eventData: EventModelData };

export type CalendarDispatchers = {
  createEvents: (events: EventModelData[]) => void;
  updateEvent: (params: UpdateEventParams) => void;
  deleteEvent: (event: EventModel) => void;
  clearEvents: () => void;
  setCalendars: (calendars: CalendarInfo[]) => void;
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
    createEvents: (events) =>
      set(
        produce((state: CalendarState) => {
          createEvents(state.calendar, events);
        })
      ),
    updateEvent: ({ event, eventData }) =>
      set(
        produce((state: CalendarState) => {
          updateEvent(state.calendar, event.id, event.calendarId, eventData);
        })
      ),
    deleteEvent: (event) =>
      set(
        produce((state: CalendarState) => {
          deleteEvent(state.calendar, event);
        })
      ),
    clearEvents: () =>
      set(
        produce((state: CalendarState) => {
          clearEvents(state.calendar);
        })
      ),
    setCalendars: (calendars) =>
      set(
        produce((state: CalendarState) => {
          state.calendar.calendars = calendars;
        })
      ),
  };
}
