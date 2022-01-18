import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
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
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useAlldayGridRowEventResize({
  row,
  gridColWidthMap,
  mousePositionDataGrabber,
}: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');

  const { draggingEvent: resizingEvent, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridX, setCurrentGridX] = useState<number | null>(null);

  const hasDraggingCoords = isPresent(x) && isPresent(y);

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
    if (isPresent(resizingEvent) && hasDraggingCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      setCurrentGridX(data?.gridX ?? null);
    }
  }, [hasDraggingCoords, mousePositionDataGrabber, resizingEvent, x, y]);

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
      setCurrentGridX(null);
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
  ]);

  return useMemo(
    () => ({
      resizingEvent,
      resizingWidth,
    }),
    [resizingWidth, resizingEvent]
  );
}
