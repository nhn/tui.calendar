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

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

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
  const movingEventTop = useMemo(() => {
    if (isNil(movingEvent) || isNil(gridDiff)) {
      return null;
    }

    return movingEvent.top + gridDiff.rowIndex * rowHeight;
  }, [movingEvent, gridDiff, rowHeight]);

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
    movingEventTop,
    movingEventColumnIndex: currentGridPos?.columnIndex ?? -1,
  };
}
