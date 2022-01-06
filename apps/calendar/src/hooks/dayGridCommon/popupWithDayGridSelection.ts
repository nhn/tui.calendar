import { useEffect, useRef, useState } from 'preact/hooks';

import { EVENT_FORM_POPUP_WIDTH } from '@src/constants/popup';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';

import { CalendarState } from '@t/store';

interface Params {
  gridSelection: GridSelectionData | null;
  dateMatrix: TZDate[][];
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
  const { show } = useDispatch('popup');

  const startPos = useRef<{ x: number; y: number } | null>(null);
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection, {
    onDragStart: ({ pageX, pageY }) => {
      startPos.current = { x: pageX, y: pageY };
    },
    onDragEnd: (e) => {
      setEndPos({ x: e.pageX, y: e.pageY });
      e.stopPropagation();
    },
  });

  useEffect(() => {
    if (gridSelection && useCreationPopup && startPos.current && endPos) {
      const { initRowIndex, initColIndex, currentRowIndex, currentColIndex } = gridSelection;
      const { x: startX, y: startY } = startPos.current;
      const { x: endX, y: endY } = endPos;

      const selectionStartDate = dateMatrix[initRowIndex][initColIndex];
      const selectionEndDate = dateMatrix[currentRowIndex][currentColIndex];
      const [start, end] = sortDate(selectionStartDate, selectionEndDate);

      startPos.current = null;
      setEndPos(null);
      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupPosition: {
            left: (endX + startX - EVENT_FORM_POPUP_WIDTH) / 2,
            top: (endY + startY) / 2,
          },
        },
      });
    }
  }, [dateMatrix, gridSelection, endPos, show, useCreationPopup]);

  return onMouseDown;
}
