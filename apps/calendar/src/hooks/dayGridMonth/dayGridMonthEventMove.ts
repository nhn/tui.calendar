import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';
import { CellStyle } from '@t/time/datetime';

interface Params {
  dateMatrix: TZDate[][];
  rowInfo: CellStyle[];
  gridPositionFinder: GridPositionFinder;
}

export function useDayGridMonthEventMove({ dateMatrix, rowInfo, gridPositionFinder }: Params) {
  const isNotDragging = useStore(isNotDraggingSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('dayGrid', 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

  const shadowEvent = useMemo(() => {
    let shadowEventUIModel = null;
    if (movingEvent) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[currentGridPos?.columnIndex ?? 0].left;
      shadowEventUIModel.width = rowInfo[currentGridPos?.columnIndex ?? 0].width;
    }

    return shadowEventUIModel;
  }, [currentGridPos?.columnIndex, rowInfo, movingEvent]);

  useEffect(() => {
    const shouldUpdate = isNotDragging && isPresent(movingEvent) && isPresent(currentGridPos);

    if (shouldUpdate) {
      const preStartDate = movingEvent.model.getStarts();
      const eventDuration = movingEvent.duration();
      const currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];

      const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;

      const newStartDate = new TZDate(preStartDate.getTime() + timeOffsetPerDay);
      const newEndDate = new TZDate(newStartDate.getTime() + eventDuration);

      updateEvent({
        event: movingEvent.model,
        eventData: {
          start: newStartDate,
          end: newEndDate,
        },
      });

      clearDraggingEvent();
      clearCurrentGridPos();
    }
  }, [
    dateMatrix,
    clearDraggingEvent,
    currentGridPos,
    isNotDragging,
    movingEvent,
    updateEvent,
    clearCurrentGridPos,
  ]);

  return {
    movingEvent: shadowEvent,
    currentGridPos,
  };
}
