import { useCallback, useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import EventUIModel from '@src/model/eventUIModel';
import { isNil } from '@src/utils/type';

import { EventDragging, EventDraggingBehavior } from '@t/drag';

const getTargetEventId = (itemType: string | null, behavior: EventDraggingBehavior) => {
  function isEventDraggingType(_itemType: string): _itemType is EventDragging {
    return new RegExp(`^event/${behavior}/\\d+$`).test(_itemType);
  }

  if (isNil(itemType)) {
    return null;
  }

  return isEventDraggingType(itemType) ? itemType.split('/')[2] : null;
};

export function useDraggingEvent(events: EventUIModel[], behavior: EventDraggingBehavior) {
  const [draggingEvent, setDraggingEvent] = useState<EventUIModel | null>(null);
  const currentDraggingEvent = useStore(
    useCallback(
      (state) => {
        const { draggingItemType } = state.dnd;
        const targetEventId = getTargetEventId(draggingItemType, behavior);

        if (isNil(targetEventId)) {
          return null;
        }

        return events.find((event) => event.cid() === Number(targetEventId)) ?? null;
      },
      [behavior, events]
    )
  );

  const clearDraggingEvent = () => setDraggingEvent(null);

  useEffect(() => {
    if (isNil(draggingEvent) && !isNil(currentDraggingEvent)) {
      setDraggingEvent(currentDraggingEvent);
    }
  }, [currentDraggingEvent, draggingEvent]);

  return {
    draggingEvent,
    clearDraggingEvent,
  };
}
