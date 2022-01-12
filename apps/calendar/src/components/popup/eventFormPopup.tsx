import { FunctionComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import { DateRangePicker } from 'tui-date-picker';

import { CalendarSelector } from '@src/components/popup/calendarSelector';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { DateSelector } from '@src/components/popup/dateSelector';
import { EventStateSelector } from '@src/components/popup/eventStateSelector';
import { LocationInputBox } from '@src/components/popup/locationInputBox';
import { PopupSection } from '@src/components/popup/popupSection';
import { TitleInputBox } from '@src/components/popup/titleInputBox';
import {
  BOOLEAN_KEYS_OF_EVENT_MODEL_DATA,
  FormPopupArrowDirection,
  HALF_OF_POPUP_ARROW_HEIGHT,
} from '@src/constants/popup';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayer';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls } from '@src/helpers/css';
import { isLeftOverLayoutContainer, isTopOverLayoutContainer } from '@src/helpers/popup';
import { useFormState } from '@src/hooks/popup/formState';
import EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import { eventFormPopupParamSelector } from '@src/selectors/popup';
import TZDate from '@src/time/date';
import { compare } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

import { FormEvent, StyleProp } from '@t/components/common';
import { BooleanKeyOfEventModelData, EventModelData } from '@t/events';
import { PopupArrowPointPosition, Rect } from '@t/store';

const classNames = {
  popupContainer: cls('popup-container'),
  formContainer: cls('form-container'),
  popupArrowBorder: cls('popup-arrow-border'),
  popupArrowFill: cls('popup-arrow-fill'),
};

function calculatePopupPosition(
  popupArrowPointPosition: PopupArrowPointPosition,
  layoutRect: Rect,
  popupRect: Rect
) {
  let top = popupArrowPointPosition.top - popupRect.height - HALF_OF_POPUP_ARROW_HEIGHT;
  let left = popupArrowPointPosition.left - popupRect.width / 2;
  let direction = FormPopupArrowDirection.bottom;

  if (top < layoutRect.top) {
    direction = FormPopupArrowDirection.top;
    top = popupArrowPointPosition.top + HALF_OF_POPUP_ARROW_HEIGHT;
  }

  if (isTopOverLayoutContainer(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOverLayoutContainer(left, layoutRect, popupRect)) {
    left = layoutRect.left + layoutRect.width - popupRect.width;
  }

  return { top, left: Math.max(left, layoutRect.left), direction };
}

function isBooleanKey(key: string): key is BooleanKeyOfEventModelData {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key as BooleanKeyOfEventModelData) !== -1;
}

function getChanges(event: EventModel, eventModelData: EventModelData) {
  return Object.entries(eventModelData).reduce((changes, [key, value]) => {
    const eventModelDataKey = key as keyof EventModelData;

    if (event[eventModelDataKey] instanceof TZDate) {
      // NOTE: handle TZDate
      if (compare(event[eventModelDataKey], value) !== 0) {
        changes[eventModelDataKey] = value;
      }
    } else if (event[eventModelDataKey] !== value) {
      changes[eventModelDataKey] = value;
    }

    return changes;
  }, {} as EventModelData);
}

export const EventFormPopup: FunctionComponent = () => {
  const { calendars } = useStore(calendarSelector);
  const { hide } = useDispatch('popup');
  const {
    title,
    location,
    start,
    end,
    isAllday = false,
    isPrivate = false,
    eventState = 'Busy',
    popupArrowPointPosition,
    close,
    isCreationPopup,
    event,
  } = useStore(eventFormPopupParamSelector);
  const eventBus = useEventBus();

  const floatingLayerContainer = useFloatingLayerContainer();
  const [formState, formStateDispatch] = useFormState({
    title,
    location,
    start,
    end,
    isAllday,
    isPrivate,
    state: eventState,
  });
  const datePickerRef = useRef<DateRangePicker>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<StyleProp>({});
  const [arrowLeft, setArrowLeft] = useState<number>(0);
  const [arrowDirection, setArrowDirection] = useState<FormPopupArrowDirection>(
    FormPopupArrowDirection.bottom
  );

  const layoutContainer = useLayoutContainer();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventData: EventModelData = { ...formState };

    formData.forEach((data, key) => {
      eventData[key as keyof EventModelData] = isBooleanKey(key) ? data === 'true' : data;
    });

    eventData.start = new TZDate(datePickerRef.current?.getStartDate());
    eventData.end = new TZDate(datePickerRef.current?.getEndDate());

    if (isCreationPopup) {
      eventBus.fire('beforeCreateEvent', eventData);
    } else if (event) {
      const changes = getChanges(event, eventData);

      eventBus.fire('beforeUpdateEvent', event, changes);
    }
    hide();
  };

  const popupArrowClassName = useMemo(() => {
    const top = arrowDirection === FormPopupArrowDirection.top;
    const bottom = arrowDirection === FormPopupArrowDirection.bottom;

    return cls('popup-arrow', { top, bottom });
  }, [arrowDirection]);

  useLayoutEffect(() => {
    if (popupContainerRef.current && popupArrowPointPosition && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();

      const { top, left, direction } = calculatePopupPosition(
        popupArrowPointPosition,
        layoutRect,
        popupRect
      );
      const arrowLeftPosition = popupArrowPointPosition.left - left;

      setStyle({ left, top });
      setArrowLeft(arrowLeftPosition);
      setArrowDirection(direction);
    }
  }, [layoutContainer, popupArrowPointPosition]);

  if (isNil(floatingLayerContainer) || isNil(start) || isNil(end)) {
    return null;
  }

  return createPortal(
    <div role="dialog" className={classNames.popupContainer} ref={popupContainerRef} style={style}>
      <form onSubmit={onSubmit}>
        <div className={classNames.formContainer}>
          {calendars?.length ? (
            <CalendarSelector calendars={calendars} formStateDispatch={formStateDispatch} />
          ) : (
            <PopupSection />
          )}
          <TitleInputBox
            title={title}
            isPrivate={formState.isPrivate}
            formStateDispatch={formStateDispatch}
          />
          <LocationInputBox location={location} />
          <DateSelector
            start={start}
            end={end}
            isAllday={formState.isAllday}
            formStateDispatch={formStateDispatch}
            ref={datePickerRef}
          />
          <EventStateSelector eventState={formState.state} formStateDispatch={formStateDispatch} />
          <ClosePopupButton close={close} />
          <PopupSection>
            <ConfirmPopupButton isCreationPopup={isCreationPopup} />
          </PopupSection>
        </div>
        <div className={popupArrowClassName}>
          <div className={classNames.popupArrowBorder} style={{ left: arrowLeft }}>
            <div className={classNames.popupArrowFill} />
          </div>
        </div>
      </form>
    </div>,
    floatingLayerContainer
  );
};
