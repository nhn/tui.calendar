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
  const [currentCoords, setCurrentCoords] = useState<CurrentGridSelectionData | null>(null);
  const initCoordsRef = useRef<InitGridSelectionData | null>(null);
  const prevCoordsRef = useRef<CurrentGridSelectionData | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState >= DraggingState.INIT;
  const hasCurrentCoords = isPresent(x) && isPresent(y);

  useEffect(() => {
    if (isSelectingGrid && isPresent(initX) && isPresent(initY) && !prevCoordsRef.current) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initCoordsRef.current = {
          initRowIndex: data.gridY,
          initColIndex: data.gridX,
        };
        setCurrentCoords({ currentColIndex: data.gridX, currentRowIndex: data.gridY });
      }
    }
  }, [initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (isSelectingGrid && hasCurrentCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setCurrentCoords({ currentColIndex: data.gridX, currentRowIndex: data.gridY });
        prevCoordsRef.current = { currentColIndex: data.gridX, currentRowIndex: data.gridY };
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
        initRowIndex: initCoordsRef.current.initRowIndex,
        initColIndex: initCoordsRef.current.initColIndex,
      }
    : null;
}
