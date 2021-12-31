import { useRef } from 'preact/hooks';

import { EVENT_FORM_POPUP_WIDTH } from '@src/constants/popup';
import { useDispatch } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';
import { compare } from '@src/time/datetime';

interface Params {
  gridSelection: GridSelectionData | null;
  useCreationPopup: boolean;
  dateMatrix: TZDate[][];
}

function sortDate(startDate: TZDate, endDate: TZDate) {
  const isIncreased = compare(startDate, endDate) === -1;
  const start = isIncreased ? startDate : endDate;
  const end = isIncreased ? endDate : startDate;

  return [start, end];
}

export function usePopupWithDayGridSelection({
  gridSelection,
  useCreationPopup,
  dateMatrix,
}: Params) {
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const { show } = useDispatch('popup');

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection, {
    onDragStart: (e) => {
      dragStartPos.current = {
        x: e.pageX,
        y: e.pageY,
      };
    },
    onDragEnd: (e) => {
      if (!gridSelection || !useCreationPopup || !dragStartPos.current) {
        return;
      }

      const { initRowIndex, initColIndex, currentRowIndex, currentColIndex } = gridSelection;
      const { x, y } = dragStartPos.current;
      const { pageX, pageY } = e;

      dragStartPos.current = null;
      e.stopPropagation();

      const selectionStartDate = dateMatrix[initRowIndex][initColIndex];
      const selectionEndDate = dateMatrix[currentRowIndex][currentColIndex];
      const [start, end] = sortDate(selectionStartDate, selectionEndDate);

      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupPosition: {
            left: (pageX + x - EVENT_FORM_POPUP_WIDTH) / 2,
            top: (pageY + y) / 2,
          },
        },
      });
    },
  });

  return onMouseDown;
}
