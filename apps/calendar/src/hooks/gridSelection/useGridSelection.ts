import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useClickPrevention } from '@src/hooks/common/useClickPrevention';
import { useDrag } from '@src/hooks/common/useDrag';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import { dndSelector, optionsSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import type { GridSelectionType } from '@src/slices/gridSelection';
import type TZDate from '@src/time/date';
import { noop } from '@src/utils/noop';
import { isPresent } from '@src/utils/type';

import type { GridPosition, GridPositionFinder } from '@t/grid';
import type { CalendarState } from '@t/store';

function sortDates(a: TZDate, b: TZDate) {
  const isIncreased = a < b;

  return isIncreased ? [a, b] : [b, a];
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
  const { useCreationPopup, gridSelection: gridSelectionOptions } = useStore(optionsSelector);
  const { enableDblClick, enableClick } = gridSelectionOptions;

  const { setGridSelection, addGridSelection } = useDispatch('gridSelection');
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

  let isDragEvent = false;
  const [handleClickWithDebounce, handleDblClickPreventingClick] = useClickPrevention({
    onClick: (e: MouseEvent) => {
      if (enableClick) {
        onMouseUp(e);
      }
    },
    onDblClick: (e: MouseEvent) => {
      if (enableDblClick) {
        onMouseUp(e);
      }
    },
    delay: 250, // heuristic value
  });

  const onMouseUpWithClick = (e: MouseEvent) => {
    const isClick = e.detail <= 1;

    if (!enableClick && (!enableDblClick || isClick)) {
      return;
    }

    if (enableClick) {
      if (isClick) {
        handleClickWithDebounce(e);
      } else {
        handleDblClickPreventingClick(e);
      }

      return;
    }

    onMouseUp(e);
  };

  const onMouseUp = (e: MouseEvent) => {
    // The grid selection is created on mouseup in case of the click event.
    if (!isDragEvent && isPresent(initGridPosition)) {
      setGridSelectionByPosition(e, initGridPosition);
    }

    if (isPresent(gridSelectionRef.current)) {
      const [startDate, endDate] = sortDates(
        ...dateGetter(dateCollection, gridSelectionRef.current)
      );

      if (!useCreationPopup) {
        addGridSelection(type, gridSelectionRef.current);
      }

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

      const gridPosition = gridPositionFinder(e);

      if (isPresent(gridPosition)) {
        setInitGridPosition(gridPosition);
      }
    },
    onDragStart: (e) => {
      isDragEvent = true;

      // The grid selection is created on mousemove in case of the drag event.
      if (isPresent(initGridPosition)) {
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

      if (isDragEvent) {
        onMouseUp(e);
      } else {
        onMouseUpWithClick(e);
      }

      isDragEvent = false;
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
