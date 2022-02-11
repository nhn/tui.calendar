import { useCallback, useEffect } from 'preact/hooks';

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

export function useGridSelection<DateCollection>({
  type,
  selectionSorter,
  dateGetter,
  dateCollection,
  gridPositionFinder,
}: {
  type: GridSelectionType;
  selectionSorter: (gridPosition: GridPosition) => GridSelectionData;
  dateGetter: (gridSelection: GridSelectionData) => [TZDate, TZDate];
  dateCollection: DateCollection;
  gridPositionFinder: GridPositionFinder;
}) {
  const { draggingItemType, draggingState } = useStore(dndSelector);
  const gridSelection = useStore(
    useCallback((state: CalendarState) => state.gridSelection[type], [type])
  );
  const { setGridSelection } = useDispatch('gridSelection');
  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);
  const isSelectingGrid =
    draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;

  const clearGridSelection = useCallback(
    () => setGridSelection(type, null),
    [setGridSelection, type]
  );
  const setGridSelectionByPosition = useCallback(
    (e: MouseEvent) => {
      const gridPosition = gridPositionFinder(e);

      // sorter로 업데이트 하는 것과 아예 새 값으로 업데이트 하는 것으로 분리
      // sorter 모킹 필요
      if (isPresent(gridPosition)) {
        setGridSelection(type, selectionSorter(gridPosition));
      }
    },
    [gridPositionFinder, setGridSelection, type, selectionSorter]
  );

  const { onMouseDown } = useDrag(currentGridSelectionType, {
    onDragStart: (e) => {
      if (isSelectingGrid) {
        console.log(e.clientX, e.clientY);
        setGridSelectionByPosition(e);
        console.log(gridSelection);
      }
    },
    onDrag: (e) => {
      if (isSelectingGrid) {
        console.log(e.clientX, e.clientY);
        setGridSelectionByPosition(e);
        console.log(gridSelection);
      }
    },
  });

  useEffect(() => clearGridSelection, [clearGridSelection]);

  return { onMouseDown, gridSelection, onClick: setGridSelectionByPosition };
}
