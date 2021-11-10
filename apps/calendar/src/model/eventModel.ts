import isString from 'tui-code-snippet/type/isString';

import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { compare, MS_PER_DAY, parse, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { collidesWith } from '@src/util/events';
import { stamp } from '@src/util/stamp';

import { DateType, EventModelData } from '@t/events';

/**
 * Event category
 * @readonly
 * @enum {string}
 */
export type EventCategory = 'milestone' | 'task' | 'allday' | 'time' | 'background';

export default class EventModel {
  /**
   * `Optional` unique id for various use.
   * @type {string}
   */
  id = '';

  /**
   * title for event.
   * @type {string}
   */
  title = '';

  /**
   * body for event.
   * @type {string}
   */
  body = '';

  /**
   * is event is all day event?
   * @type {boolean}
   */
  isAllDay = false;

  /**
   * event start
   * @type {TZDate}
   */
  start: TZDate = new TZDate();

  /**
   * event end
   * @type {TZDate}
   */
  end: TZDate = new TZDate();

  /**
   * event text color
   * @type {string}
   */
  color = '#000';

  /**
   * event block visibility
   * @type {boolean}
   */
  isVisible = true;

  /**
   * event background color
   * @type {string}
   */
  bgColor = '#a1b56c';

  /**
   * event background color when dragging it
   * @type {string}
   */
  dragBgColor = '#a1b56c';

  /**
   * event left border color
   * @type {string}
   */
  borderColor = '#000';

  /**
   * calendar ID
   * @type {string}
   */
  calendarId = '';

  /**
   * Event category(milestone, task, allday, time)
   * @type {string}
   */
  category: EventCategory = 'time';

  /**
   * Classification of work events (before work, before lunch, before work)
   * @type {string}
   */
  dueDateClass = '';

  /**
   * Custom style for event element
   * @type {string}
   */
  customStyle = '';

  /**
   * in progress flag to do something
   * @type {boolean}
   */
  isPending = false;

  /**
   * focused event flag
   * @type {boolean}
   */
  isFocused = false;

  /**
   * read-only event flag
   * @type {boolean}
   */
  isReadOnly = false;

  /**
   * private event
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
   * whether the event includes multiple dates
   * @type {boolean}
   */
  hasMultiDates = false;

  constructor() {
    // initialize model id
    stamp(this);
  }

  static schema = {
    required: ['title'],
    dateRange: ['start', 'end'],
  };

  static create(data: EventModelData) {
    return new EventModel().init(data);
  }

  /**
   * Initialize event instance.
   * @param {EventModelData} event - event model data.
   */
  // eslint-disable-next-line complexity
  init(event: EventModelData) {
    event = { ...event };
    if (event.category === 'allday') {
      event.isAllDay = true;
    }

    this.id = event.id || '';
    this.title = event.title || '';
    this.body = event.body || '';
    this.isAllDay = event.isAllDay ?? false;
    this.isVisible = event.isVisible ?? true;

    this.color = event.color || this.color;
    this.bgColor = event.bgColor || this.bgColor;
    this.dragBgColor = event.dragBgColor || this.dragBgColor;
    this.borderColor = event.borderColor || this.borderColor;
    this.calendarId = event.calendarId || '';
    this.category = event.category || 'time';
    this.dueDateClass = event.dueDateClass || '';
    this.customStyle = event.customStyle || '';
    this.location = event.location || '';
    this.attendees = event.attendees || [];
    this.recurrenceRule = event.recurrenceRule || '';
    this.isPrivate = event.isPrivate || false;
    this.isPending = event.isPending || false;
    this.isFocused = event.isFocused || false;
    this.isReadOnly = event.isReadOnly || false;
    this.goingDuration = event.goingDuration || 0;
    this.comingDuration = event.comingDuration || 0;
    this.state = event.state || '';

    if (this.isAllDay) {
      this.setAllDayPeriod(event.start, event.end);
    } else {
      this.setTimePeriod(event.start, event.end);
    }

    if (event.category === 'milestone' || event.category === 'task') {
      this.start = new TZDate(this.end);
    }

    this.raw = event.raw ?? null;

    return this;
  }

  setAllDayPeriod(start?: DateType, end?: DateType) {
    // If it is an all-day , only the date information of the string is used.
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

    // if over 24 hours
    this.hasMultiDates = this.end.getTime() - this.start.getTime() > MS_PER_DAY;
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
   * Check two  are equals (means title, isAllDay, start, end are same)
   * @param {EventModel}  event model instance to compare.
   * @returns {boolean} Return false when not same.
   */
  // eslint-disable-next-line complexity
  equals(event: EventModel) {
    if (this.id !== event.id) {
      return false;
    }

    if (this.title !== event.title) {
      return false;
    }

    if (this.body !== event.body) {
      return false;
    }

    if (this.isAllDay !== event.isAllDay) {
      return false;
    }

    if (compare(this.getStarts(), event.getStarts()) !== 0) {
      return false;
    }

    if (compare(this.getEnds(), event.getEnds()) !== 0) {
      return false;
    }

    if (this.color !== event.color) {
      return false;
    }

    if (this.bgColor !== event.bgColor) {
      return false;
    }

    if (this.dragBgColor !== event.dragBgColor) {
      return false;
    }

    if (this.borderColor !== event.borderColor) {
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

  valueOf() {
    return this;
  }

  /**
   * Returns true if the given EventModel coincides with the same time as the
   * calling EventModel.
   * @param {EventModel | EventUIModel} event The other event to compare with this EventModel.
   * @param {boolean = true} usingTravelTime When calculating collision, whether to calculate with travel time.
   * @returns {boolean} If the other event occurs within the same time as the first object.
   */
  collidesWith(event: EventModel | EventUIModel, usingTravelTime = true) {
    event = event instanceof EventUIModel ? event.model : event;

    return collidesWith({
      start: Number(this.getStarts()),
      end: Number(this.getEnds()),
      targetStart: Number(event.getStarts()),
      targetEnd: Number(event.getEnds()),
      goingDuration: this.goingDuration,
      comingDuration: this.comingDuration,
      targetGoingDuration: event.goingDuration,
      targetComingDuration: event.comingDuration,
      usingTravelTime, // Daygrid does not use travelTime, TimeGrid uses travelTime.
    });
  }
}

export function isBackgroundEvent({ model }: EventUIModel) {
  return model.category === 'background';
}

export function isTimeEvent({ model }: EventUIModel) {
  const { category, isAllDay, hasMultiDates } = model;

  return category === 'time' && isAllDay === false && hasMultiDates === false;
}
