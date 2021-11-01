import {
  clearEvents,
  createEventCollection,
  createEvents,
  updateEvent,
} from '@src/controller/base';
import { CalendarData, CalendarInfo, EventModelData } from '@src/model';
import EventModel from '@src/model/eventModel';

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
      set((state) => {
        createEvents(state.calendar, events);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
    updateEvent: ({ event, eventData }: UpdateEventParams) =>
      set((state) => {
        updateEvent(state.calendar, event.id, event.calendarId, eventData);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
    clearEvents: () =>
      set((state) => {
        clearEvents(state.calendar);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
  };
}
