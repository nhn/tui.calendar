import { FunctionComponent, h } from 'preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { SeeMoreEventsPopup } from '@src/components/popup/seeMoreEventsPopup';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { popupSelector } from '@src/selectors';
import { PopupType } from '@src/slices/popup';
import { isNil } from '@src/utils/type';

import {
  EventDetailPopupParam,
  EventFormPopupParam,
  PopupParamMap,
  SeeMorePopupParam,
} from '@t/store';

const renderPopup = (popupType: PopupType | null, param: PopupParamMap[PopupType]) => {
  switch (popupType) {
    case PopupType.seeMore:
      return <SeeMoreEventsPopup />;
    case PopupType.form:
      return <EventFormPopup />;
    case PopupType.detail:
      return <EventDetailPopup />;
    default:
      return null;
  }
};

const FloatingLayer: FunctionComponent = () => {
  const popupState = useStore(popupSelector);
  const { type, param } = popupState;

  if (isNil(type) || isNil(param)) {
    return null;
  }

  const { popupPosition } = param;

  const style = {
    display: 'block',
    position: 'absolute',
    zIndex: 1,
    ...popupPosition,
  };

  return (
    <div className={cls('floating-layer')} style={style}>
      {renderPopup(type, param)}
    </div>
  );
};

export default FloatingLayer;
