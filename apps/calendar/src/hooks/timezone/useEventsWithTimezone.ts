import { useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { createEventCollection } from '@src/controller/base';
import type EventModel from '@src/model/eventModel';
import { customOffsetCalculatorSelector, primaryTimezoneSelector } from '@src/selectors/timezone';
import type Collection from '@src/utils/collection';
import { clone } from '@src/utils/object';
import { isPresent } from '@src/utils/type';

export function useEventsWithTimezone(events: Collection<EventModel>) {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const customOffsetCalculator = useStore(customOffsetCalculatorSelector);

  return useMemo(() => {
    if (primaryTimezoneName === 'Local') {
      return events;
    }

    const hasCustomOffsetCalculator = isPresent(customOffsetCalculator);
    const {
      timedEvents = createEventCollection(),
      totalEvents = createEventCollection(),
    }: Record<'timedEvents' | 'totalEvents', Collection<EventModel>> = events.groupBy(
      (eventModel) => (eventModel.category === 'time' ? 'timedEvents' : 'totalEvents')
    );

    timedEvents.each((eventModel) => {
      const clonedEventModel = clone(eventModel);
      clonedEventModel.start = hasCustomOffsetCalculator
        ? clonedEventModel.start.tz(
            customOffsetCalculator(primaryTimezoneName, eventModel.start.getTime())
          )
        : clonedEventModel.start.tz(primaryTimezoneName);
      clonedEventModel.end = hasCustomOffsetCalculator
        ? clonedEventModel.end.tz(
            customOffsetCalculator(primaryTimezoneName, eventModel.end.getTime())
          )
        : clonedEventModel.end.tz(primaryTimezoneName);
      totalEvents.add(clonedEventModel);
    });

    return totalEvents;
  }, [customOffsetCalculator, events, primaryTimezoneName]);
}
