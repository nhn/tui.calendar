import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isNil } from '@src/utils/type';

import { Cells } from '@t/panel';

function getEventColIndex(uiModel: EventUIModel, cells: Cells) {
  const start = getGridDateIndex(uiModel.getStarts(), cells);
  const end = getGridDateIndex(uiModel.getEnds(), cells);

  return { start, end };
}

interface UseAlldayGridRowDndParams {
  events: EventUIModel[];
  cells: any;
  gridColWidthMap: string[][];
  mousePositionDataGrabber: (e: MouseEvent) => any;
}

export function useAlldayGridRowDnd({
  events,
  cells,
  gridColWidthMap,
  mousePositionDataGrabber,
}: UseAlldayGridRowDndParams) {
  const { draggingItemType, x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');

  const isDragging = draggingState > DraggingState.IDLE;

  const targetEvent = useMemo(() => {
    const eventId = draggingItemType?.split('/')[1];
    if (isDragging && eventId) {
      return events.find((event) => event.cid() === Number(eventId));
    }

    return null;
  }, [draggingItemType, events, isDragging]);

  const targetEventGridIndices = useMemo(() => {
    if (targetEvent) {
      return getEventColIndex(targetEvent, cells);
    }

    return { start: -1, end: -1 };
  }, [cells, targetEvent]);

  const currentGridX = useMemo(() => {
    if (isDragging) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      return data?.gridX ?? null;
    }

    return null;
  }, [isDragging, mousePositionDataGrabber, x, y]);

  const resizingWidth = useMemo(() => {
    if (isDragging && targetEventGridIndices.start > -1 && !isNil(currentGridX)) {
      return gridColWidthMap[0][currentGridX];
    }

    return null;
  }, [currentGridX, gridColWidthMap, isDragging, targetEventGridIndices.start]);

  const shouldUpdateEventEnd = useMemo(() => {
    return Boolean(
      draggingState === DraggingState.END_DRAG &&
        !isNil(targetEvent) &&
        !isNil(currentGridX) &&
        targetEventGridIndices.start <= currentGridX &&
        targetEventGridIndices.end !== currentGridX
    );
  }, [
    currentGridX,
    draggingState,
    targetEvent,
    targetEventGridIndices.end,
    targetEventGridIndices.start,
  ]);

  useEffect(() => {
    if (shouldUpdateEventEnd) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const targetDate = cells[currentGridX!];

      updateEvent({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event: targetEvent!.model,
        eventData: { end: targetDate },
      });
    }
  }, [cells, currentGridX, shouldUpdateEventEnd, targetEvent, updateEvent]);

  return useMemo(
    () => ({
      dragTargetEvent: targetEvent,
      resizingWidth,
    }),
    [resizingWidth, targetEvent]
  );
}
