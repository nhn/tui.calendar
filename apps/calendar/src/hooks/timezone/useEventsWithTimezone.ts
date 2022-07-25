import { useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { createEventCollection } from '@src/controller/base';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import type EventModel from '@src/model/eventModel';
import { primaryTimezoneSelector } from '@src/selectors/timezone';
import TZDate from '@src/time/date';
import { isUsingDST } from '@src/time/timezone';
import type Collection from '@src/utils/collection';
import { clone } from '@src/utils/object';

export function useEventsWithTimezone(events: Collection<EventModel>) {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();

  return useMemo(() => {
    if (primaryTimezoneName === 'Local') {
      return events;
    }

    const isSystemUsingDST = isUsingDST(new TZDate());
    const {
      timedEvents = createEventCollection(),
      totalEvents = createEventCollection(),
    }: Record<'timedEvents' | 'totalEvents', Collection<EventModel>> = events.groupBy(
      (eventModel) => (eventModel.category === 'time' ? 'timedEvents' : 'totalEvents')
    );

    timedEvents.each((eventModel) => {
      const clonedEventModel = clone(eventModel);

      let zonedStart = tzConverter(primaryTimezoneName, clonedEventModel.start);
      let zonedEnd = tzConverter(primaryTimezoneName, clonedEventModel.end);

      // Adjust the start and end time to the system timezone.
      if (isSystemUsingDST) {
        if (!isUsingDST(zonedStart)) {
          zonedStart = zonedStart.addHours(1);
        }
        if (!isUsingDST(zonedEnd)) {
          zonedEnd = zonedEnd.addHours(1);
        }
      } else {
        if (isUsingDST(zonedStart)) {
          zonedStart = zonedStart.addHours(-1);
        }
        if (isUsingDST(zonedEnd)) {
          zonedEnd = zonedEnd.addHours(-1);
        }
      }

      clonedEventModel.start = zonedStart;
      clonedEventModel.end = zonedEnd;

      totalEvents.add(clonedEventModel);
    });

    return totalEvents;
  }, [events, primaryTimezoneName, tzConverter]);
}
