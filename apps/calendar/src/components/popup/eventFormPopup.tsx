import { FunctionComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useRef } from 'preact/hooks';

import { DateRangePicker } from 'tui-date-picker';

import { CalendarSelector } from '@src/components/popup/calendarSelector';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { DateSelector } from '@src/components/popup/dateSelector';
import { EventStateSelector } from '@src/components/popup/eventStateSelector';
import { LocationInputBox } from '@src/components/popup/locationInputBox';
import { PopupSection } from '@src/components/popup/popupSection';
import { TitleInputBox } from '@src/components/popup/titleInputBox';
import { BOOLEAN_KEYS_OF_EVENT_MODEL_DATA } from '@src/constants/popup';
import { useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayer';
import { cls } from '@src/helpers/css';
import { useFormState } from '@src/hooks/popup/formState';
import { calendarSelector } from '@src/selectors';
import { eventFormPopupParamSelector } from '@src/selectors/popup';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { FormEvent } from '@t/components/common';
import { BooleanKeyOfEventModelData, EventModelData } from '@t/events';

const classNames = {
  formPopupContainer: cls('form-popup-container'),
  popupContainer: cls('popup-container'),
  formContainer: cls('form-container'),
  popupArrowTop: cls('popup-arrow-top'),
  popupArrowBorder: cls('popup-arrow-border'),
  popupArrowFill: cls('popup-arrow-fill'),
};

function isBooleanKey(key: string): key is BooleanKeyOfEventModelData {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key as BooleanKeyOfEventModelData) !== -1;
}

export const EventFormPopup: FunctionComponent = () => {
  const { calendars } = useStore(calendarSelector);
  const {
    start,
    end,
    isAllday = false,
    isPrivate = false,
    eventState = 'Busy',
    popupPosition,
    close,
  } = useStore(eventFormPopupParamSelector);
  const eventBus = useEventBus();

  const floatingLayerContainer = useFloatingLayerContainer();
  const [formState, formStateDispatch] = useFormState({
    start,
    end,
    isAllday,
    isPrivate,
    state: eventState,
  });
  const datePickerRef = useRef<DateRangePicker>(null);

  if (isNil(floatingLayerContainer) || isNil(start) || isNil(end)) {
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventData: EventModelData = { ...formState };

    formData.forEach((data, key) => {
      eventData[key as keyof EventModelData] = isBooleanKey(key) ? data === 'true' : data;
    });

    eventData.start = new TZDate(datePickerRef.current?.getStartDate());
    eventData.end = new TZDate(datePickerRef.current?.getEndDate());

    eventBus.fire('beforeCreateEvent', eventData);
  };

  return createPortal(
    <div role="dialog" className={classNames.formPopupContainer} style={popupPosition}>
      <form onSubmit={onSubmit}>
        <div className={classNames.popupContainer}>
          <div className={classNames.formContainer}>
            {calendars?.length ? (
              <CalendarSelector calendars={calendars} formStateDispatch={formStateDispatch} />
            ) : (
              <PopupSection />
            )}
            <TitleInputBox isPrivate={formState.isPrivate} formStateDispatch={formStateDispatch} />
            <LocationInputBox />
            <DateSelector
              start={start}
              end={end}
              isAllday={formState.isAllday}
              formStateDispatch={formStateDispatch}
              ref={datePickerRef}
            />
            <EventStateSelector
              eventState={formState.state}
              formStateDispatch={formStateDispatch}
            />
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
      </form>
    </div>,
    floatingLayerContainer
  );
};
