import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';

import type { MovingEventShadow } from '@src/components/dayGridMonth/movingEventShadow';
import { useEventBus } from '@src/contexts/eventBus';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

export function useDayGridMonthEventMove({
  dateMatrix,
  rowInfo,
  gridPositionFinder,
  rowIndex,
}: ComponentProps<typeof MovingEventShadow>) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent,
  } = useDraggingEvent('dayGrid', 'move');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const movingEventUIModel = useMemo(() => {
    let shadowEventUIModel = null;

    if (movingEvent && currentGridPos?.rowIndex === rowIndex) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[currentGridPos?.columnIndex ?? 0].left;
      shadowEventUIModel.width = rowInfo[currentGridPos?.columnIndex ?? 0].width;
    }

    return shadowEventUIModel;
  }, [movingEvent, currentGridPos?.rowIndex, currentGridPos?.columnIndex, rowIndex, rowInfo]);

  useWhen(() => {
    const shouldUpdate =
      !isDraggingCanceled && isPresent(movingEventUIModel) && isPresent(currentGridPos);
    if (shouldUpdate) {
      const preStartDate = movingEventUIModel.model.getStarts();
      const eventDuration = movingEventUIModel.duration();
      const currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];

      const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;

      const newStartDate = new TZDate(preStartDate.getTime() + timeOffsetPerDay);
      const newEndDate = new TZDate(newStartDate.getTime() + eventDuration);

      eventBus.fire('beforeUpdateEvent', {
        event: movingEventUIModel.model.toEventObject(),
        changes: {
          start: newStartDate,
          end: newEndDate,
        },
      });
    }

    clearDraggingEvent();
    clearCurrentGridPos();
  }, isDraggingEnd);

  return movingEventUIModel;
}
