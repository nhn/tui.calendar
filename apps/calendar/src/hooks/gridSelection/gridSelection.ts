import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { useTransientUpdate } from '@src/hooks/common/transientUpdate';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

import { GridSelectionType } from '@t/drag';
import { GridPosition, GridPositionFinder } from '@t/grid';
import { CalendarState } from '@t/store';

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
  const useCreationPopup = useStore(useCreationPopupOptionSelector);

  const { setGridSelection } = useDispatch('gridSelection');
  const { hideAllPopup, showFormPopup } = useDispatch('popup');
  const eventBus = useEventBus();

  const [initMousePosition, setInitMousePosition] = useState<Coordinates | null>(null);
  const [initGridPosition, setInitGridPosition] = useState<GridPosition | null>(null);
  const isSelectingGridRef = useRef(false);
  const gridSelectionRef = useRef<GridSelectionData | null>(null);

  useTransientUpdate(
    useCallback((state: CalendarState) => state.gridSelection[type], [type]),
    (gridSelection) => {
      gridSelectionRef.current = gridSelection;
    }
  );

  useTransientUpdate(dndSelector, ({ draggingState, draggingItemType }) => {
    isSelectingGridRef.current =
      draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;
  });

  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);

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
  const onMouseDown = useDrag(currentGridSelectionType, {
    onInit: (e) => {
      if (useCreationPopup) {
        setInitMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
        hideAllPopup();
      }

      initGridSelection(e);
    },
    onDragStart: (e) => {
      if (isSelectingGridRef.current && isPresent(initGridPosition)) {
        setGridSelectionByPosition(e, initGridPosition);
      }
    },
    onDrag: (e) => {
      if (isSelectingGridRef.current && isPresent(initGridPosition)) {
        setGridSelectionByPosition(e, initGridPosition);
      }
    },
    onMouseUp: (e) => {
      e.stopPropagation();

      if (isPresent(gridSelectionRef.current)) {
        const [startDate, endDate] = sortDates(
          ...dateGetter(dateCollection, gridSelectionRef.current)
        );

        if (useCreationPopup && isPresent(initMousePosition)) {
          const popupArrowPointPosition = {
            top: (e.clientY + initMousePosition.y) / 2,
            left: (e.clientX + initMousePosition.x) / 2,
          };

          showFormPopup({
            isCreationPopup: true,
            title: '',
            location: '',
            start: startDate,
            end: endDate,
            isAllday: type !== 'timeGrid',
            isPrivate: false,
            popupArrowPointPosition,
          });
        }

        eventBus.fire('selectDateTime', {
          start: startDate.toDate(),
          end: endDate.toDate(),
          isAllday: type !== 'timeGrid',
          nativeEvent: e,
        });
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

  return onMouseDown;
}
