import { useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { createEventCollection } from '@src/controller/base';
import type EventModel from '@src/model/eventModel';
import { primaryTimezoneSelector } from '@src/selectors/timezone';
import type Collection from '@src/utils/collection';
import { clone } from '@src/utils/object';

export function useEventsWithTimezone(events: Collection<EventModel>) {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);

  return useMemo(() => {
    if (primaryTimezoneName === 'Local') {
      return events;
    }

    const {
      timedEvents = createEventCollection(),
      totalEvents = createEventCollection(),
    }: Record<'timedEvents' | 'totalEvents', Collection<EventModel>> = events.groupBy(
      (eventModel) => (eventModel.category === 'time' ? 'timedEvents' : 'totalEvents')
    );

    timedEvents.each((eventModel) => {
      const clonedEventModel = clone(eventModel);
      clonedEventModel.start = clonedEventModel.start.tz(primaryTimezoneName);
      clonedEventModel.end = clonedEventModel.end.tz(primaryTimezoneName);
      totalEvents.add(clonedEventModel);
    });

    return totalEvents;
  }, [events, primaryTimezoneName]);
}
