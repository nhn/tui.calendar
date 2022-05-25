import { useMemo } from 'preact/hooks';

import { useEventBus } from '@src/contexts/eventBus';
import { getGridDateIndex } from '@src/helpers/grid';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';

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
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingEvent,
    clearDraggingEvent,
  } = useDraggingEvent('dayGrid', 'resize');

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

  useWhen(() => {
    const shouldUpdateEvent =
      !isDraggingCanceled &&
      isPresent(resizingEvent) &&
      isPresent(columnIndex) &&
      targetEventGridIndices.start <= columnIndex &&
      targetEventGridIndices.end !== columnIndex;

    if (shouldUpdateEvent) {
      const targetDate = weekDates[columnIndex];

      eventBus.fire('beforeUpdateEvent', {
        event: resizingEvent.model.toEventObject(),
        changes: { end: targetDate },
      });
    }

    clearCurrentGridPos();
    clearDraggingEvent();
  }, isDraggingEnd);

  return useMemo(
    () => ({
      resizingEvent,
      resizingWidth,
    }),
    [resizingWidth, resizingEvent]
  );
}
