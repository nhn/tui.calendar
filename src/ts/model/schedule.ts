/**
 * @fileoverview Model of schedule.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import isString from 'tui-code-snippet/type/isString';
import isExisty from 'tui-code-snippet/type/isExisty';
import extend from 'tui-code-snippet/object/extend';
import TZDate from '@src/time/date';
import { DateType, ScheduleData } from '@src/model';
import { stamp } from '@src/util';
import {
  isSameDate,
  MILLISECONDS_SCHEDULE_MIN_DURATION,
  parse,
  toEndOfDay,
  toStartOfDay,
  millisecondsFrom,
  compare
} from '@src/time/datetime';
import ScheduleViewModel from '@src/model/scheduleViewModel';

const SCHEDULE_MIN_DURATION = MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Schedule category
 * @readonly
 * @enum {string}
 */
export type ScheduleCategory = 'milestone' | 'task' | 'allday' | 'time';

/**
 * The model of calendar schedules.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
export default class Schedule {
  /**
   * `Optional` unique id for various use.
   * @type {string}
   */
  id = '';

  /**
   * title for schedule.
   * @type {string}
   */
  title = '';

  /**
   * body for schedule.
   * @type {string}
   */
  body = '';

  /**
   * is schedule is all day schedule?
   * @type {boolean}
   */
  isAllDay = false;

  /**
   * schedule start
   * @type {TZDate}
   */
  start: TZDate = new TZDate();

  /**
   * schedule end
   * @type {TZDate}
   */
  end: TZDate = new TZDate();

  /**
   * schedule text color
   * @type {string}
   */
  color = '#000';

  /**
   * schedule block visibility
   * @type {boolean}
   */
  isVisible = true;

  /**
   * schedule background color
   * @type {string}
   */
  bgColor = '#a1b56c';

  /**
   * schedule background color when dragging it
   * @type {string}
   */
  dragBgColor = '#a1b56c';

  /**
   * schedule left border color
   * @type {string}
   */
  borderColor = '#000';

  /**
   * calendar ID
   * @type {string}
   */
  calendarId = '';

  /**
   * Schedule category(milestone, task, allday, time)
   * @type {string}
   */
  category: ScheduleCategory = 'time';

  /**
   * Classification of work schedules (before work, before lunch, before work)
   * @type {string}
   */
  dueDateClass = '';

  /**
   * Custom style for schedule element
   * @type {string}
   */
  customStyle = '';

  /**
   * in progress flag to do something
   * @type {boolean}
   */
  isPending = false;

  /**
   * focused schedule flag
   * @type {boolean}
   */
  isFocused = false;

  /**
   * read-only schedule flag
   * @type {boolean}
   */
  isReadOnly = false;

  /**
   * private schedule
   * @type {boolean}
   */
  isPrivate = false;

  /**
   * location
   * @type {string}
   */
  location = '';

  /**
   * attendees
   * @type {Array.<string>}
   */
  attendees: string[] = [];

  /**
   * recurrence rule
   * @type {any}
   */
  recurrenceRule = '';

  /**
   * state. 'Busy' is default.
   * @type {string}
   */
  state = '';

  /**
   * travelTime: going-Duration minutes
   * @type {number}
   */
  goingDuration = 0;

  /**
   * travelTime: coming-Duration minutes
   * @type {number}
   */
  comingDuration = 0;

  /**
   * Separate data storage space independent of rendering.
   * @type {any}
   */
  raw: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * whether the schedule includes multiple dates
   * @type {boolean}
   */
  hasMultiDates = false;

  constructor() {
    // initialize model id
    stamp(this);
  }

  static schema = {
    required: ['title'],
    dateRange: ['start', 'end']
  };

  static create(data: ScheduleData) {
    return new Schedule().init(data);
  }

  /**
   * Initialize schedule instance.
   * @param {ScheduleData} schedule options.
   */
  init(schedule: ScheduleData) {
    schedule = extend({}, schedule);
    if (schedule.category === 'allday') {
      schedule.isAllDay = true;
    }

    this.id = schedule.id || '';
    this.title = schedule.title || '';
    this.body = schedule.body || '';
    this.isAllDay = isExisty(schedule.isAllDay) ? schedule.isAllDay : false;
    this.isVisible = isExisty(schedule.isVisible) ? schedule.isVisible : true;

    this.color = schedule.color || this.color;
    this.bgColor = schedule.bgColor || this.bgColor;
    this.dragBgColor = schedule.dragBgColor || this.dragBgColor;
    this.borderColor = schedule.borderColor || this.borderColor;
    this.calendarId = schedule.calendarId || '';
    this.category = schedule.category || 'time';
    this.dueDateClass = schedule.dueDateClass || '';
    this.customStyle = schedule.customStyle || '';
    this.location = schedule.location || '';
    this.attendees = schedule.attendees || [];
    this.recurrenceRule = schedule.recurrenceRule || '';
    this.isPrivate = schedule.isPrivate || false;
    this.isPending = schedule.isPending || false;
    this.isFocused = schedule.isFocused || false;
    this.isReadOnly = schedule.isReadOnly || false;
    this.goingDuration = schedule.goingDuration || 0;
    this.comingDuration = schedule.comingDuration || 0;
    this.state = schedule.state || '';

    if (this.isAllDay) {
      this.setAllDayPeriod(schedule.start, schedule.end);
    } else {
      this.setTimePeriod(schedule.start, schedule.end);
    }

    if (schedule.category === 'milestone' || schedule.category === 'task') {
      this.start = new TZDate(this.end);
    }

    this.raw = isExisty(schedule.raw) ? schedule.raw : null;

    return this;
  }

  setAllDayPeriod(start?: DateType, end?: DateType) {
    // If it is an all-day schedule, only the date information of the string is used.
    let startedAt: TZDate;
    let endedAt: TZDate;

    if (isString(start)) {
      startedAt = parse(start.substring(0, 10));
    } else {
      startedAt = new TZDate(start || Date.now());
    }

    if (isString(end)) {
      endedAt = parse(end.substring(0, 10));
    } else {
      endedAt = new TZDate(end || this.start);
    }

    this.start = startedAt;
    this.start.setHours(0, 0, 0);
    this.end = (endedAt as TZDate) || new TZDate(this.start);
    this.end.setHours(23, 59, 59);
  }

  setTimePeriod(start?: DateType, end?: DateType) {
    this.start = new TZDate(start || Date.now());
    this.end = new TZDate(end || this.start);

    if (!end) {
      this.end.setMinutes(this.end.getMinutes() + 30);
    }

    this.hasMultiDates = !isSameDate(this.start, this.end);
  }

  /**
   * @returns {TZDate} render start date.
   */
  getStarts() {
    return this.start;
  }

  /**
   * @returns {TZDate} render end date.
   */
  getEnds() {
    return this.end;
  }

  /**
   * @returns {number} instance unique id.
   */
  cid(): number {
    return stamp(this);
  }

  /**
   * Check two schedule are equals (means title, isAllDay, start, end are same)
   * @param {Schedule} schedule Schedule model instance to compare.
   * @returns {boolean} Return false when not same.
   */
  equals(schedule: Schedule) {
    if (this.id !== schedule.id) {
      return false;
    }

    if (this.title !== schedule.title) {
      return false;
    }

    if (this.body !== schedule.body) {
      return false;
    }

    if (this.isAllDay !== schedule.isAllDay) {
      return false;
    }

    if (compare(this.getStarts(), schedule.getStarts()) !== 0) {
      return false;
    }

    if (compare(this.getEnds(), schedule.getEnds()) !== 0) {
      return false;
    }

    if (this.color !== schedule.color) {
      return false;
    }

    if (this.bgColor !== schedule.bgColor) {
      return false;
    }

    if (this.dragBgColor !== schedule.dragBgColor) {
      return false;
    }

    if (this.borderColor !== schedule.borderColor) {
      return false;
    }

    return true;
  }

  /**
   * return duration between start and end.
   * @returns {number} duration milliseconds (UTC)
   */
  duration(): number {
    const start = Number(this.getStarts());
    const end = Number(this.getEnds());
    let duration: number;

    if (this.isAllDay) {
      duration = Number(toEndOfDay(end)) - Number(toStartOfDay(start));
    } else {
      duration = end - start;
    }

    return duration;
  }

  /**
   * Returns true if the given Schedule coincides with the same time as the
   * calling Schedule.
   * @param {Schedule} schedule The other schedule to compare with this Schedule.
   * @returns {boolean} If the other schedule occurs within the same time as the first object.
   */
  collidesWith(schedule: Schedule | ScheduleViewModel): boolean {
    schedule = schedule instanceof ScheduleViewModel ? schedule.model : schedule;

    let ownStarts = Number(this.getStarts());
    let ownEnds = Number(this.getEnds());
    let start = Number(schedule.getStarts());
    let end = Number(schedule.getEnds());
    const ownGoingDuration = millisecondsFrom('minutes', this.goingDuration);
    const ownComingDuration = millisecondsFrom('minutes', this.comingDuration);
    const goingDuration = millisecondsFrom('minutes', schedule.goingDuration);
    const comingDuration = millisecondsFrom('minutes', schedule.comingDuration);

    if (Math.abs(ownEnds - ownStarts) < SCHEDULE_MIN_DURATION) {
      ownEnds += SCHEDULE_MIN_DURATION;
    }

    if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
      end += SCHEDULE_MIN_DURATION;
    }

    ownStarts -= ownGoingDuration;
    ownEnds += ownComingDuration;
    start -= goingDuration;
    end += comingDuration;

    if (
      (start > ownStarts && start < ownEnds) ||
      (end > ownStarts && end < ownEnds) ||
      (start <= ownStarts && end >= ownEnds)
    ) {
      return true;
    }

    return false;
  }
}
