import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isNil, isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';
import { CellStyle } from '@t/time/datetime';

interface Params {
  rowStyleInfo: CellStyle[];
  gridPositionFinder: GridPositionFinder;
}

export function useAlldayGridRowEventMove({ rowStyleInfo, gridPositionFinder }: Params) {
  const { draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('dayGrid', 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos ?? {};

  const targetEventStartGridX = useMemo(
    () =>
      isNil(movingEvent) ? null : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left),
    [rowStyleInfo, movingEvent]
  );

  const currentMovingLeft = isNil(columnIndex) ? null : rowStyleInfo[columnIndex].left;

  useEffect(() => {
    const shouldUpdate =
      draggingState === DraggingState.IDLE &&
      isPresent(movingEvent) &&
      isPresent(columnIndex) &&
      isPresent(currentMovingLeft) &&
      isPresent(targetEventStartGridX);

    if (shouldUpdate) {
      const dateOffset = columnIndex - targetEventStartGridX;
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
    columnIndex,
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
