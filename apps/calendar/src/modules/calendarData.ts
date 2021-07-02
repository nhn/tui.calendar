import {
  clearSchedules,
  createScheduleCollection,
  createSchedules,
  updateSchedule,
} from '@src/controller/base';
import { CalendarData, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';

const initialCalendarData: CalendarData = {
  calendars: [],
  schedules: createScheduleCollection(),
  idsOfDay: {},
};

export const calendarData = {
  name: 'calendarData',
  state: initialCalendarData,
  actions: {
    createSchedules(state: CalendarData, { events }: { events: Schedule[] }) {
      createSchedules(state, events);

      return { ...state };
    },
    updateSchedule(
      state: CalendarData,
      { event, eventData }: { event: Schedule; eventData: ScheduleData }
    ) {
      updateSchedule(state, event.id, event.calendarId, eventData);

      return { ...state };
    },
    clearSchedules(state: CalendarData) {
      clearSchedules(state);

      return { ...state };
    },
  },
};
