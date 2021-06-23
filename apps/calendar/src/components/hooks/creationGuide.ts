import { useState } from 'preact/hooks';

import { useActions } from '@src/components/hooks/store';
import { PopupType } from '@src/modules/layerPopup';

import { GridCreationGuide } from '@t/components/daygrid/gridWithMouse';

export function useCreationGuide(shouldRenderDefaultPopup = false) {
  const [creationGuide, setCreationGuide] = useState<GridCreationGuide | null>(null);
  const [isOpenedPopup, setOpenedPopup] = useState(false);

  const { show, hide } = useActions('layerPopup');

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
