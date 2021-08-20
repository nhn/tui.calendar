import { useState } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { PopupType } from '@src/slices/popup';

import { GridCreationGuide } from '@t/components/daygrid/gridWithMouse';

export function useCreationGuide(shouldRenderDefaultPopup = false) {
  const [creationGuide, setCreationGuide] = useState<GridCreationGuide | null>(null);
  const [isOpenedPopup, setOpenedPopup] = useState(false);

  const { show, hide } = useDispatch('popup');

  const onOpenCreationPopup = (guide: GridCreationGuide) => {
    if (shouldRenderDefaultPopup) {
      const { start, end, x, y } = guide;

      // @TODO: need to calculate accurate coord of popupRect
      show({
        type: PopupType.creation,
        param: {
          start,
          end,
          isAllDay: true,
          popupRect: {
            left: x,
            top: y,
          },
          close: () => {
            clearCreationGuide();
            setOpenedPopup(false);
          },
        },
      });

      if (!isOpenedPopup) {
        setOpenedPopup(true);
      }
    }
  };

  const changeCreationGuide = (guide: GridCreationGuide | null) => setCreationGuide(guide);
  const onGuideEnd = (guide: GridCreationGuide | null) => {
    setCreationGuide(guide);

    if (guide) {
      onOpenCreationPopup(guide);
    } else if (isOpenedPopup) {
      hide();
    }
  };
  const clearCreationGuide = () => setCreationGuide(null);

  return {
    creationGuide,
    onGuideEnd,
    onGuideChange: changeCreationGuide,
    onGuideCancel: clearCreationGuide,
  };
}
