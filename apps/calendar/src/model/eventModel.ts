import { collidesWith } from '@src/helpers/events';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { compare, MS_PER_DAY, parse, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { stamp } from '@src/utils/stamp';
import { isString } from '@src/utils/type';

import type { DateType, EventCategory, EventObject, EventState } from '@t/events';

export default class EventModel implements Required<EventObject> {
  id = '';

  calendarId = '';

  title = '';

  body = '';

  isAllday = false;

  start: TZDate = new TZDate();

  end: TZDate = new TZDate();

  goingDuration = 0;

  comingDuration = 0;

  location = '';

  attendees: string[] = [];

  category: EventCategory = 'time';

  dueDateClass = '';

  recurrenceRule = '';

  state: EventState = 'Busy';

  isVisible = true;

  isPending = false;

  isFocused = false;

  isReadOnly = false;

  isPrivate = false;

  color = '#000';

  bgColor = '#a1b56c';

  dragBgColor = '#a1b56c';

  borderColor = '#000';

  customStyle = '';

  raw: any = null;

  /**
   * whether the event includes multiple dates
   */
  hasMultiDates = false;

  constructor(event: EventObject = {}) {
    // initialize model id
    stamp(this);

    this.init(event);
  }

  static schema = {
    required: ['title'],
    dateRange: ['start', 'end'],
  };

  // eslint-disable-next-line complexity
  init(event: EventObject) {
    event = { ...event };
    if (event.category === 'allday') {
      event.isAllday = true;
    }

    this.id = event.id || this.id;
    this.calendarId = event.calendarId || this.calendarId;
    this.title = event.title || this.title;
    this.body = event.body || this.body;
    this.isAllday = event.isAllday ?? this.isAllday;

    this.goingDuration = event.goingDuration || this.goingDuration;
    this.comingDuration = event.comingDuration || this.comingDuration;
    this.location = event.location || this.location;
    this.attendees = event.attendees || this.attendees;
    this.category = event.category || this.category;
    this.dueDateClass = event.dueDateClass || this.dueDateClass;
    this.recurrenceRule = event.recurrenceRule || this.recurrenceRule;
    this.state = event.state || this.state;

    this.isVisible = event.isVisible ?? this.isVisible;
    this.isPrivate = event.isPrivate || this.isPrivate;
    this.isPending = event.isPending || this.isPending;
    this.isFocused = event.isFocused || this.isFocused;
    this.isReadOnly = event.isReadOnly || this.isReadOnly;

    this.color = event.color || this.color;
    this.bgColor = event.bgColor || this.bgColor;
    this.dragBgColor = event.dragBgColor || this.dragBgColor;
    this.borderColor = event.borderColor || this.borderColor;
    this.customStyle = event.customStyle || this.customStyle;

    if (this.isAllday) {
      this.setAlldayPeriod(event.start, event.end);
    } else {
      this.setTimePeriod(event.start, event.end);
    }

    if (event.category === 'milestone' || event.category === 'task') {
      this.start = new TZDate(this.end);
    }

    this.raw = event.raw ?? null;
  }

  setAlldayPeriod(start?: DateType, end?: DateType) {
    // If it is an all-day, only the date information of the string is used.
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
   * Check two  are equals (means title, isAllday, start, end are same)
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

    if (this.isAllday !== event.isAllday) {
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

    if (this.isAllday) {
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
  const { category, isAllday, hasMultiDates } = model;

  return category === 'time' && !isAllday && !hasMultiDates;
}
