/**
 * @fileoverview Base calendar controller
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEach from 'tui-code-snippet/collection/forEach';
import inArray from 'tui-code-snippet/array/inArray';

import { CalendarData, ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { isSameSchedule } from '@src/util';
import Collection from '@src/util/collection';
import TZDate from '@src/time/date';
import {
  toStartOfDay,
  toEndOfDay,
  MILLISECONDS_PER_DAY,
  format,
  makeDateRange
} from '@src/time/datetime';

export type IDS_OF_DAY = Record<string, number[]>;

/**
 * Calculate contain dates in schedule.
 * @private
 * @param {Schedule} schedule The instance of schedule.
 * @returns {array} contain dates.
 */
export function getContainDatesInSchedule(start: TZDate, end: TZDate) {
  return makeDateRange(toStartOfDay(start), toEndOfDay(end), MILLISECONDS_PER_DAY);
}

export default class ModelController {
  /**
   * schedules collection.
   * @type {Collection}
   */
  schedules = new Collection<Schedule>(schedule => {
    return schedule.cid();
  });

  /**
   * Calendar list
   * @type {Array.<Calendar>}
   */
  private calendars: CalendarData[] = [];

  /**
   * Matrix for multidate schedules.
   * @type {object.<string, array>}
   */
  idsOfDay: IDS_OF_DAY = {};

  /****************
   * CRUD Schedule
   ****************/
  /**
   * Create an schedule instance from raw data.
   * @param {ScheduleData} scheduleData - Data object to create schedule.
   * @returns {Schedule[]} The instance of Schedule that created.
   */
  createSchedule(scheduleData: ScheduleData) {
    const schedule = Schedule.create(scheduleData);

    return this.addSchedule(schedule);
  }

  /**
   * Add an schedule instance.
   * @param {Schedule} schedule The instance of Schedule.
   * @returns {Schedule} The instance of Schedule that added.
   */
  addSchedule(schedule: Schedule) {
    this.schedules.add(schedule);
    this._addToMatrix(schedule);

    return schedule;
  }

  /**
   * Create schedules from raw data.
   * @param {ScheduleData[]} dataList - schedule data list to create schedule.
   * @returns {Schedule[]} The instance list of Schedule that created.
   */
  createSchedules(schedules: ScheduleData[] = []) {
    return schedules.map(scheduleData => {
      return this.createSchedule(scheduleData);
    });
  }

  /**
   * Update an schedule.
   */
  updateSchedule(scheduleId: string, calendarId: string, scheduleData: ScheduleData) {
    const schedule = this.schedules.single(item => {
      return isSameSchedule(item, scheduleId, calendarId);
    });

    if (!schedule) {
      return false;
    }

    schedule.init(scheduleData);

    this._removeFromMatrix(schedule);
    this._addToMatrix(schedule);

    return true;
  }

  /**
   * Delete schedule instance from controller.
   * @param {Schedule} schedule - schedule instance to delete
   * @returns {Schedule} deleted model instance.
   */
  deleteSchedule(schedule: Schedule) {
    this._removeFromMatrix(schedule);
    this.schedules.remove(schedule);

    return schedule;
  }

  clearSchedules() {
    this.idsOfDay = {};
    this.schedules.clear();
  }

  /**
   * Set calendar list
   * @param {Array.<Calendar>} calendars - calendar list
   */
  setCalendars(calendars: CalendarData[]) {
    this.calendars = calendars;
  }

  /**
   * Return schedules in supplied date range.
   *
   * available only YMD.
   * @param {TZDate} start start date.
   * @param {TZDate} end end date.
   * @returns {object.<string, Collection>} schedule collection grouped by dates.
   */
  findByDateRange(start: TZDate, end: TZDate): Record<string, Schedule[]> {
    const range = getContainDatesInSchedule(start, end);
    const ownSchedules = this.schedules.items;
    const ownMatrix = this.idsOfDay;
    const result: Record<string, Schedule[]> = {};
    let ids;
    let ymd;
    let viewModels: Schedule[];

    range.forEach(date => {
      ymd = format(date, 'YYYYMMDD');
      ids = ownMatrix[ymd];
      viewModels = result[ymd] = [];

      if (ids && ids.length) {
        viewModels.push(...ids.map(id => ownSchedules[id]));
      }
    });

    return result;
  }

  /**
   * Set date matrix to supplied schedule instance.
   * @param {Schedule} schedule - instance of schedule.
   */
  _addToMatrix(schedule: Schedule) {
    const ownMatrix = this.idsOfDay;
    const containDates = getContainDatesInSchedule(schedule.getStarts(), schedule.getEnds());

    containDates.forEach(function(date) {
      const ymd = format(date, 'YYYYMMDD');
      const matrix = (ownMatrix[ymd] = ownMatrix[ymd] || []);

      matrix.push(schedule.cid());
    });
  }

  /**
   * Remove schedule's id from matrix.
   * @param {Schedule} schedule - instance of schedule
   */
  _removeFromMatrix(schedule: Schedule) {
    const modelID = schedule.cid();

    forEach(this.idsOfDay, (ids: number[]) => {
      const index = inArray(modelID, ids);

      if (~index) {
        ids.splice(index, 1);
      }
    });
  }

  /**
   * function for group each schedule models.
   * @type {function}
   * @param {ScheduleViewModel} viewModel - view model instance
   * @returns {string} group key
   */
  groupFunc(viewModel: ScheduleViewModel) {
    const { model } = viewModel;

    if (viewModel.model.isAllDay) {
      return 'allday';
    }

    if (
      model.category === 'time' &&
      Number(model.end) - Number(model.start) > MILLISECONDS_PER_DAY
    ) {
      return 'allday';
    }

    return model.category;
  }
}
