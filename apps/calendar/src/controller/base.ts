import { isSameEvent } from '@src/helpers/events';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { makeDateRange, MS_PER_DAY, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import Collection from '@src/utils/collection';

import { CalendarData, EventModelData, IDS_OF_DAY } from '@t/events';
import { CalendarInfo } from '@t/options';

/**
 * Make a event collection
 * @returns {Collection<EventModel>} instance
 */
export function createEventCollection<T extends EventModel | EventUIModel>(...initItems: T[]) {
  const collection = new Collection<T>((event) => event.cid());

  if (initItems.length) {
    collection.add(...initItems);
  }

  return collection;
}
/**
 * Calculate contain dates in event.
 * @param {TZDate} start - start date of range
 * @param {TZDate} end - end date of range
 * @returns {array} contain dates.
 */
export function getDateRange(start: TZDate, end: TZDate) {
  return makeDateRange(toStartOfDay(start), toEndOfDay(end), MS_PER_DAY);
}

export function isAllDay(event: EventModel) {
  if (
    event.isAllDay ||
    (event.category === 'time' && Number(event.end) - Number(event.start) > MS_PER_DAY)
  ) {
    return true;
  }

  return false;
}

/**
 * function for group each event models.
 * @type {function}
 * @param {EventUIModel} uiModel - ui model instance
 * @returns {string} group key
 */
export function filterByCategory(uiModel: EventUIModel) {
  const { model } = uiModel;

  if (isAllDay(model)) {
    return 'allday';
  }

  return model.category;
}

/****************
 * Events CRUD
 ****************/

/**
 * Set date matrix to supplied event model instance.
 * @param {IDS_OF_DAY} idsOfDay - ids of day
 * @param {EventModel} event - instance of event model.
 */
export function addToMatrix(idsOfDay: IDS_OF_DAY, event: EventModel) {
  const containDates = getDateRange(event.getStarts(), event.getEnds());

  containDates.forEach((date) => {
    const ymd = toFormat(date, 'YYYYMMDD');
    const matrix = (idsOfDay[ymd] = idsOfDay[ymd] || []);

    matrix.push(event.cid());
  });
}

/**
 * Remove event's id from matrix.
 * @param {IDS_OF_DAY} idsOfDay - ids of day
 * @param {EventModel} event - instance of event model
 */
export function removeFromMatrix(idsOfDay: IDS_OF_DAY, event: EventModel) {
  const modelID = event.cid();

  Object.values(idsOfDay).forEach((ids: number[]) => {
    const index = ids.indexOf(modelID);

    if (~index) {
      ids.splice(index, 1);
    }
  });
}

/**
 * Add an event instance.
 * @param {CalendarData} calendarData - data of calendar
 * @param {EventModel} event The instance of EventModel.
 * @returns {EventModel} The instance of EventModel that added.
 */
export function addEvent(calendarData: CalendarData, event: EventModel) {
  calendarData.events.add(event);
  addToMatrix(calendarData.idsOfDay, event);

  return event;
}

/**
 * Create an event instance from raw data.
 * @param {CalendarData} calendarData - data of calendar
 * @param {EventModelData} eventData - Data object to create event.
 * @returns {EventModel[]} The instance of EventModel that created.
 */
export function createEvent(calendarData: CalendarData, eventData: EventModelData) {
  const event = EventModel.create(eventData);

  return addEvent(calendarData, event);
}

/**
 * Create events from raw data.
 * @param {CalendarData} calendarData - data of calendar
 * @param {EventModelData[]} events - event data list to create event.
 * @returns {EventModel[]} The instance list of EventModel that created.
 */
export function createEvents(calendarData: CalendarData, events: EventModelData[] = []) {
  return events.map((eventData) => createEvent(calendarData, eventData));
}

/**
 * Update an event.
 * @param {CalendarData} calendarData - data of calendar
 * @param {string} eventId - event id
 * @param {string} calendarId - calendar id
 * @param {EventModelData} eventData - event data
 * @returns {boolean} success or failure
 */
export function updateEvent(
  calendarData: CalendarData,
  eventId: string,
  calendarId: string,
  eventData: EventModelData
) {
  const { idsOfDay } = calendarData;
  const event = calendarData.events.single((item) => isSameEvent(item, eventId, calendarId));

  if (!event) {
    return false;
  }

  event.init({ ...event, ...eventData });

  removeFromMatrix(idsOfDay, event);
  addToMatrix(idsOfDay, event);

  return true;
}

/**
 * Delete event instance from controller.
 * @param {CalendarData} calendarData - data of calendar
 * @param {EventModel} event - event model instance to delete
 * @returns {EventModel} deleted model instance.
 */
export function deleteEvent(calendarData: CalendarData, event: EventModel) {
  removeFromMatrix(calendarData.idsOfDay, event);
  calendarData.events.remove(event);

  return event;
}

export function clearEvents(calendarData: CalendarData) {
  calendarData.idsOfDay = {};
  calendarData.events.clear();
}

/**
 * Set calendar list
 * @param {CalendarData} calendarData - data of calendar
 * @param {Array.<Calendar>} calendars - calendar list
 */
export function setCalendars(calendarData: CalendarData, calendars: CalendarInfo[]) {
  calendarData.calendars = calendars;
}

/**
 * Return events in supplied date range.
 *
 * available only YMD.
 * @param {CalendarData} calendarData - data of calendar
 * @param {{start: TZDate, end: TZDate}} condition - condition of find range
 * @returns {object.<string, Collection>} event collection grouped by dates.
 */
export function findByDateRange(
  calendarData: CalendarData,
  condition: { start: TZDate; end: TZDate }
): Record<string, EventModel[]> {
  const { start, end } = condition;
  const { events, idsOfDay } = calendarData;
  const range = getDateRange(start, end);
  const ownEvents = events.items;
  const ownMatrix = idsOfDay;
  const result: Record<string, EventModel[]> = {};
  let ids;
  let ymd;
  let uiModels: EventModel[];

  range.forEach((date) => {
    ymd = toFormat(date, 'YYYYMMDD');
    ids = ownMatrix[ymd];
    uiModels = result[ymd] = [];

    if (ids && ids.length) {
      uiModels.push(...ids.map((id) => ownEvents[id]));
    }
  });

  return result;
}
