import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';

function getEventColIndex(uiModel: EventUIModel, row: TZDate[]) {
  const start = getGridDateIndex(uiModel.getStarts(), row);
  const end = getGridDateIndex(uiModel.getEnds(), row);

  return { start, end };
}

interface Params {
  weekDates: TZDate[];
  gridColWidthMap: string[][];
  gridPositionFinder: GridPositionFinder;
}

export function useAlldayGridRowEventResize({
  weekDates,
  gridColWidthMap,
  gridPositionFinder,
}: Params) {
  const isNotDragging = useStore(isNotDraggingSelector);
  const { updateEvent } = useDispatch('calendar');

  const { draggingEvent: resizingEvent, clearDraggingEvent } = useDraggingEvent(
    'dayGrid',
    'resize'
  );

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos ?? {};

  const targetEventGridIndices = useMemo(() => {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, weekDates);
    }

    return { start: -1, end: -1 };
  }, [weekDates, resizingEvent]);

  const resizingWidth = useMemo(() => {
    if (targetEventGridIndices.start > -1 && isPresent(columnIndex)) {
      return gridColWidthMap[targetEventGridIndices.start][columnIndex];
    }

    return null;
  }, [columnIndex, gridColWidthMap, targetEventGridIndices.start]);

  useEffect(() => {
    const isDraggingEnd = isNotDragging && isPresent(resizingEvent) && isPresent(columnIndex);

    if (isDraggingEnd) {
      const shouldUpdateEvent =
        targetEventGridIndices.start <= columnIndex && targetEventGridIndices.end !== columnIndex;

      if (shouldUpdateEvent) {
        const targetDate = weekDates[columnIndex];

        updateEvent({
          event: resizingEvent.model,
          eventData: { end: targetDate },
        });
      }

      clearCurrentGridPos();
      clearDraggingEvent();
    }
  }, [
    weekDates,
    columnIndex,
    resizingEvent,
    updateEvent,
    clearDraggingEvent,
    targetEventGridIndices,
    clearCurrentGridPos,
    isNotDragging,
  ]);

  return useMemo(
    () => ({
      resizingEvent,
      resizingWidth,
    }),
    [resizingWidth, resizingEvent]
  );
}
