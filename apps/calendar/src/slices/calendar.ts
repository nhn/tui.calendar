import produce from 'immer';

import {
  clearEvents,
  createEventCollection,
  createEvents,
  deleteEvent,
  updateEvent,
} from '@src/controller/base';
import type EventModel from '@src/model/eventModel';

import type { CalendarData, EventObject } from '@t/events';
import type { CalendarColor, CalendarInfo } from '@t/options';
import type { CalendarState, CalendarStore, SetState } from '@t/store';

export type CalendarSlice = { calendar: CalendarData };

type UpdateEventParams = { event: EventModel; eventData: EventObject };

export type CalendarDispatchers = {
  createEvents: (events: EventObject[]) => void;
  updateEvent: (params: UpdateEventParams) => void;
  deleteEvent: (event: EventModel) => void;
  clearEvents: () => void;
  setCalendars: (calendars: CalendarInfo[]) => void;
  setCalendarColor: (calendarId: string, colorOptions: CalendarColor) => void;
  setCalendarVisibility: (calendarIds: string[], isVisible: boolean) => void;
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
    setCalendarColor: (calendarId, colorOptions) =>
      set(
        produce((state: CalendarState) => {
          const calendars = state.calendar.calendars.map((calendar) => {
            if (calendar.id === calendarId) {
              return {
                ...calendar,
                ...colorOptions,
              };
            }

            return calendar;
          });
          const events = state.calendar.events.toArray().map((event) => {
            if (event.calendarId === calendarId) {
              event.color = colorOptions.color ?? event.color;
              event.backgroundColor = colorOptions.backgroundColor ?? event.backgroundColor;
              event.borderColor = colorOptions.borderColor ?? event.borderColor;
              event.dragBackgroundColor =
                colorOptions.dragBackgroundColor ?? event.dragBackgroundColor;
            }

            return event;
          });
          const collection = createEventCollection<EventModel>(...events);

          state.calendar.calendars = calendars;
          state.calendar.events = collection;
        })
      ),
    setCalendarVisibility: (calendarIds, isVisible) =>
      set(
        produce((state: CalendarState) => {
          const events = state.calendar.events.toArray();

          state.calendar.events = createEventCollection<EventModel>(
            ...events.map((event) => {
              if (calendarIds.includes(event.calendarId)) {
                event.isVisible = isVisible;
              }

              return event;
            })
          );
        })
      ),
  };
}
