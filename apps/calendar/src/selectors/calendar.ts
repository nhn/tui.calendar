import { createEventCollection } from '@src/controller/base';
import EventModel from '@src/model/eventModel';

import { CalendarData } from '@t/events';
import { CalendarState } from '@t/store';

export function visibleCalendarSelector(state: CalendarState): CalendarData {
  const { calendars, events, idsOfDay } = state.calendar;
  const visibleEvents = events.toArray().filter((eventModel) => eventModel.isVisible);

  return {
    calendars,
    events: createEventCollection<EventModel>(...visibleEvents),
    idsOfDay,
  };
}
