import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import type TZDate from '@src/time/date';
import { addMilliseconds, MS_PER_DAY, MS_PER_THIRTY_MINUTES } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import { GridPosition, GridPositionFinder, TimeGridData } from '@t/grid';
import { CalendarState } from '@t/store';

const initXSelector = (state: CalendarState) => state.dnd.initX;
const initYSelector = (state: CalendarState) => state.dnd.initY;
function useDragInitCoords() {
  const initX = useStore(initXSelector);
  const initY = useStore(initYSelector);

  return useMemo(() => ({ initX, initY }), [initX, initY]);
}

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const { updateEvent } = useDispatch('calendar');
  const { isDraggingEnd, draggingEvent, clearDraggingEvent } = useDraggingEvent('timeGrid', 'move');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { initX, initY } = useDragInitCoords();

  const [gridDiff, setGridDiff] = useState<GridPosition | null>(null);
  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);
  const [startDateTime, setStartDateTime] = useState<TZDate | null>(null);

  const clearState = useCallback(() => {
    clearCurrentGridPos();
    clearDraggingEvent();
    setGridDiff(null);
    setStartDateTime(null);
    setInitGridPosition(null);
  }, [clearCurrentGridPos, clearDraggingEvent]);

  // Setting up initial grid position & start date time
  useEffect(() => {
    if (isPresent(initX) && isPresent(initY)) {
      setInitGridPosition(
        gridPositionFinder({
          clientX: initX as number,
          clientY: initY as number,
        })
      );
    }
  }, [initX, initY, gridPositionFinder]);

  useEffect(() => {
    if (isPresent(draggingEvent) && isNil(startDateTime)) {
      setStartDateTime(draggingEvent.getStarts());
    }
  }, [draggingEvent, startDateTime]);

  // Calculate and update grid diff
  useEffect(() => {
    if (isPresent(currentGridPos) && isPresent(initGridPosition)) {
      setGridDiff({
        columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
        rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
      });
    }
  }, [currentGridPos, initGridPosition]);

  const nextStartTime = useMemo(() => {
    if (isNil(gridDiff) || isNil(startDateTime)) {
      return null;
    }

    return addMilliseconds(
      startDateTime,
      gridDiff.rowIndex * MS_PER_THIRTY_MINUTES + gridDiff.columnIndex * MS_PER_DAY
    );
  }, [gridDiff, startDateTime]);

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

  useWhen(() => {
    const shouldUpdate =
      isPresent(draggingEvent) &&
      isPresent(currentGridPos) &&
      isPresent(gridDiff) &&
      isPresent(nextStartTime) &&
      (gridDiff.rowIndex !== 0 || gridDiff.columnIndex !== 0);
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
  }, isDraggingEnd);

  return {
    movingEvent,
    nextStartTime,
  };
}
