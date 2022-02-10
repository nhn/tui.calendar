import { useCallback, useEffect } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

import { GridSelectionType } from '@t/drag';
import { GridPositionFinder } from '@t/grid';
import { CalendarState } from '@t/store';

export function useGridSelection(type: GridSelectionType, gridPositionFinder: GridPositionFinder) {
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const gridSelection = useStore(
    useCallback((state: CalendarState) => state.gridSelection[type], [type])
  );
  const { setGridSelection } = useDispatch('gridSelection');
  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);

  const isSelectingGrid =
    draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;

  const { onMouseDown } = useDrag(currentGridSelectionType);

  useEffect(() => {
    const hasInitCoords = isPresent(initX) && isPresent(initY);

    if (isSelectingGrid && hasInitCoords) {
      const gridPosition = gridPositionFinder({ clientX: initX, clientY: initY });

      if (gridPosition) {
        setGridSelection(type, {
          currentColIndex: gridPosition.columnIndex,
          currentRowIndex: gridPosition.rowIndex,
          initColIndex: gridPosition.columnIndex,
          initRowIndex: gridPosition.rowIndex,
        });
      }
    }
  }, [initX, initY, isSelectingGrid, gridPositionFinder, setGridSelection, type]);

  useEffect(() => {
    const hasCurrentCoords = isPresent(x) && isPresent(y);

    if (isSelectingGrid && hasCurrentCoords) {
      const gridPosition = gridPositionFinder({ clientX: x, clientY: y });

      if (gridPosition) {
        setGridSelection(type, (prev) => ({
          ...(prev as GridSelectionData),
          currentColIndex: gridPosition.columnIndex,
          currentRowIndex: gridPosition.rowIndex,
        }));
      }
    }
  }, [isSelectingGrid, gridPositionFinder, x, y, setGridSelection, type]);

  return { onMouseDown, gridSelection };
}
