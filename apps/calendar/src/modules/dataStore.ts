import { clearSchedules, createScheduleCollection, createSchedules } from '@src/controller/base';
import { DataStore } from '@src/model';
import Schedule from '@src/model/schedule';

const initialDataStore: DataStore = {
  calendars: [],
  schedules: createScheduleCollection(),
  idsOfDay: {},
};

const dataStore = {
  name: 'dataStore',
  state: initialDataStore,
  actions: {
    createSchedules(state: DataStore, { events }: { events: Schedule[] }) {
      createSchedules(state, events);

      return { ...state };
    },
    clearSchedules(state: DataStore) {
      clearSchedules(state);

      return { ...state };
    },
  },
};

export default dataStore;
