import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import { GridPositionFinder } from '@src/helpers/view';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

function getEventColIndex(uiModel: EventUIModel, row: TZDate[]) {
  const start = getGridDateIndex(uiModel.getStarts(), row);
  const end = getGridDateIndex(uiModel.getEnds(), row);

  return { start, end };
}

interface Params {
  row: TZDate[];
  gridColWidthMap: string[][];
  gridPositionFinder: GridPositionFinder;
}

export function useAlldayGridRowEventResize({ row, gridColWidthMap, gridPositionFinder }: Params) {
  const { draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');

  const { draggingEvent: resizingEvent, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { x: currentGridX } = currentGridPos ?? {};

  const targetEventGridIndices = useMemo(() => {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, row);
    }

    return { start: -1, end: -1 };
  }, [row, resizingEvent]);

  const resizingWidth = useMemo(() => {
    if (targetEventGridIndices.start > -1 && isPresent(currentGridX)) {
      return gridColWidthMap[targetEventGridIndices.start][currentGridX];
    }

    return null;
  }, [currentGridX, gridColWidthMap, targetEventGridIndices.start]);

  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE && isPresent(resizingEvent) && isPresent(currentGridX);

    if (isDraggingEnd) {
      const shouldUpdateEvent =
        targetEventGridIndices.start <= currentGridX && targetEventGridIndices.end !== currentGridX;

      if (shouldUpdateEvent) {
        const targetDate = row[currentGridX];

        updateEvent({
          event: resizingEvent.model,
          eventData: { end: targetDate },
        });
      }
      clearCurrentGridPos();
      clearDraggingEvent();
    }
  }, [
    row,
    currentGridX,
    resizingEvent,
    updateEvent,
    clearDraggingEvent,
    targetEventGridIndices.start,
    targetEventGridIndices.end,
    draggingState,
    clearCurrentGridPos,
  ]);

  return useMemo(
    () => ({
      resizingEvent,
      resizingWidth,
    }),
    [resizingWidth, resizingEvent]
  );
}
