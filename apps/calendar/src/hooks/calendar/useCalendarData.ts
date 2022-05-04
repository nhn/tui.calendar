import { useMemo } from 'preact/hooks';

import type EventModel from '@src/model/eventModel';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';

import type { CalendarData } from '@t/events';

export function useCalendarData(calendar: CalendarData, ...filters: Filter<EventModel>[]) {
  return useMemo(
    () => ({
      ...calendar,
      events: calendar.events.filter(Collection.and<EventModel>(...filters)),
    }),
    [calendar, filters]
  );
}
