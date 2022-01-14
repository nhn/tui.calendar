import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex } from '@src/helpers/grid';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isNil, isPresent } from '@src/utils/type';

interface Params {
  dateMatrix: TZDate[][];
  cellWidthMap: string[][];
  mousePositionDataGrabber: MousePositionDataGrabber;
}

export function useDayGridMonthEventResize({
  dateMatrix,
  mousePositionDataGrabber,
  cellWidthMap,
}: Params) {
  const { initX, initY, x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: resizingEvent, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridPos, setCurrentGridPos] = useState<{ x: number; y: number } | null>(null);
  const [targetEventGridPos, setTargetEventGridPos] = useState<{
    startX: number;
    endX: number;
    y: number;
  } | null>(null);

  const resizingWidth = useMemo(() => {
    if (isNil(resizingEvent) || isNil(targetEventGridPos) || isNil(currentGridPos)) {
      return null;
    }

    return cellWidthMap[targetEventGridPos.startX][
      Math.max(targetEventGridPos.startX, currentGridPos.x)
    ];
  }, [cellWidthMap, currentGridPos, resizingEvent, targetEventGridPos]);

  useEffect(() => {
    const hasInitCoords = isPresent(initX) && isPresent(initY);

    if (isPresent(resizingEvent) && hasInitCoords) {
      const pos = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);

      if (pos) {
        const targetEventGridY = pos.gridY;
        const row = dateMatrix[targetEventGridY];
        const startX = Math.max(getGridDateIndex(resizingEvent.getStarts(), row), 0);
        const endX = getGridDateIndex(resizingEvent.getEnds(), row);

        setTargetEventGridPos({ startX, endX, y: targetEventGridY });
      }
    }
  }, [dateMatrix, initX, initY, mousePositionDataGrabber, resizingEvent]);

  useEffect(() => {
    const hasDraggingCoords = isPresent(x) && isPresent(y);

    if (isPresent(resizingEvent) && hasDraggingCoords) {
      const pos = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      if (pos) {
        setCurrentGridPos({ x: pos.gridX, y: pos.gridY });
      }
    }
  }, [mousePositionDataGrabber, resizingEvent, x, y]);

  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE &&
      isPresent(resizingEvent) &&
      isPresent(targetEventGridPos) &&
      isPresent(currentGridPos);
    if (isDraggingEnd) {
      const shouldUpdate =
        targetEventGridPos.startX <= currentGridPos.x &&
        currentGridPos.x !== targetEventGridPos.endX;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[targetEventGridPos.y][currentGridPos.x];
        updateEvent({
          event: resizingEvent.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      setCurrentGridPos(null);
      clearDraggingEvent();
    }
  }, [
    clearDraggingEvent,
    currentGridPos,
    dateMatrix,
    draggingState,
    resizingEvent,
    targetEventGridPos,
    updateEvent,
  ]);

  return {
    resizingEvent,
    currentGridPos,
    resizingWidth,
  };
}
