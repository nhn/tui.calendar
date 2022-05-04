import { useMemo } from 'preact/hooks';

import { useEventsWithTimezone } from '@src/hooks/timezone/useEventsWithTimezone';
import type EventModel from '@src/model/eventModel';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';

import type { CalendarData } from '@t/events';

export function useCalendarData(calendar: CalendarData, ...filters: Filter<EventModel>[]) {
  const filteredEvents = useMemo(
    () => calendar.events.filter(Collection.and<EventModel>(...filters)),
    [calendar.events, filters]
  );

  const filteredEventsWithTimezone = useEventsWithTimezone(filteredEvents);

  return useMemo(
    () => ({
      ...calendar,
      events: filteredEventsWithTimezone,
    }),
    [calendar, filteredEventsWithTimezone]
  );
}
