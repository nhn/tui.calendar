import type { ComponentProps } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';

import type { MovingEventShadow } from '@src/components/dayGridMonth/movingEventShadow';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

export function useDayGridMonthEventMove({
  dateMatrix,
  rowInfo,
  gridPositionFinder,
  rowIndex,
}: ComponentProps<typeof MovingEventShadow>) {
  const isNotDragging = useStore(isNotDraggingSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('dayGrid', 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const movingEventUIModel = useMemo(() => {
    let shadowEventUIModel = null;

    if (movingEvent && currentGridPos?.rowIndex === rowIndex) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[currentGridPos?.columnIndex ?? 0].left;
      shadowEventUIModel.width = rowInfo[currentGridPos?.columnIndex ?? 0].width;
    }

    return shadowEventUIModel;
  }, [movingEvent, currentGridPos?.rowIndex, currentGridPos?.columnIndex, rowIndex, rowInfo]);

  useEffect(() => {
    const isDraggingEnd = isNotDragging && isPresent(movingEvent);
    const shouldUpdate = isDraggingEnd && isPresent(currentGridPos);

    if (isDraggingEnd) {
      if (shouldUpdate) {
        const preStartDate = movingEvent.model.getStarts();
        const eventDuration = movingEvent.duration();
        const currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];

        const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;

        const newStartDate = new TZDate(preStartDate.getTime() + timeOffsetPerDay);
        const newEndDate = new TZDate(newStartDate.getTime() + eventDuration);

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
    }
  }, [
    dateMatrix,
    clearDraggingEvent,
    currentGridPos,
    isNotDragging,
    movingEvent,
    updateEvent,
    clearCurrentGridPos,
  ]);

  return movingEventUIModel;
}
