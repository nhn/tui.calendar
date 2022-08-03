import { h } from 'preact';
import { createPortal } from 'preact/compat';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import type { DateRangePicker } from 'tui-date-picker';

import { CalendarSelector } from '@src/components/popup/calendarSelector';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { DateSelector } from '@src/components/popup/dateSelector';
import { EventStateSelector } from '@src/components/popup/eventStateSelector';
import { LocationInputBox } from '@src/components/popup/locationInputBox';
import { PopupSection } from '@src/components/popup/popupSection';
import { TitleInputBox } from '@src/components/popup/titleInputBox';
import { Template } from '@src/components/template';
import {
  BOOLEAN_KEYS_OF_EVENT_MODEL_DATA,
  FormPopupArrowDirection,
  HALF_OF_POPUP_ARROW_HEIGHT,
} from '@src/constants/popup';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useFloatingLayer } from '@src/contexts/floatingLayer';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls } from '@src/helpers/css';
import { isLeftOutOfLayout, isTopOutOfLayout } from '@src/helpers/popup';
import { FormStateActionType, useFormState } from '@src/hooks/popup/useFormState';
import type EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import { eventFormPopupParamSelector } from '@src/selectors/popup';
import TZDate from '@src/time/date';
import { compare } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import type { FormEvent, StyleProp } from '@t/components/common';
import type { BooleanKeyOfEventObject, EventObject } from '@t/events';
import type { PopupArrowPointPosition, Rect } from '@t/store';

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

  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = layoutRect.left + layoutRect.width - popupRect.width;
  }

  return {
    top: top + window.scrollY,
    left: Math.max(left, layoutRect.left) + window.scrollX,
    direction,
  };
}

function isBooleanKey(key: string): key is BooleanKeyOfEventObject {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key as BooleanKeyOfEventObject) !== -1;
}

function getChanges(event: EventModel, eventObject: EventObject) {
  return Object.entries(eventObject).reduce((changes, [key, value]) => {
    const eventObjectKey = key as keyof EventObject;

    if (event[eventObjectKey] instanceof TZDate) {
      // NOTE: handle TZDate
      if (compare(event[eventObjectKey], value) !== 0) {
        changes[eventObjectKey] = value;
      }
    } else if (event[eventObjectKey] !== value) {
      changes[eventObjectKey] = value;
    }

    return changes;
  }, {} as EventObject);
}

export function EventFormPopup() {
  const { calendars } = useStore(calendarSelector);
  const { hideAllPopup } = useDispatch('popup');
  const popupParams = useStore(eventFormPopupParamSelector);
  const { start, end, popupArrowPointPosition, close, isCreationPopup, event } = popupParams ?? {};
  const eventBus = useEventBus();
  const formPopupSlot = useFloatingLayer('formPopupSlot');
  const [formState, formStateDispatch] = useFormState(calendars[0]?.id);

  const datePickerRef = useRef<DateRangePicker>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<StyleProp>({});
  const [arrowLeft, setArrowLeft] = useState<number>(0);
  const [arrowDirection, setArrowDirection] = useState<FormPopupArrowDirection>(
    FormPopupArrowDirection.bottom
  );

  const layoutContainer = useLayoutContainer();

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

  // Sync store's popupParams with formState when editing event
  useEffect(() => {
    if (isPresent(popupParams) && isPresent(event)) {
      formStateDispatch({
        type: FormStateActionType.init,
        event: {
          title: popupParams.title,
          location: popupParams.location,
          isAllday: popupParams.isAllday,
          isPrivate: popupParams.isPrivate,
          calendarId: event.calendarId,
          state: popupParams.eventState,
        },
      });
    }
  }, [calendars, event, formStateDispatch, popupParams]);

  // Reset form states when closing the popup
  useEffect(() => {
    if (isNil(popupParams)) {
      formStateDispatch({ type: FormStateActionType.reset });
    }
  }, [formStateDispatch, popupParams]);

  if (isNil(start) || isNil(end) || isNil(formPopupSlot)) {
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const eventData: EventObject = { ...formState };

    formData.forEach((data, key) => {
      eventData[key as keyof EventObject] = isBooleanKey(key) ? data === 'true' : data;
    });

    eventData.start = new TZDate(datePickerRef.current?.getStartDate());
    eventData.end = new TZDate(datePickerRef.current?.getEndDate());

    if (isCreationPopup) {
      eventBus.fire('beforeCreateEvent', eventData);
    } else if (event) {
      const changes = getChanges(event, eventData);

      eventBus.fire('beforeUpdateEvent', { event: event.toEventObject(), changes });
    }
    hideAllPopup();
  };

  return createPortal(
    <div role="dialog" className={classNames.popupContainer} ref={popupContainerRef} style={style}>
      <form onSubmit={onSubmit}>
        <div className={classNames.formContainer}>
          {calendars?.length ? (
            <CalendarSelector
              selectedCalendarId={formState.calendarId}
              calendars={calendars}
              formStateDispatch={formStateDispatch}
            />
          ) : (
            <PopupSection />
          )}
          <TitleInputBox
            title={formState.title}
            isPrivate={formState.isPrivate}
            formStateDispatch={formStateDispatch}
          />
          <LocationInputBox location={formState.location} formStateDispatch={formStateDispatch} />
          <DateSelector
            start={start}
            end={end}
            isAllday={formState.isAllday}
            formStateDispatch={formStateDispatch}
            ref={datePickerRef}
          />
          <EventStateSelector eventState={formState.state} formStateDispatch={formStateDispatch} />
          <ClosePopupButton type="form" close={close} />
          <PopupSection>
            <ConfirmPopupButton>
              {isCreationPopup ? (
                <Template template="popupSave" />
              ) : (
                <Template template="popupUpdate" />
              )}
            </ConfirmPopupButton>
          </PopupSection>
        </div>
        <div className={popupArrowClassName}>
          <div className={classNames.popupArrowBorder} style={{ left: arrowLeft }}>
            <div className={classNames.popupArrowFill} />
          </div>
        </div>
      </form>
    </div>,
    formPopupSlot
  );
}
