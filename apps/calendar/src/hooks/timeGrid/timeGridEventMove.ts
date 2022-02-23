import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import type TZDate from '@src/time/date';
import { addMilliseconds, MS_PER_DAY } from '@src/time/datetime';
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
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent, clearDraggingEvent } = useDraggingEvent('timeGrid', 'move');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);
  const [gridDiff, setGridDiff] = useState<GridPosition | null>(null);
  const startDateTimeRef = useRef<TZDate | null>(null);

  // Setting up initial grid position
  useEffect(() => {
    if (isPresent(initX) && isPresent(initY) && isPresent(draggingEvent)) {
      setInitGridPosition(gridPositionFinder({ clientX: initX, clientY: initY }));
      startDateTimeRef.current = draggingEvent.getStarts();
    }
  }, [gridPositionFinder, initX, initY, draggingEvent]);

  // Calculate and update grid diff
  useEffect(() => {
    if (isPresent(currentGridPos) && isPresent(initGridPosition)) {
      setGridDiff({
        columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
        rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
      });
    }
  }, [currentGridPos, initGridPosition]);

  const canCalculate = isPresent(draggingEvent) && isPresent(currentGridPos) && isPresent(gridDiff);

  const nextStartTime = useMemo(() => {
    if (!canCalculate || isNil(startDateTimeRef.current)) {
      return null;
    }

    return addMilliseconds(
      startDateTimeRef.current,
      gridDiff.rowIndex * THIRTY_MINUTES + gridDiff.columnIndex * MS_PER_DAY
    );
  }, [canCalculate, gridDiff]);

  const rowHeight = timeGridData.rows[0].height;
  const movingEvent = useMemo(() => {
    if (!canCalculate) {
      return null;
    }

    const clonedEvent = draggingEvent.clone();
    clonedEvent.top = clonedEvent.top + gridDiff.rowIndex * rowHeight;
    clonedEvent.left = timeGridData.columns[currentGridPos.columnIndex].left;
    clonedEvent.width = timeGridData.columns[currentGridPos.columnIndex].width;

    return clonedEvent;
  }, [canCalculate, currentGridPos, draggingEvent, gridDiff, rowHeight, timeGridData]);

  useEffect(() => {
    if (draggingState === DraggingState.IDLE && canCalculate && isPresent(nextStartTime)) {
      const shouldUpdate = gridDiff.rowIndex !== 0 || gridDiff.columnIndex !== 0;

      if (shouldUpdate) {
        const duration = draggingEvent.duration();
        const nextEndTime = addMilliseconds(nextStartTime, duration);
        updateEvent({
          event: draggingEvent.model,
          eventData: {
            start: nextStartTime,
            end: nextEndTime,
          },
        });
      }

      clearDraggingEvent();
      clearCurrentGridPos();
    }
  }, [
    canCalculate,
    clearCurrentGridPos,
    clearDraggingEvent,
    draggingEvent,
    draggingState,
    gridDiff,
    nextStartTime,
    updateEvent,
  ]);

  return {
    movingEvent,
    nextStartTime,
  };
}
