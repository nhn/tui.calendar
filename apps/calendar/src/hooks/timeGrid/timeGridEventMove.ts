import { useEffect, useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import { isNil, isPresent } from '@src/utils/type';

import { GridPositionFinder, TimeGridData } from '@t/grid';

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const isNotDragging = useStore(isNotDraggingSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');

  const [currentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const shadowEvent = useMemo(() => {
    if (isNil(movingEvent) || isNil(currentGridPos)) {
      return null;
    }

    const { top } = timeGridData.rows[currentGridPos?.rowIndex ?? 0];
    const { left } = timeGridData.columns[currentGridPos?.columnIndex ?? 0];

    const clonedEvent = movingEvent.clone();
    clonedEvent.top = top;
    clonedEvent.left = left;
    clonedEvent.width = 100;

    return clonedEvent;
  }, [movingEvent, timeGridData, currentGridPos]);

  useEffect(() => {
    if (isNotDragging && isPresent(movingEvent) && isPresent(currentGridPos)) {
      // const { rowIndex, columnIndex } = currentGridPos;
      // const eventDuration = movingEvent.duration();
      // const prevStartDate = movingEvent.getStarts();
      //
      clearDraggingEvent();
    }
  }, [clearDraggingEvent, currentGridPos, isNotDragging, movingEvent]);

  return {
    movingEvent: shadowEvent,
  };
}
