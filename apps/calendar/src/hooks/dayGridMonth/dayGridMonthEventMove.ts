import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import { CellStyleInfo } from '@t/time/datetime';

interface Params {
  dateMatrix: TZDate[][];
  rowInfo: CellStyleInfo[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useDayGridMonthEventMove({
  dateMatrix,
  rowInfo,
  mousePositionDataGrabber,
}: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, setCurrentGridPos] = useState<{ x: number; y: number } | null>(null);
  const shadowEvent = useMemo(() => {
    let shadowEventUIModel = null;
    if (movingEvent) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[currentGridPos?.x ?? 0].left;
      shadowEventUIModel.width = rowInfo[currentGridPos?.x ?? 0].width;
    }

    return shadowEventUIModel;
  }, [currentGridPos?.x, rowInfo, movingEvent]);

  const dragStartEventRef = useRef<EventUIModel | null>(null);
  useEffect(() => {
    dragStartEventRef.current = movingEvent ?? null;
  }, [movingEvent]);

  useEffect(() => {
    const hasDraggingCoords = isPresent(x) && isPresent(y);

    if (isPresent(movingEvent) && hasDraggingCoords) {
      const pos = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      if (pos) {
        setCurrentGridPos({ x: pos.gridX, y: pos.gridY });
      }
    }
  }, [mousePositionDataGrabber, movingEvent, x, y]);

  useEffect(() => {
    const dragStartEventUIModel = dragStartEventRef.current;
    const shouldUpdate =
      draggingState === DraggingState.IDLE &&
      isPresent(movingEvent) &&
      isPresent(currentGridPos) &&
      isPresent(dragStartEventUIModel);

    if (shouldUpdate) {
      const preStartDate = dragStartEventUIModel.model.getStarts();
      const eventDuration = dragStartEventUIModel.duration();
      const currentDate = dateMatrix[currentGridPos.y][currentGridPos.x];

      const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;

      const newStartDate = new TZDate(preStartDate.getTime() + timeOffsetPerDay);
      const newEndDate = new TZDate(newStartDate.getTime() + eventDuration);

      updateEvent({
        event: dragStartEventUIModel.model,
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
