import { useEffect, useMemo, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isNil, isPresent } from '@src/utils/type';

import { GridPosition, GridPositionFinder, TimeGridData } from '@t/grid';

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const { initX, initY, draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');

  const [currentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);
  const [gridDiff, setGridDiff] = useState<GridPosition | null>(null);

  useEffect(() => {
    if (isPresent(initX) && isPresent(initY) && isPresent(movingEvent)) {
      setInitGridPosition(gridPositionFinder({ clientX: initX, clientY: initY }));
    }
  }, [gridPositionFinder, initX, initY, movingEvent]);

  useEffect(() => {
    if (isPresent(currentGridPos) && isPresent(initGridPosition)) {
      setGridDiff({
        columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
        rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
      });
    }
  }, [currentGridPos, initGridPosition]);

  const rowHeight = timeGridData.rows[0].height;
  const columnWidth = timeGridData.columns[0].width;
  const shadowEvent = useMemo(() => {
    if (isNil(movingEvent) || isNil(gridDiff)) {
      return null;
    }

    const nextTop = movingEvent.top + gridDiff.rowIndex * rowHeight;
    const nextLeft = movingEvent.left + gridDiff.columnIndex * columnWidth;

    const clonedEvent = movingEvent.clone();
    clonedEvent.top = nextTop;
    clonedEvent.left = nextLeft;
    clonedEvent.width = 100;

    return clonedEvent;
  }, [movingEvent, gridDiff, rowHeight, columnWidth]);

  useEffect(() => {
    if (
      draggingState === DraggingState.IDLE &&
      isPresent(movingEvent) &&
      isPresent(currentGridPos)
    ) {
      clearDraggingEvent();
    }
  }, [clearDraggingEvent, currentGridPos, draggingState, movingEvent]);

  return {
    movingEvent: shadowEvent,
  };
}
