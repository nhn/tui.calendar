import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { CellStyle } from '@t/time/datetime';

interface Params {
  rowStyleInfo: CellStyle[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useAlldayGridRowEventMove({ rowStyleInfo, mousePositionDataGrabber }: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridX, setCurrentGridX] = useState<number | null>(null);

  const hasDraggingCoords = !isNil(x) && !isNil(y);

  useEffect(() => {
    if (!isNil(movingEvent) && hasDraggingCoords) {
      const posData = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      setCurrentGridX(posData?.gridX ?? null);
    }
  }, [hasDraggingCoords, mousePositionDataGrabber, movingEvent, x, y]);

  const targetEventStartGridX = isNil(movingEvent)
    ? null
    : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left);

  const currentMovingLeft = isNil(currentGridX) ? null : rowStyleInfo[currentGridX].left;

  useEffect(() => {
    const shouldUpdate =
      draggingState === DraggingState.IDLE &&
      !isNil(movingEvent) &&
      !isNil(currentGridX) &&
      !isNil(currentMovingLeft) &&
      !isNil(targetEventStartGridX);

    if (shouldUpdate) {
      const dateOffset = currentGridX - targetEventStartGridX;
      let newStartDate = new TZDate(movingEvent.getStarts());
      let newEndDate = new TZDate(movingEvent.getEnds());
      newStartDate = newStartDate.addDate(dateOffset);
      newEndDate = newEndDate.addDate(dateOffset);

      updateEvent({
        event: movingEvent.model,
        eventData: {
          start: newStartDate,
          end: newEndDate,
        },
      });
      clearDraggingEvent();
    }
  }, [
    currentGridX,
    currentMovingLeft,
    movingEvent,
    targetEventStartGridX,
    updateEvent,
    clearDraggingEvent,
    draggingState,
  ]);

  return useMemo(
    () => ({
      movingEvent,
      movingLeft: currentMovingLeft,
    }),
    [currentMovingLeft, movingEvent]
  );
}
