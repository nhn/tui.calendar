import {
  clearSchedules,
  createScheduleCollection,
  createSchedules,
  updateSchedule,
} from '@src/controller/base';
import { DataStore, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';

const initialDataStore: DataStore = {
  calendars: [],
  schedules: createScheduleCollection(),
  idsOfDay: {},
};

export const dataStore = {
  name: 'dataStore',
  state: initialDataStore,
  actions: {
    createSchedules(state: DataStore, { events }: { events: Schedule[] }) {
      createSchedules(state, events);

      return { ...state };
    },
    updateSchedule(
      state: DataStore,
      { event, eventData }: { event: Schedule; eventData: ScheduleData }
    ) {
      updateSchedule(state, event.id, event.calendarId, eventData);

      return { ...state };
    },
    clearSchedules(state: DataStore) {
      clearSchedules(state);

      return { ...state };
    },
  },
};
