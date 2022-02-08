import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import { CellStyle } from '@t/time/datetime';

interface Params {
  dateMatrix: TZDate[][];
  rowInfo: CellStyle[];
  mousePositionDataGrabber: MousePositionDataGrabber;
}

export function useDayGridMonthEventMove({
  dateMatrix,
  rowInfo,
  mousePositionDataGrabber,
}: Params) {
  const { draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos] = useCurrentPointerPositionInGrid(mousePositionDataGrabber);

  const shadowEvent = useMemo(() => {
    let shadowEventUIModel = null;
    if (movingEvent) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[currentGridPos?.x ?? 0].left;
      shadowEventUIModel.width = rowInfo[currentGridPos?.x ?? 0].width;
    }

    return shadowEventUIModel;
  }, [currentGridPos?.x, rowInfo, movingEvent]);

  useEffect(() => {
    const shouldUpdate =
      draggingState === DraggingState.IDLE && isPresent(movingEvent) && isPresent(currentGridPos);

    if (shouldUpdate) {
      const preStartDate = movingEvent.model.getStarts();
      const eventDuration = movingEvent.duration();
      const currentDate = dateMatrix[currentGridPos.y][currentGridPos.x];

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
    }
  }, [dateMatrix, clearDraggingEvent, currentGridPos, draggingState, movingEvent, updateEvent]);

  return {
    movingEvent: shadowEvent,
    currentGridPos,
  };
}
