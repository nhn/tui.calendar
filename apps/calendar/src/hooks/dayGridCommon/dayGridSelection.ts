import { useEffect, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

export function useDayGridSelection(
  mousePositionDataGrabber: MousePositionDataGrabber
): GridSelectionData | null {
  const [currentCoords, setCurrentCoords] = useState<{
    currentRowIdx: number;
    currentColIdx: number;
  } | null>(null);
  const initCoordsRef = useRef<{ initRowIdx: number; initColIdx: number } | null>(null);
  const prevCoordsRef = useRef<{
    currentRowIdx: number;
    currentColIdx: number;
  } | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState > DraggingState.INIT;
  const hasCurrentCoords = isPresent(x) && isPresent(y);

  useEffect(() => {
    if (isSelectingGrid && isPresent(initX) && isPresent(initY) && !prevCoordsRef.current) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initCoordsRef.current = {
          initRowIdx: data.gridY,
          initColIdx: data.gridX,
        };
      }
    }
  }, [initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (isSelectingGrid && hasCurrentCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setCurrentCoords({ currentColIdx: data.gridX, currentRowIdx: data.gridY });
        prevCoordsRef.current = { currentColIdx: data.gridX, currentRowIdx: data.gridY };
      }
    }
  }, [hasCurrentCoords, isSelectingGrid, mousePositionDataGrabber, x, y]);

  useEffect(() => {
    if (draggingState === DraggingState.IDLE && isPresent(prevCoordsRef.current)) {
      setCurrentCoords(prevCoordsRef.current);
      prevCoordsRef.current = null;
    }
  }, [draggingState]);

  return isPresent(initCoordsRef.current) && isPresent(currentCoords)
    ? {
        ...currentCoords,
        initRowIdx: initCoordsRef.current.initRowIdx,
        initColIdx: initCoordsRef.current.initColIdx,
      }
    : null;
}
