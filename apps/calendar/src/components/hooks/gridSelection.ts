import { useState } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { PopupType } from '@src/slices/popup';

import { GridSelectionData } from '@t/components/daygrid/gridWithMouse';

export function useGridSelection(shouldRenderDefaultPopup = false) {
  const [gridSelection, setGridSelection] = useState<GridSelectionData | null>(null);
  const [isOpenedPopup, setOpenedPopup] = useState(false);

  const { show, hide } = useDispatch('popup');

  const onOpenCreationPopup = (gridSelectionData: GridSelectionData) => {
    if (shouldRenderDefaultPopup) {
      const { start, end, x, y } = gridSelectionData;

      // @TODO: need to calculate accurate coord of popupRect
      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupRect: {
            left: x,
            top: y,
          },
          close: () => {
            clearGridSelection();
            setOpenedPopup(false);
          },
        },
      });

      if (!isOpenedPopup) {
        setOpenedPopup(true);
      }
    }
  };

  const onSelectionChange = (gridSelectionData: GridSelectionData | null) =>
    setGridSelection(gridSelectionData);
  const onSelectionEnd = (gridSelectionData: GridSelectionData | null) => {
    setGridSelection(gridSelectionData);

    if (gridSelectionData) {
      onOpenCreationPopup(gridSelectionData);
    } else if (isOpenedPopup) {
      hide();
    }
  };
  const clearGridSelection = () => setGridSelection(null);

  return {
    gridSelection,
    onSelectionEnd,
    onSelectionChange,
    onSelectionCancel: clearGridSelection,
  };
}
