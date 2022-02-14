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

function sortDates(a: TZDate, b: TZDate) {
  const isIncreased = a < b;

  return isIncreased ? [a, b] : [b, a];
}

function useCreationPopupOptionSelector(state: CalendarState) {
  return state.options.useCreationPopup;
}

export function useGridSelection<DateCollection>({
  type,
  dateGetter,
  dateCollection,
  gridPositionFinder,
}: {
  type: GridSelectionType;
  dateGetter: (
    dateCollection: DateCollection,
    gridSelection: GridSelectionData
  ) => [TZDate, TZDate];
  dateCollection: DateCollection;
  gridPositionFinder: GridPositionFinder;
}) {
  const { draggingItemType, draggingState } = useStore(dndSelector);
  const useCreationPopup = useStore(useCreationPopupOptionSelector);
  const gridSelection = useStore(
    useCallback((state: CalendarState) => state.gridSelection[type], [type])
  );
  const { setGridSelection } = useDispatch('gridSelection');
  const { hideAllPopup, showFormPopup } = useDispatch('popup');

  const initMousePositionRef = useRef<Coordinates | null>(null);
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
      if (useCreationPopup) {
        initMousePositionRef.current = {
          x: e.pageX,
          y: e.pageY,
        };
        hideAllPopup();
      }

      if (isSelectingGrid) {
        initGridSelection(e);
      }
    },
    onDrag: (e) => {
      if (isSelectingGrid && isPresent(initGridPositionRef.current)) {
        setGridSelectionByPosition(e, initGridPositionRef.current);
      }
    },
    onDragEnd: (e) => {
      if (isPresent(gridSelection)) {
        const [startDate, endDate] = sortDates(...dateGetter(dateCollection, gridSelection));

        if (useCreationPopup && isPresent(initMousePositionRef.current)) {
          const endMousePosition = {
            x: e.pageX,
            y: e.pageY,
          };
          const popupArrowPointPosition = {
            top: (endMousePosition.y + initMousePositionRef.current.y) / 2,
            left: (endMousePosition.x + initMousePositionRef.current.x) / 2,
          };
          showFormPopup({
            isCreationPopup: true,
            title: '',
            location: '',
            start: startDate,
            end: endDate,
            isAllday: true,
            isPrivate: false,
            popupArrowPointPosition,
          });
        }

        // @TODO: fire 'selectDateTime' custom event
      }
    },
  });

  useEffect(() => clearGridSelection, [clearGridSelection]);

  return { onMouseDown, gridSelection, onClick: initGridSelection };
}
