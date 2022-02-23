import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { MS_PER_DAY } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import { GridPosition, GridPositionFinder, TimeGridData } from '@t/grid';

const THIRTY_MINUTES = 30 * 60 * 1000;

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const { initX, initY, draggingState } = useStore(dndSelector);
  const { draggingEvent, clearDraggingEvent } = useDraggingEvent('timeGrid', 'move');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);
  const [gridDiff, setGridDiff] = useState<GridPosition | null>(null);
  const startDateTimeRef = useRef<TZDate | null>(null);

  useEffect(() => {
    if (isPresent(initX) && isPresent(initY) && isPresent(draggingEvent)) {
      setInitGridPosition(gridPositionFinder({ clientX: initX, clientY: initY }));
      startDateTimeRef.current = draggingEvent.getStarts();
    }
  }, [gridPositionFinder, initX, initY, draggingEvent]);

  useEffect(() => {
    if (isPresent(currentGridPos) && isPresent(initGridPosition)) {
      setGridDiff({
        columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
        rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
      });
    }
  }, [currentGridPos, initGridPosition]);

  const nextStartTime = useMemo(() => {
    if (isNil(gridDiff) || isNil(draggingEvent) || isNil(startDateTimeRef.current)) {
      return null;
    }

    return new TZDate(
      startDateTimeRef.current.getTime() +
        gridDiff.rowIndex * THIRTY_MINUTES +
        gridDiff.columnIndex * MS_PER_DAY
    );
  }, [draggingEvent, gridDiff]);

  const rowHeight = timeGridData.rows[0].height;
  const movingEvent = useMemo(() => {
    if (isNil(draggingEvent) || isNil(gridDiff) || isNil(currentGridPos)) {
      return null;
    }

    const clonedEvent = draggingEvent.clone();
    clonedEvent.top = clonedEvent.top + gridDiff.rowIndex * rowHeight;
    clonedEvent.left = timeGridData.columns[currentGridPos.columnIndex].left;
    clonedEvent.width = timeGridData.columns[currentGridPos.columnIndex].width;

    return clonedEvent;
  }, [draggingEvent, gridDiff, currentGridPos, rowHeight, timeGridData]);

  useEffect(() => {
    if (
      draggingState === DraggingState.IDLE &&
      isPresent(movingEvent) &&
      isPresent(currentGridPos)
    ) {
      clearDraggingEvent();
      clearCurrentGridPos();
    }
  }, [clearCurrentGridPos, clearDraggingEvent, currentGridPos, draggingState, movingEvent]);

  return {
    movingEvent,
    nextStartTime,
  };
}
