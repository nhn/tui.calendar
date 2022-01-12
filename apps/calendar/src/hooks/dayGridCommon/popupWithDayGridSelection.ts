import { useEffect, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';

import { CalendarState } from '@t/store';

interface Params {
  gridSelection: GridSelectionData | null;
  dateMatrix: TZDate[][];
}

function getSelectionRangeDate(gridSelection: GridSelectionData, dateMatrix: TZDate[][]) {
  const { initRowIndex, initColIndex, currentRowIndex, currentColIndex } = gridSelection;
  const selectionStartDate = dateMatrix[initRowIndex][initColIndex];
  const selectionEndDate = dateMatrix[currentRowIndex][currentColIndex];

  return [selectionStartDate, selectionEndDate];
}

function sortDate(start: TZDate, end: TZDate) {
  const isIncreased = start < end;

  return isIncreased ? [start, end] : [end, start];
}

function useCreationPopupOptionSelector(state: CalendarState) {
  return state.options.useCreationPopup;
}

export function usePopupWithDayGridSelection({ gridSelection, dateMatrix }: Params) {
  // @TODO: use better naming
  const useCreationPopup = useStore(useCreationPopupOptionSelector);
  const { show, hide } = useDispatch('popup');
  const eventBus = useEventBus();

  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection, {
    onDragStart: ({ pageX, pageY }) => {
      setStartPos({ x: pageX, y: pageY });
      hide();
    },
    onDragEnd: (e) => {
      const pos = { x: e.pageX, y: e.pageY };
      if (!startPos) {
        setStartPos(pos);
      }

      setEndPos(pos);
      e.stopPropagation();

      if (gridSelection) {
        const [selectionStartDate, selectionEndDate] = getSelectionRangeDate(
          gridSelection,
          dateMatrix
        );
        const [start, end] = sortDate(selectionStartDate, selectionEndDate);

        eventBus.fire('selectDateTime', {
          start: start.toDate(),
          end: end.toDate(),
          isAllday: true,
          nativeEvent: e,
        });
      }
    },
  });

  useEffect(() => {
    if (gridSelection && useCreationPopup && startPos && endPos) {
      const { x: startX, y: startY } = startPos;
      const { x: endX, y: endY } = endPos;

      const [selectionStartDate, selectionEndDate] = getSelectionRangeDate(
        gridSelection,
        dateMatrix
      );
      const [start, end] = sortDate(selectionStartDate, selectionEndDate);

      setStartPos(null);
      setEndPos(null);

      show({
        type: PopupType.form,
        param: {
          isCreationPopup: true,
          title: '',
          location: '',
          start,
          end,
          isAllday: true,
          isPrivate: false,
          popupArrowPointPosition: {
            top: (endY + startY) / 2,
            left: (endX + startX) / 2,
          },
        },
      });
    }
  }, [dateMatrix, endPos, gridSelection, show, startPos, useCreationPopup]);

  return onMouseDown;
}
