import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

function getEventColIndex(uiModel: EventUIModel, cells: TZDate[]) {
  const start = getGridDateIndex(uiModel.getStarts(), cells);
  const end = getGridDateIndex(uiModel.getEnds(), cells);

  return { start, end };
}

interface Params {
  cells: TZDate[];
  gridColWidthMap: string[][];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useAlldayGridRowEventResize({
  cells,
  gridColWidthMap,
  mousePositionDataGrabber,
}: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');

  const { draggingEvent: resizingEvent, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridX, setCurrentGridX] = useState<number | null>(null);

  const hasDraggingCoords = !isNil(x) && !isNil(y);

  const targetEventGridIndices = useMemo(() => {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, cells);
    }

    return { start: -1, end: -1 };
  }, [cells, resizingEvent]);

  const resizingWidth = useMemo(() => {
    if (targetEventGridIndices.start > -1 && !isNil(currentGridX)) {
      return gridColWidthMap[targetEventGridIndices.start][currentGridX];
    }

    return null;
  }, [currentGridX, gridColWidthMap, targetEventGridIndices.start]);

  useEffect(() => {
    if (!isNil(resizingEvent) && hasDraggingCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      setCurrentGridX(data?.gridX ?? null);
    }
  }, [hasDraggingCoords, mousePositionDataGrabber, resizingEvent, x, y]);

  useEffect(() => {
    const shouldUpdateEventEnd =
      draggingState === DraggingState.IDLE &&
      !isNil(resizingEvent) &&
      !isNil(currentGridX) &&
      targetEventGridIndices.start <= currentGridX &&
      targetEventGridIndices.end !== currentGridX;

    if (shouldUpdateEventEnd) {
      const targetDate = cells[currentGridX];

      updateEvent({
        event: resizingEvent.model,
        eventData: { end: targetDate },
      });
      setCurrentGridX(null);
      clearDraggingEvent();
    }
  }, [
    cells,
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
