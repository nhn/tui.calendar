import { useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';

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
          currentColIndex: gridPosition.columnIndex,
          currentRowIndex: gridPosition.rowIndex,
          initColIndex: gridPosition.columnIndex,
          initRowIndex: gridPosition.rowIndex,
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
          currentColIndex: gridPosition.columnIndex,
          currentRowIndex: gridPosition.rowIndex,
        }));
      }
    }
  }, [isSelectingGrid, gridPositionFinder, x, y]);

  return gridSelectionData;
}
