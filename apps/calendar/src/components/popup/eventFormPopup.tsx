import { FunctionComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useCallback } from 'preact/hooks';

import { CalendarSelector } from '@src/components/popup/calendarSelector';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { DateSelector } from '@src/components/popup/dateSelector';
import { EventStateSelector } from '@src/components/popup/eventStateSelector';
import { LocationInputBox } from '@src/components/popup/locationInputBox';
import { PopupSection } from '@src/components/popup/popupSection';
import { TitleInputBox } from '@src/components/popup/titleInputBox';
import { useStore } from '@src/contexts/calendarStore';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayerRef';
import { cls } from '@src/helpers/css';
import { calendarSelector } from '@src/selectors';
import { isNil } from '@src/utils/type';

import { EventFormPopupParam } from '@t/store';

const classNames = {
  formPopupContainer: cls('form-popup-container'),
  popupContainer: cls('popup-container'),
  formContainer: cls('form-container'),
  popupArrowTop: cls('popup-arrow-top'),
  popupArrowBorder: cls('popup-arrow-border'),
  popupArrowFill: cls('popup-arrow-fill'),
};

export const EventFormPopup: FunctionComponent = () => {
  const { calendars } = useStore(calendarSelector);
  const {
    start,
    end,
    isAllday = false,
    eventState = 'Busy',
    popupPosition,
  } = useStore(useCallback((state) => (state.popup.param as EventFormPopupParam) ?? {}, []));

  const floatingLayerContainer = useFloatingLayerContainer();

  const style = {
    display: 'block',
    position: 'absolute',
    zIndex: 1,
    ...popupPosition,
  };

  if (isNil(floatingLayerContainer) || isNil(start) || isNil(end)) {
    return null;
  }

  return createPortal(
    <div className={classNames.formPopupContainer} style={style}>
      <div role="dialog" className={classNames.popupContainer}>
        <div className={classNames.formContainer}>
          {calendars?.length ? <CalendarSelector calendars={calendars} /> : <PopupSection />}
          <TitleInputBox />
          <LocationInputBox />
          <DateSelector start={start} end={end} isAllday={isAllday} />
          <EventStateSelector eventState={eventState} />
          <ClosePopupButton close={close} />
          <PopupSection>
            <ConfirmPopupButton />
          </PopupSection>
        </div>
        <div className={classNames.popupArrowTop}>
          <div className={classNames.popupArrowBorder}>
            <div className={classNames.popupArrowFill} />
          </div>
        </div>
      </div>
    </div>,
    floatingLayerContainer
  );
};
