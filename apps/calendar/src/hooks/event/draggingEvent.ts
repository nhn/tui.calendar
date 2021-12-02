import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import EventUIModel from '@src/model/eventUIModel';
import { isNil } from '@src/utils/type';

import { EventDragging } from '@t/drag';

function isEventDraggingType(itemType: string): itemType is EventDragging {
  return /^event\/(move|resize)\/\d+$/.test(itemType);
}

const getTargetEventId = (itemType: string | null) => {
  if (isNil(itemType)) {
    return null;
  }

  return isEventDraggingType(itemType) ? itemType.split('/')[2] : null;
};

export function useDraggingEvent(events: EventUIModel[]) {
  return useStore(
    useCallback(
      (state) => {
        const { draggingItemType } = state.dnd;
        const targetEventId = getTargetEventId(draggingItemType);

        if (isNil(targetEventId)) {
          return null;
        }

        return events.find((event) => event.cid() === Number(targetEventId)) ?? null;
      },
      [events]
    )
  );
}
