import { useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { getDateDifference, MS_PER_DAY } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import { Cells } from '@t/panel';

interface Params {
  events: EventUIModel[];
  cells: Cells[];
  gridInfo: GridInfo[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useDayGridMonthEventMove({
  events,
  cells,
  gridInfo,
  mousePositionDataGrabber,
}: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent(events, 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, setCurrentGridPos] = useState<{ x: number; y: number } | null>(null);

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
      const currentDate = cells[currentGridPos.y][currentGridPos.x];

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
  }, [cells, clearDraggingEvent, currentGridPos, draggingState, movingEvent, updateEvent]);

  let shadowEventUIModel = null;
  if (movingEvent) {
    shadowEventUIModel = EventUIModel.create(movingEvent?.model);
    shadowEventUIModel.top = 1;
    shadowEventUIModel.left = gridInfo[currentGridPos?.x ?? 0].left;
    shadowEventUIModel.width = gridInfo[currentGridPos?.x ?? 0].width;
  }

  return {
    movingEvent: shadowEventUIModel,
    currentGridPos,
  };
}
