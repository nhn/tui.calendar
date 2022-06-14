import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { addMilliseconds, MS_PER_DAY, MS_PER_THIRTY_MINUTES } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import type { GridPosition, GridPositionFinder, TimeGridData } from '@t/grid';
import type { CalendarState } from '@t/store';

const THIRTY_MINUTES = 30;

const initXSelector = (state: CalendarState) => state.dnd.initX;
const initYSelector = (state: CalendarState) => state.dnd.initY;
function useDragInitCoords() {
  const initX = useStore(initXSelector);
  const initY = useStore(initYSelector);

  return useMemo(() => ({ initX, initY }), [initX, initY]);
}

function getCurrentIndexByTime(time: TZDate) {
  const hour = time.getHours();
  const minutes = time.getMinutes();

  return hour * 2 + Math.floor(minutes / THIRTY_MINUTES);
}

function getMovingEventPosition({
  draggingEvent,
  columnDiff,
  rowDiff,
  timeGridDataRows,
  currentDate,
}: {
  draggingEvent: EventUIModel;
  columnDiff: number;
  rowDiff: number;
  timeGridDataRows: TimeGridData['rows'];
  currentDate: TZDate;
}) {
  const rowHeight = timeGridDataRows[0].height;
  const maxHeight = rowHeight * timeGridDataRows.length;
  const millisecondsDiff = rowDiff * MS_PER_THIRTY_MINUTES + columnDiff * MS_PER_DAY;

  const nextStart = addMilliseconds(draggingEvent.getStarts(), millisecondsDiff);
  const nextEnd = addMilliseconds(draggingEvent.getEnds(), millisecondsDiff);
  const startIndex = getCurrentIndexByTime(nextStart);
  const endIndex = getCurrentIndexByTime(nextEnd);

  const isStartAtPrevDate = nextStart.getDate() < currentDate.getDate();
  const isEndAtNextDate = nextEnd.getDate() > currentDate.getDate();
  const indexDiff = endIndex - (isStartAtPrevDate ? 0 : startIndex);

  const top = isStartAtPrevDate ? 0 : timeGridDataRows[startIndex].top;
  const height = isEndAtNextDate ? maxHeight : indexDiff * rowHeight;

  return { top, height };
}

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const eventBus = useEventBus();
  const { isDraggingEnd, isDraggingCanceled, draggingEvent, clearDraggingEvent } = useDraggingEvent(
    'timeGrid',
    'move'
  );

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

  const movingEvent = useMemo(() => {
    if (isNil(draggingEvent) || isNil(currentGridPos) || isNil(initGridPosition)) {
      return null;
    }

    const clonedEvent = draggingEvent.clone();
    const { top, height } = getMovingEventPosition({
      draggingEvent: clonedEvent,
      columnDiff: currentGridPos.columnIndex - initGridPosition.columnIndex,
      rowDiff: currentGridPos.rowIndex - initGridPosition.rowIndex,
      timeGridDataRows: timeGridData.rows,
      currentDate: timeGridData.columns[currentGridPos.columnIndex].date,
    });

    clonedEvent.setUIProps({
      left: timeGridData.columns[currentGridPos.columnIndex].left,
      width: timeGridData.columns[currentGridPos.columnIndex].width,
      top,
      height,
    });

    return clonedEvent;
  }, [currentGridPos, draggingEvent, initGridPosition, timeGridData.columns, timeGridData.rows]);

  useWhen(() => {
    const shouldUpdate =
      !isDraggingCanceled &&
      isPresent(draggingEvent) &&
      isPresent(currentGridPos) &&
      isPresent(gridDiff) &&
      isPresent(nextStartTime) &&
      (gridDiff.rowIndex !== 0 || gridDiff.columnIndex !== 0);
    if (shouldUpdate) {
      const duration = draggingEvent.duration();
      const nextEndTime = addMilliseconds(nextStartTime, duration);

      eventBus.fire('beforeUpdateEvent', {
        event: draggingEvent.model.toEventObject(),
        changes: {
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
