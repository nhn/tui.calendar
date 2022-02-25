import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDndTransientState } from '@src/hooks/dnd/dndTransientState';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { isNotDraggingSelector } from '@src/selectors/dnd';
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
  const isNotDragging = useStore(isNotDraggingSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent, clearDraggingEvent } = useDraggingEvent('timeGrid', 'move');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const [gridDiff, setGridDiff] = useState<GridPosition | null>(null);
  const startDateTimeRef = useRef<TZDate | null>(null);
  const initGridPositionRef = useRef<GridPosition | null>(null);

  // Setting up initial grid position
  useDndTransientState(({ initX, initY }) => {
    if (isPresent(initX) && isPresent(initY) && isPresent(draggingEvent)) {
      initGridPositionRef.current = gridPositionFinder({
        clientX: initX,
        clientY: initY,
      });
      startDateTimeRef.current = draggingEvent.getStarts();
    }
  });

  // Calculate and update grid diff
  useEffect(() => {
    if (isPresent(currentGridPos) && isPresent(initGridPositionRef.current)) {
      setGridDiff({
        columnIndex: currentGridPos.columnIndex - initGridPositionRef.current.columnIndex,
        rowIndex: currentGridPos.rowIndex - initGridPositionRef.current.rowIndex,
      });
    }
  }, [currentGridPos]);

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
    if (isNotDragging && canCalculate && isPresent(nextStartTime)) {
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
    isNotDragging,
    gridDiff,
    nextStartTime,
    updateEvent,
  ]);

  return {
    movingEvent,
    nextStartTime,
  };
}
