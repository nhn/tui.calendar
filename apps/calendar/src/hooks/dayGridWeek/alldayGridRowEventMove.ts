import { useCallback, useEffect } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isSame } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

import { Cells } from '@t/panel';

interface Params {
  events: EventUIModel[];
  cells: Cells;
  gridInfo: GridInfo[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useAlldayGridRowEventMove({
  events,
  cells,
  gridInfo,
  mousePositionDataGrabber,
}: Params) {
  const targetEvent = useDraggingEvent(events, 'move');
  const {
    dnd: { reset },
    calendar: { updateEvent },
  } = useDispatch(['dnd', 'calendar']);
  const isDraggingEnd = useStore(
    useCallback((state) => state.dnd.draggingState === DraggingState.END_DRAG, [])
  );
  const currentGridX = useStore(
    useCallback(
      ({ dnd }) => {
        if (!targetEvent || isNil(dnd.x) || isNil(dnd.y)) {
          return null;
        }

        const posData = mousePositionDataGrabber({
          clientX: dnd.x,
          clientY: dnd.y,
        } as MouseEvent);
        if (isNil(posData)) {
          return null;
        }

        return posData.gridX;
      },
      [mousePositionDataGrabber, targetEvent]
    )
  );

  const targetEventStartGridX = isNil(targetEvent)
    ? null
    : cells.findIndex((cell) => isSame(cell, targetEvent.getStarts()));
  const currentMovingLeft = isNil(currentGridX) ? null : gridInfo[currentGridX].left;

  useEffect(() => {
    const shouldUpdate =
      !isNil(targetEvent) &&
      !isNil(currentGridX) &&
      !isNil(currentMovingLeft) &&
      !isNil(targetEventStartGridX) &&
      isDraggingEnd;

    if (shouldUpdate) {
      const dateOffset = currentGridX - targetEventStartGridX;
      let newStartDate = new TZDate(targetEvent.getStarts());
      let newEndDate = new TZDate(targetEvent.getEnds());
      newStartDate = newStartDate.addDate(dateOffset);
      newEndDate = newEndDate.addDate(dateOffset);

      updateEvent({
        event: targetEvent.model,
        eventData: {
          start: newStartDate,
          end: newEndDate,
        },
      });
      reset();
    }
  }, [
    currentGridX,
    currentMovingLeft,
    isDraggingEnd,
    reset,
    targetEvent,
    targetEventStartGridX,
    updateEvent,
  ]);

  return {
    moveTargetEvent: targetEvent,
    movingLeft: currentMovingLeft,
  };
}
