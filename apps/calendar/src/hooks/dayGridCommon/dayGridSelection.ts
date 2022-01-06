import { useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

export function useDayGridSelection(
  mousePositionDataGrabber: MousePositionDataGrabber
): GridSelectionData | null {
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const [gridSelectionData, setGridSelectionData] = useState<GridSelectionData | null>(null);

  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState >= DraggingState.INIT;

  useEffect(() => {
    const hasInitCoords = isPresent(initX) && isPresent(initY);
    if (isSelectingGrid && hasInitCoords) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        setGridSelectionData({
          currentColIndex: data.gridX,
          currentRowIndex: data.gridY,
          initColIndex: data.gridX,
          initRowIndex: data.gridY,
        });
      }
    }
  }, [initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    const hasCurrentCoords = isPresent(x) && isPresent(y);
    if (isSelectingGrid && hasCurrentCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setGridSelectionData((prev) => ({
          ...(prev as GridSelectionData),
          currentColIndex: data.gridX,
          currentRowIndex: data.gridY,
        }));
      }
    }
  }, [isSelectingGrid, mousePositionDataGrabber, x, y]);

  return gridSelectionData;
}
