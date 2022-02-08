import { useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { GridPositionFinder } from '@src/helpers/view';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

export function useDayGridSelection(
  gridPositionFinder: GridPositionFinder
): GridSelectionData | null {
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const [gridSelectionData, setGridSelectionData] = useState<GridSelectionData | null>(null);

  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState >= DraggingState.INIT;

  useEffect(() => {
    const hasInitCoords = isPresent(initX) && isPresent(initY);
    if (isSelectingGrid && hasInitCoords) {
      const gridPosition = gridPositionFinder({ clientX: initX, clientY: initY });
      if (gridPosition) {
        setGridSelectionData({
          currentColIndex: gridPosition.x,
          currentRowIndex: gridPosition.y,
          initColIndex: gridPosition.x,
          initRowIndex: gridPosition.y,
        });
      }
    }
  }, [initX, initY, isSelectingGrid, gridPositionFinder]);

  useEffect(() => {
    const hasCurrentCoords = isPresent(x) && isPresent(y);
    if (isSelectingGrid && hasCurrentCoords) {
      const gridPosition = gridPositionFinder({ clientX: x, clientY: y });
      if (gridPosition) {
        setGridSelectionData((prev) => ({
          ...(prev as GridSelectionData),
          currentColIndex: gridPosition.x,
          currentRowIndex: gridPosition.y,
        }));
      }
    }
  }, [isSelectingGrid, gridPositionFinder, x, y]);

  return gridSelectionData;
}
