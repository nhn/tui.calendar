import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import { dndSelector } from '@src/selectors';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import type TZDate from '@src/time/date';
import { addMilliseconds, MS_PER_DAY, MS_PER_THIRTY_MINUTES } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import { GridPosition, GridPositionFinder, TimeGridData } from '@t/grid';

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

  const clearState = useCallback(() => {
    clearCurrentGridPos();
    clearDraggingEvent();
    setGridDiff(null);
    startDateTimeRef.current = null;
    initGridPositionRef.current = null;
  }, [clearCurrentGridPos, clearDraggingEvent]);

  // Setting up initial grid position
  useTransientUpdate(dndSelector, ({ initX, initY }) => {
    if (
      isPresent(initX) &&
      isPresent(initY) &&
      isPresent(draggingEvent) &&
      isNil(initGridPositionRef.current)
    ) {
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

  const nextStartTime = useMemo(() => {
    if (isNil(gridDiff) || isNil(startDateTimeRef.current)) {
      return null;
    }

    return addMilliseconds(
      startDateTimeRef.current,
      gridDiff.rowIndex * MS_PER_THIRTY_MINUTES + gridDiff.columnIndex * MS_PER_DAY
    );
  }, [gridDiff]);

  const rowHeight = timeGridData.rows[0].height;
  const movingEvent = useMemo(() => {
    if (isNil(draggingEvent) || isNil(gridDiff) || isNil(currentGridPos)) {
      return null;
    }

    const clonedEvent = draggingEvent.clone();
    clonedEvent.setUIProps({
      top: clonedEvent.top + gridDiff.rowIndex * rowHeight,
      left: timeGridData.columns[currentGridPos.columnIndex].left,
      width: timeGridData.columns[currentGridPos.columnIndex].width,
    });

    return clonedEvent;
  }, [currentGridPos, draggingEvent, gridDiff, rowHeight, timeGridData.columns]);

  const isDraggingEnd = isNotDragging && isPresent(draggingEvent);
  const shouldUpdate =
    isDraggingEnd &&
    isPresent(currentGridPos) &&
    isPresent(gridDiff) &&
    isPresent(nextStartTime) &&
    (gridDiff.rowIndex !== 0 || gridDiff.columnIndex !== 0);
  useEffect(() => {
    if (isDraggingEnd) {
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

      clearState();
    }
  }, [clearState, draggingEvent, isDraggingEnd, nextStartTime, shouldUpdate, updateEvent]);

  return {
    movingEvent,
    nextStartTime,
  };
}
