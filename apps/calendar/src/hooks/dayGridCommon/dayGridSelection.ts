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
  const [currentSelectionData, setCurrentSelectionData] = useState<CurrentGridSelectionData | null>(
    null
  );
  const initSelectionDataRef = useRef<InitGridSelectionData | null>(null);
  const prevSelectionDataRef = useRef<CurrentGridSelectionData | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState >= DraggingState.INIT;
  const hasCurrentCoords = isPresent(x) && isPresent(y);

  useEffect(() => {
    if (isSelectingGrid && isPresent(initX) && isPresent(initY) && !prevSelectionDataRef.current) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initSelectionDataRef.current = {
          initRowIndex: data.gridY,
          initColIndex: data.gridX,
        };
        setCurrentSelectionData({ currentColIndex: data.gridX, currentRowIndex: data.gridY });
      }
    }
  }, [initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (isSelectingGrid && hasCurrentCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setCurrentSelectionData({ currentColIndex: data.gridX, currentRowIndex: data.gridY });
        prevSelectionDataRef.current = { currentColIndex: data.gridX, currentRowIndex: data.gridY };
      }
    }
  }, [hasCurrentCoords, isSelectingGrid, mousePositionDataGrabber, x, y]);

  useEffect(() => {
    if (draggingState === DraggingState.IDLE && isPresent(prevSelectionDataRef.current)) {
      setCurrentSelectionData(prevSelectionDataRef.current);
      prevSelectionDataRef.current = null;
    }
  }, [draggingState]);

  return isPresent(initSelectionDataRef.current) && isPresent(currentSelectionData)
    ? {
        ...currentSelectionData,
        initRowIndex: initSelectionDataRef.current.initRowIndex,
        initColIndex: initSelectionDataRef.current.initColIndex,
      }
    : null;
}
