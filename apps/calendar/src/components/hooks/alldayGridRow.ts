import { useEffect, useMemo } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import { createMousePositionDataGrabberWeek } from '@src/helpers/view';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';

import { Cells } from '@t/panel';

// function isValidDragging(targetItemType: string, currentItemType: string) {
//   return currentItemType.startsWith(targetItemType);
// }

function getEventColIndex(uiModel: EventUIModel, cells: Cells) {
  const start = getGridDateIndex(uiModel.getStarts(), cells);
  const end = getGridDateIndex(uiModel.getEnds(), cells);

  return { start, end };
}

interface UseAlldayGridRowDndParams {
  panelRef: HTMLElement | null;
  events: EventUIModel[];
  cells: any;
  gridInfo: any;
  gridColWidthMap: string[][];
}

export function useAlldayGridRowDnd({
  panelRef,
  events,
  cells,
  gridInfo,
  gridColWidthMap,
}: UseAlldayGridRowDndParams) {
  const { draggingItemType, x, y, isDragging, isDragEnd } = useStore(dndSelector);
  const {
    dnd: { reset },
    calendar: { updateEvent },
  } = useDispatch(['dnd', 'calendar']);

  const mousePositionDataGrabber = useMemo(
    () => (panelRef ? createMousePositionDataGrabberWeek(cells, gridInfo, panelRef) : () => null),
    [cells, gridInfo, panelRef]
  );

  const targetEvent = useMemo(() => {
    const eventId = draggingItemType?.split('/')[1];
    if ((isDragging || isDragEnd) && eventId) {
      return events.find((event) => event.cid() === Number(eventId));
    }

    return null;
  }, [draggingItemType, events, isDragging, isDragEnd]);

  const targetEventGridIndices = useMemo(() => {
    if (targetEvent) {
      return getEventColIndex(targetEvent, cells);
    }

    return { start: -1, end: -1 };
  }, [cells, targetEvent]);

  const currentGridX = useMemo(() => {
    if (isDragging || isDragEnd) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      return data?.gridX ?? null;
    }

    return null;
  }, [isDragEnd, isDragging, mousePositionDataGrabber, x, y]);

  const resizeGuideWidth = useMemo(() => {
    if (isDragging && targetEventGridIndices.start > -1 && currentGridX) {
      return gridColWidthMap[targetEventGridIndices.start][currentGridX];
    }

    return null;
  }, [currentGridX, gridColWidthMap, isDragging, targetEventGridIndices.start]);

  const shouldUpdateEventEnd = useMemo(() => {
    return (
      targetEvent &&
      isDragEnd &&
      currentGridX &&
      targetEventGridIndices.start <= currentGridX &&
      targetEventGridIndices.end !== currentGridX
    );
  }, [currentGridX, isDragEnd, targetEvent, targetEventGridIndices]);

  useEffect(() => {
    if (shouldUpdateEventEnd) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const targetDate = cells[currentGridX!];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      updateEvent({ event: targetEvent!.model, eventData: { end: targetDate } });
      reset();
    }
  }, [cells, currentGridX, shouldUpdateEventEnd, targetEvent, updateEvent, reset]);

  useEffect(
    () => reset,

    [reset]
  );

  return {
    resizeGuideWidth,
  };
}
