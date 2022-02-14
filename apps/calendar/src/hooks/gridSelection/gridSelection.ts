import { useCallback, useEffect, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

import { GridSelectionType } from '@t/drag';
import { GridPosition, GridPositionFinder } from '@t/grid';
import { CalendarState, PopupArrowPointPosition } from '@t/store';

function sortDates(a: TZDate, b: TZDate) {
  const isIncreased = a < b;

  return isIncreased ? [a, b] : [b, a];
}

function useCreationPopupOptionSelector(state: CalendarState) {
  return state.options.useCreationPopup;
}

export function useGridSelection<DateCollection>({
  type,
  selectionSorter,
  dateGetter,
  dateCollection,
  gridPositionFinder,
}: {
  type: GridSelectionType;
  selectionSorter: (initPos: GridPosition, currentPos: GridPosition) => GridSelectionData;
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

  const [initMousePosition, setInitMousePosition] = useState<Coordinates | null>(null);
  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);

  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);
  const isSelectingGrid =
    draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;

  const setGridSelectionByPosition = (e: MouseEvent, initGridPos: GridPosition) => {
    const gridPosition = gridPositionFinder(e);

    if (isPresent(gridPosition)) {
      setGridSelection(type, selectionSorter(initGridPos, gridPosition));
    }
  };
  const initGridSelection = (e: MouseEvent) => {
    const gridPosition = gridPositionFinder(e);

    if (isPresent(gridPosition)) {
      setInitGridPosition(gridPosition);
      setGridSelectionByPosition(e, gridPosition);
    }
  };
  const showCreationPopup = (
    popupArrowPointPosition: PopupArrowPointPosition,
    startDate: TZDate,
    endDate: TZDate
  ) => {
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
  };
  const handleClick = (e: MouseEvent) => {
    const gridPosition = gridPositionFinder(e);

    if (isPresent(gridPosition)) {
      initGridSelection(e);
      const currentGridSelection = selectionSorter(gridPosition, gridPosition);

      if (useCreationPopup) {
        showCreationPopup(
          {
            top: e.clientY,
            left: e.clientX,
          },
          ...dateGetter(dateCollection, currentGridSelection)
        );
      }
    }
  };

  const { onMouseDown } = useDrag(currentGridSelectionType, {
    onDragStart: (e) => {
      if (useCreationPopup) {
        setInitMousePosition({
          x: e.pageX,
          y: e.pageY,
        });
        hideAllPopup();
      }

      if (isSelectingGrid) {
        initGridSelection(e);
      }
    },
    onDrag: (e) => {
      if (isSelectingGrid && isPresent(initGridPosition)) {
        setGridSelectionByPosition(e, initGridPosition);
      }
    },
    onDragEnd: (e) => {
      if (isPresent(gridSelection)) {
        const [startDate, endDate] = sortDates(...dateGetter(dateCollection, gridSelection));

        if (useCreationPopup && isPresent(initMousePosition)) {
          const popupArrowPointPosition = {
            top: (e.pageY + initMousePosition.y) / 2,
            left: (e.pageX + initMousePosition.x) / 2,
          };
          showCreationPopup(popupArrowPointPosition, startDate, endDate);
        }

        // @TODO: fire 'selectDateTime' custom event
      }
    },
  });

  useEffect(
    () => () => {
      setInitMousePosition(null);
      setInitGridPosition(null);
      setGridSelection(type, null);
    },
    [setGridSelection, type]
  );

  return { onMouseDown, gridSelection, onClick: handleClick };
}
