import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isNil, isPresent } from '@src/utils/type';

import { CellStyle } from '@t/time/datetime';

interface Params {
  rowStyleInfo: CellStyle[];
  mousePositionDataGrabber: MousePositionDataGrabber;
}

export function useAlldayGridRowEventMove({ rowStyleInfo, mousePositionDataGrabber }: Params) {
  const { draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, clearCurrentGridPos] =
    useCurrentPointerPositionInGrid(mousePositionDataGrabber);
  const { x: currentGridX } = currentGridPos ?? {};

  const targetEventStartGridX = useMemo(
    () =>
      isNil(movingEvent) ? null : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left),
    [rowStyleInfo, movingEvent]
  );

  const currentMovingLeft = isNil(currentGridX) ? null : rowStyleInfo[currentGridX].left;

  useEffect(() => {
    const shouldUpdate =
      draggingState === DraggingState.IDLE &&
      isPresent(movingEvent) &&
      isPresent(currentGridX) &&
      isPresent(currentMovingLeft) &&
      isPresent(targetEventStartGridX);

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

      clearCurrentGridPos();
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
    clearCurrentGridPos,
  ]);

  return useMemo(
    () => ({
      movingEvent,
      movingLeft: currentMovingLeft,
    }),
    [currentMovingLeft, movingEvent]
  );
}
