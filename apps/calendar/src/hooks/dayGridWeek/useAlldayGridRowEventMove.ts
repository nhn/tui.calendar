import { useMemo } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import TZDate from '@src/time/date';
import { isNil, isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';
import { CellStyle } from '@t/time/datetime';

interface Params {
  rowStyleInfo: CellStyle[];
  gridPositionFinder: GridPositionFinder;
}

export function useAlldayGridRowEventMove({ rowStyleInfo, gridPositionFinder }: Params) {
  const {
    isDraggingEnd,
    draggingEvent: movingEvent,
    clearDraggingEvent,
  } = useDraggingEvent('dayGrid', 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos ?? {};

  const targetEventStartGridX = useMemo(
    () =>
      isNil(movingEvent) ? null : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left),
    [rowStyleInfo, movingEvent]
  );

  const currentMovingLeft = isNil(columnIndex) ? null : rowStyleInfo[columnIndex].left;

  useWhen(() => {
    const shouldUpdate =
      isPresent(movingEvent) &&
      isPresent(columnIndex) &&
      isPresent(currentMovingLeft) &&
      isPresent(targetEventStartGridX);

    if (shouldUpdate) {
      const dateOffset = columnIndex - targetEventStartGridX;
      const newStartDate = new TZDate(movingEvent.getStarts());
      const newEndDate = new TZDate(movingEvent.getEnds());
      newStartDate.addDate(dateOffset);
      newEndDate.addDate(dateOffset);

      updateEvent({
        event: movingEvent.model,
        eventData: {
          start: newStartDate,
          end: newEndDate,
        },
      });
    }

    clearDraggingEvent();
    clearCurrentGridPos();
  }, isDraggingEnd);

  return useMemo(
    () => ({
      movingEvent,
      movingLeft: currentMovingLeft,
    }),
    [currentMovingLeft, movingEvent]
  );
}
