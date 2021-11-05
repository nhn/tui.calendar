import { FunctionComponent, h } from 'preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { SeeMoreEventsPopup } from '@src/components/popup/seeMoreEventsPopup';
import { useStore } from '@src/contexts/calendarStore';
import { topLevelStateSelector } from '@src/selectors';
import { PopupType } from '@src/slices/popup';
import { cls } from '@src/util/cssHelper';

import { DetailPopupParam, EventFormPopupParam, PopupParamMap, SeeMorePopupParam } from '@t/store';

const renderPopup = (popupType: PopupType | null, param: PopupParamMap[PopupType]) => {
  switch (popupType) {
    case PopupType.seeMore:
      return <SeeMoreEventsPopup {...(param as SeeMorePopupParam)} />;
    case PopupType.form:
      return <EventFormPopup {...(param as EventFormPopupParam)} />;
    case PopupType.detail:
      return <EventDetailPopup {...(param as DetailPopupParam)} />;
    default:
      return null;
  }
};

const popupSelector = topLevelStateSelector('popup');
const FloatingLayer: FunctionComponent = () => {
  const popupState = useStore(popupSelector);
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
