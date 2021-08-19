import { FunctionComponent, h } from 'preact';

import CreationPopup from '@src/components/popup/creationPopup';
import DetailPopup from '@src/components/popup/detailPopup';
import SeeMorePopup from '@src/components/popup/seeMorePopup';
import { topLevelStateSelector, useStore } from '@src/store';
import { PopupType } from '@src/store/popup';
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
  const popupState = useStore(topLevelStateSelector('popup'));
  const { type, param } = popupState;

  if (!type || !param) {
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
      {renderPopup(type, param)}
    </div>
  );
};

export default FloatingLayer;
