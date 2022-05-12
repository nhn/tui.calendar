import { useState } from 'preact/hooks';

import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import type EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { last } from '@src/utils/array';
import { isNil, isPresent } from '@src/utils/type';

import type { EventDragging, EventDraggingArea, EventDraggingBehavior } from '@t/drag';

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
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [isDraggingCanceled, setIsDraggingCanceled] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState<EventUIModel | null>(null);

  useTransientUpdate(dndSelector, ({ draggingItemType, draggingEventUIModel, draggingState }) => {
    const targetEventId = getTargetEventId(draggingItemType, area, behavior);
    const hasMatchingTargetEvent = Number(targetEventId) === draggingEventUIModel?.cid();
    const isIdle = draggingState === DraggingState.IDLE;
    const isCanceled = draggingState === DraggingState.CANCELED;

    if (isNil(draggingEvent) && hasMatchingTargetEvent) {
      setDraggingEvent(draggingEventUIModel);
    }

    if (isPresent(draggingEvent) && (isIdle || isCanceled)) {
      setIsDraggingEnd(true);
      setIsDraggingCanceled(isCanceled);
    }
  });

  const clearDraggingEvent = () => {
    setDraggingEvent(null);
    setIsDraggingEnd(false);
    setIsDraggingCanceled(false);
  };

  return {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent,
    clearDraggingEvent,
  };
}
