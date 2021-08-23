import {
  clearSchedules,
  createScheduleCollection,
  createSchedules,
  updateSchedule,
} from '@src/controller/base';
import { CalendarData, CalendarInfo, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';

import { CalendarStore, SetState } from '@t/store';

export type CalendarSlice = { calendar: CalendarData };

type UpdateEventParams = { event: Schedule; eventData: ScheduleData };

export type CalendarDispatchers = {
  createEvents: (events: (Schedule | ScheduleData)[]) => void;
  updateEvent: (params: UpdateEventParams) => void;
  clearEvents: () => void;
};

export function createCalendarSlice(calendars: CalendarInfo[] = []): CalendarSlice {
  return {
    calendar: {
      calendars,
      schedules: createScheduleCollection(),
      idsOfDay: {},
    },
  };
}

export function createCalendarDispatchers(set: SetState<CalendarStore>): CalendarDispatchers {
  return {
    createEvents: (events: (Schedule | ScheduleData)[]) =>
      set((state) => {
        createSchedules(state.calendar, events);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
    updateEvent: ({ event, eventData }: UpdateEventParams) =>
      set((state) => {
        updateSchedule(state.calendar, event.id, event.calendarId, eventData);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
    clearEvents: () =>
      set((state) => {
        clearSchedules(state.calendar);

        return {
          calendar: {
            ...state.calendar,
          },
        };
      }),
  };
}
