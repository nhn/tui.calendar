import { FunctionComponent, h } from 'preact';

import DetailPopup from '@src/components/popup/detailPopup';
import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import SeeMorePopup from '@src/components/popup/seeMorePopup';
import { useStore } from '@src/contexts/calendarStore';
import { topLevelStateSelector } from '@src/selectors';
import { PopupType } from '@src/slices/popup';
import { cls } from '@src/util/cssHelper';

import { DetailPopupParam, EventFormPopupParam, PopupParamMap, SeeMorePopupParam } from '@t/store';

const renderPopup = (popupType: PopupType | null, param: PopupParamMap[PopupType]) => {
  switch (popupType) {
    case PopupType.seeMore:
      return <SeeMorePopup {...(param as SeeMorePopupParam)} />;
    case PopupType.form:
      return <EventFormPopup {...(param as EventFormPopupParam)} />;
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
