import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import CreationPopup from '@src/components/popup/creationPopup';
import DetailPopup from '@src/components/popup/detailPopup';
import SeeMorePopup from '@src/components/popup/seeMorePopup';
import { PopupType } from '@src/modules/layerPopup';
import { cls } from '@src/util/cssHelper';

import { CreationPopupParam, DetailPopupParam, PopupParamMap, SeeMorePopupParam } from '@t/store';

const renderPopup = (popupType: PopupType | null, param: PopupParamMap[PopupType]) => {
  switch (popupType) {
    case PopupType.seeMore:
      return <SeeMorePopup {...(param as SeeMorePopupParam)} />;
    case PopupType.creation:
      return <CreationPopup {...(param as CreationPopupParam)} />;
    case PopupType.detail:
      return <DetailPopup {...(param as DetailPopupParam)} />;
    default:
      return null;
  }
};

const FloatingLayer: FunctionComponent = () => {
  const { state } = useStore('layerPopup');
  const { popupType, param } = state;

  if (!popupType) {
    return null;
  }

  const { popupRect } = param;

  const style = {
    display: 'block',
    position: 'absolute',
    zIndex: 1,
    ...popupRect,
  };

  return (
    <div className={cls('floating-layer')} style={style}>
      {renderPopup(popupType, param)}
    </div>
  );
};

export default FloatingLayer;
