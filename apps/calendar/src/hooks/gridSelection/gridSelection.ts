import { useCallback, useEffect, useRef } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

import { GridSelectionType } from '@t/drag';
import { GridPosition, GridPositionFinder } from '@t/grid';
import { CalendarState } from '@t/store';

function sortGridSelection(initPos: GridPosition, currentPos: GridPosition): GridSelectionData {
  const isReversed =
    initPos.columnIndex > currentPos.columnIndex ||
    (initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex);

  return {
    startColumnIndex: isReversed ? currentPos.columnIndex : initPos.columnIndex,
    startRowIndex: isReversed ? currentPos.rowIndex : initPos.rowIndex,
    endColumnIndex: isReversed ? initPos.columnIndex : currentPos.columnIndex,
    endRowIndex: isReversed ? initPos.rowIndex : currentPos.rowIndex,
  };
}

export function useGridSelection<DateCollection>({
  type,
  dateGetter,
  dateCollection,
  gridPositionFinder,
}: {
  type: GridSelectionType;
  dateGetter: (gridSelection: GridSelectionData) => [TZDate, TZDate];
  dateCollection: DateCollection;
  gridPositionFinder: GridPositionFinder;
}) {
  const { draggingItemType, draggingState } = useStore(dndSelector);
  const gridSelection = useStore(
    useCallback((state: CalendarState) => state.gridSelection[type], [type])
  );
  const { setGridSelection } = useDispatch('gridSelection');
  const initGridPositionRef = useRef<GridPosition | null>(null);

  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);
  const isSelectingGrid =
    draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;

  const clearGridSelection = useCallback(() => {
    initGridPositionRef.current = null;
    setGridSelection(type, null);
  }, [setGridSelection, type]);
  const setInitGridPosition = useCallback(
    (e: MouseEvent) => {
      const gridPosition = gridPositionFinder(e);
      if (isPresent(gridPosition)) {
        initGridPositionRef.current = gridPosition;

        return gridPosition;
      }

      return null;
    },
    [gridPositionFinder]
  );
  const setGridSelectionByPosition = useCallback(
    (e: MouseEvent, initGridPos: GridPosition) => {
      const gridPosition = gridPositionFinder(e);

      if (isPresent(gridPosition)) {
        setGridSelection(type, sortGridSelection(initGridPos, gridPosition));
      }
    },
    [gridPositionFinder, setGridSelection, type]
  );
  const initGridSelection = useCallback(
    (e: MouseEvent) => {
      const initGridPos = setInitGridPosition(e);
      if (isPresent(initGridPos)) {
        setGridSelectionByPosition(e, initGridPos);
      }
    },
    [setGridSelectionByPosition, setInitGridPosition]
  );

  const { onMouseDown } = useDrag(currentGridSelectionType, {
    onDragStart: (e) => {
      if (isSelectingGrid) {
        initGridSelection(e);
      }
    },
    onDrag: (e) => {
      if (isSelectingGrid && isPresent(initGridPositionRef.current)) {
        setGridSelectionByPosition(e, initGridPositionRef.current);
      }
    },
  });

  useEffect(() => clearGridSelection, [clearGridSelection]);

  return { onMouseDown, gridSelection, onClick: initGridSelection };
}
