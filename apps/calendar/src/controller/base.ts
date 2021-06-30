/**
 * @fileoverview Base calendar controller
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import inArray from 'tui-code-snippet/array/inArray';
import forEach from 'tui-code-snippet/collection/forEach';

import { CalendarData, DataStore, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import { makeDateRange, MS_PER_DAY, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import { isSameSchedule } from '@src/util';
import Collection from '@src/util/collection';

export type IDS_OF_DAY = Record<string, number[]>;

/**
 * Make a schedule collection
 * @returns {Collection<Schedule>} instance
 */
export function createScheduleCollection<T extends Schedule | ScheduleViewModel>(
  ...initItems: T[]
) {
  const collection = new Collection<T>((schedule) => schedule.cid());

  if (initItems.length) {
    collection.add(...initItems);
  }

  return collection;
}
/**
 * Calculate contain dates in schedule.
 * @param {Schedule} schedule The instance of schedule.
 * @returns {array} contain dates.
 */
export function getDateRange(start: TZDate, end: TZDate) {
  return makeDateRange(toStartOfDay(start), toEndOfDay(end), MS_PER_DAY);
}

export function isAllDay(schedule: Schedule) {
  if (
    schedule.isAllDay ||
    (schedule.category === 'time' && Number(schedule.end) - Number(schedule.start) > MS_PER_DAY)
  ) {
    return true;
  }

  return false;
}

/**
 * function for group each schedule models.
 * @type {function}
 * @param {ScheduleViewModel} viewModel - view model instance
 * @returns {string} group key
 */
export function filterByCategory(viewModel: ScheduleViewModel) {
  const { model } = viewModel;

  if (isAllDay(model)) {
    return 'allday';
  }

  return model.category;
}

/****************
 * CRUD Schedule
 ****************/

/**
 * Set date matrix to supplied schedule instance.
 * @param {Schedule} schedule - instance of schedule.
 */
export function addToMatrix(idsOfDay: IDS_OF_DAY, schedule: Schedule) {
  const containDates = getDateRange(schedule.getStarts(), schedule.getEnds());

  containDates.forEach((date) => {
    const ymd = toFormat(date, 'YYYYMMDD');
    const matrix = (idsOfDay[ymd] = idsOfDay[ymd] || []);

    matrix.push(schedule.cid());
  });
}

/**
 * Remove schedule's id from matrix.
 * @param {Schedule} schedule - instance of schedule
 */
export function removeFromMatrix(idsOfDay: IDS_OF_DAY, schedule: Schedule) {
  const modelID = schedule.cid();

  forEach(idsOfDay, (ids: number[]) => {
    const index = inArray(modelID, ids);

    if (~index) {
      ids.splice(index, 1);
    }
  });
}

/**
 * Add an schedule instance.
 * @param {Schedule} schedule The instance of Schedule.
 * @returns {Schedule} The instance of Schedule that added.
 */
export function addSchedule(dataStore: DataStore, schedule: Schedule) {
  dataStore.schedules.add(schedule);
  addToMatrix(dataStore.idsOfDay, schedule);

  return schedule;
}

/**
 * Create an schedule instance from raw data.
 * @param {ScheduleData} scheduleData - Data object to create schedule.
 * @returns {Schedule[]} The instance of Schedule that created.
 */
export function createSchedule(dataStore: DataStore, scheduleData: ScheduleData) {
  const schedule = Schedule.create(scheduleData);

  return addSchedule(dataStore, schedule);
}

/**
 * Create schedules from raw data.
 * @param {ScheduleData[]} dataList - schedule data list to create schedule.
 * @returns {Schedule[]} The instance list of Schedule that created.
 */
export function createSchedules(dataStore: DataStore, schedules: ScheduleData[] = []) {
  return schedules.map((scheduleData) => createSchedule(dataStore, scheduleData));
}

/**
 * Update an schedule.
 * @param {string} scheduleId - schedule id
 * @param {string} calendarId - calendar id
 * @param {ScheduleData} scheduleData - schedule data
 * @returns {boolean} success or failure
 */
export function updateSchedule(
  dataStore: DataStore,
  scheduleId: string,
  calendarId: string,
  scheduleData: ScheduleData
) {
  const { idsOfDay } = dataStore;
  const schedule = dataStore.schedules.single((item) =>
    isSameSchedule(item, scheduleId, calendarId)
  );

  if (!schedule) {
    return false;
  }

  schedule.init({ ...schedule, ...scheduleData });

  removeFromMatrix(idsOfDay, schedule);
  addToMatrix(idsOfDay, schedule);

  return true;
}

/**
 * Delete schedule instance from controller.
 * @param {Schedule} schedule - schedule instance to delete
 * @returns {Schedule} deleted model instance.
 */
export function deleteSchedule(dataStore: DataStore, schedule: Schedule) {
  removeFromMatrix(dataStore.idsOfDay, schedule);
  dataStore.schedules.remove(schedule);

  return schedule;
}

export function clearSchedules(dataStore: DataStore) {
  dataStore.idsOfDay = {};
  dataStore.schedules.clear();
}

/**
 * Set calendar list
 * @param {Array.<Calendar>} calendars - calendar list
 */
export function setCalendars(dataStore: DataStore, calendars: CalendarData[]) {
  dataStore.calendars = calendars;
}

/**
 * Return schedules in supplied date range.
 *
 * available only YMD.
 * @param {TZDate} start start date.
 * @param {TZDate} end end date.
 * @returns {object.<string, Collection>} schedule collection grouped by dates.
 */
export function findByDateRange(
  dataStore: DataStore,
  condition: { start: TZDate; end: TZDate }
): Record<string, Schedule[]> {
  const { start, end } = condition;
  const { schedules, idsOfDay } = dataStore;
  const range = getDateRange(start, end);
  const ownSchedules = schedules.items;
  const ownMatrix = idsOfDay;
  const result: Record<string, Schedule[]> = {};
  let ids;
  let ymd;
  let viewModels: Schedule[];

  range.forEach((date) => {
    ymd = toFormat(date, 'YYYYMMDD');
    ids = ownMatrix[ymd];
    viewModels = result[ymd] = [];

    if (ids && ids.length) {
      viewModels.push(...ids.map((id) => ownSchedules[id]));
    }
  });

  return result;
}
