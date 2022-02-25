import { useCallback, useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useDndTransientState } from '@src/hooks/dnd/dndTransientState';
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

  useDndTransientState(({ draggingItemType, draggingEventUIModel }) => {
    const targetEventId = getTargetEventId(draggingItemType, area, behavior);
    const hasMatchingTargetEvent = Number(targetEventId) === draggingEventUIModel?.cid();

    if (isNil(draggingEvent) && hasMatchingTargetEvent) {
      setDraggingEvent(draggingEventUIModel);
    }
  });

  const clearDraggingEvent = () => setDraggingEvent(null);

  return {
    draggingEvent,
    clearDraggingEvent,
  };
}
