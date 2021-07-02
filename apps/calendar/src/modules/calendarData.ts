import {
  clearSchedules,
  createScheduleCollection,
  createSchedules,
  updateSchedule,
} from '@src/controller/base';
import { CalendarData, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';

type UpdateScheduleParams = { event: Schedule; eventData: ScheduleData };

export const calendarData = {
  name: 'calendarData',
  state: {
    calendars: [],
    schedules: createScheduleCollection(),
    idsOfDay: {},
  } as CalendarData,
  actions: {
    createSchedules(state: CalendarData, events: Schedule[]) {
      createSchedules(state, events);

      return { ...state };
    },
    updateSchedule(state: CalendarData, { event, eventData }: UpdateScheduleParams) {
      updateSchedule(state, event.id, event.calendarId, eventData);

      return { ...state };
    },
    clearSchedules(state: CalendarData) {
      clearSchedules(state);

      return { ...state };
    },
  },
};
