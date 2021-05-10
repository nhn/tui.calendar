import { h, FunctionComponent } from 'preact';
import { cls } from '@src/util/cssHelper';
import { useStore } from './hooks/store';

import CreationPopup from '@src/components/popup/creationPopup';
import DetailPopup from '@src/components/popup/detailPopup';
import SeeMorePopup from '@src/components/popup/seeMorePopup';
import { PopupType } from '@src/modules/layerPopup';

const getPopupComponent = (popupType: PopupType | null) => {
  return !popupType || !Object.values(PopupType).includes(popupType)
    ? null
    : {
        [PopupType.seeMore]: SeeMorePopup,
        [PopupType.creation]: CreationPopup,
        [PopupType.detail]: DetailPopup,
      }[popupType];
};

const FloatingLayer: FunctionComponent = () => {
  const { state } = useStore('layerPopup');
  const { popupType, param } = state;
  const popupComponent = getPopupComponent(popupType);

  if (!popupComponent) {
    return null;
  }

  const { popupRect } = param;

  const style = {
    display: popupComponent(param) ? 'block' : 'none',
    position: 'absolute',
    ...popupRect,
  };

  return (
    <div className={cls('floating-layer')} style={style}>
      {popupComponent(param)}
    </div>
  );
};

export default FloatingLayer;
