import { useCallback, useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import EventUIModel from '@src/model/eventUIModel';
import { last } from '@src/utils/array';
import { isNil } from '@src/utils/type';

import { EventDragging, EventDraggingArea, EventDraggingBehavior } from '@t/drag';

const getTargetEventId = (
  itemType: string | null,
  area: EventDraggingArea,
  behavior: EventDraggingBehavior
) => {
  function isEventDraggingType(_itemType: string): _itemType is EventDragging {
    return new RegExp(`^event/${area}/${behavior}/\\d+$`).test(_itemType);
  }

  if (isNil(itemType)) {
    return null;
  }

  return isEventDraggingType(itemType) ? last(itemType.split('/')) : null;
};

export function useDraggingEvent(area: EventDraggingArea, behavior: EventDraggingBehavior) {
  const [draggingEvent, setDraggingEvent] = useState<EventUIModel | null>(null);
  const currentDraggingEvent = useStore(
    useCallback(
      (state) => {
        const { draggingItemType, draggingEventUIModel } = state.dnd;
        const targetEventId = getTargetEventId(draggingItemType, area, behavior);

        return Number(targetEventId) === draggingEventUIModel?.model.cid()
          ? draggingEventUIModel
          : null;
      },
      [area, behavior]
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
