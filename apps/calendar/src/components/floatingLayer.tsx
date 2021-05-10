import { h, FunctionComponent } from 'preact';
import { cls } from '@src/util/cssHelper';
import { useStore } from './hooks/store';

import creationPopup from '@src/components/popup/creationPopup';
import detailPopup from '@src/components/popup/detailPopup';
import seeMorePopup from '@src/components/popup/seeMorePopup';
import { PopupType } from '@src/modules/layerPopup';
import { CreationPopupParam, DetailPopupParam, PopupParamMap, SeeMorePopupParam } from '@t/store';

const getPopupComponent = (popupType: PopupType | null, param: PopupParamMap[PopupType]) => {
  switch (popupType) {
    case PopupType.seeMore:
      return seeMorePopup(param as SeeMorePopupParam);
    case PopupType.creation:
      return creationPopup(param as CreationPopupParam);
    case PopupType.detail:
      return detailPopup(param as DetailPopupParam);
    default:
      return null;
  }
};

const FloatingLayer: FunctionComponent = () => {
  const { state } = useStore('layerPopup');
  const { popupType, param } = state;
  const popupComponent = getPopupComponent(popupType, param);

  if (!popupComponent) {
    return null;
  }

  const { popupRect } = param;

  const style = {
    display: popupComponent ? 'block' : 'none',
    position: 'absolute',
    ...popupRect,
  };

  return (
    <div className={cls('floating-layer')} style={style}>
      {popupComponent}
    </div>
  );
};

export default FloatingLayer;
