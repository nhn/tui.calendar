import { FunctionComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';

import { EventDetailSectionButton } from '@src/components/popup/eventDetailSectionButton';
import { EventDetailSectionDetail } from '@src/components/popup/eventDetailSectionDetail';
import { EventDetailSectionHeader } from '@src/components/popup/eventDetailSectionHeader';
import { useStore } from '@src/contexts/calendarStore';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayerRef';
import { useLayoutContainer } from '@src/contexts/layoutContainerRef';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { StyleProp } from '@t/components/common';
import { EventDetailPopupParam, Rect } from '@t/store';

const classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
};

function adjustTopPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  let top = eventRect.top + eventRect.height / 2 - popupRect.height / 2;

  if (top + popupRect.height > layoutRect.top + layoutRect.height) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  return top < 0 ? 0 : top;
}

function adjustLeftPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  let left = eventRect.left + eventRect.width;

  if (left + popupRect.width > layoutRect.left + layoutRect.width) {
    left = eventRect.left - popupRect.width;
  }

  return left < layoutRect.left ? layoutRect.left : left;
}

export const EventDetailPopup: FunctionComponent = () => {
  const { event, eventRect } = useStore(
    (state) => (state.popup.param as EventDetailPopupParam) ?? {}
  );
  const layoutContainer = useLayoutContainer();
  const floatingLayerContainer = useFloatingLayerContainer();
  const popupContainerRef = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<StyleProp>({});

  useLayoutEffect(() => {
    if (popupContainerRef.current && eventRect && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();

      const top = adjustTopPosition(eventRect, layoutRect, popupRect);
      const left = adjustLeftPosition(eventRect, layoutRect, popupRect);

      setStyle({ top, left });
    }
  }, [eventRect, layoutContainer]);

  if (isNil(event) || isNil(eventRect) || isNil(floatingLayerContainer)) {
    return null;
  }

  const {
    title = '',
    isAllDay = false,
    start = new TZDate(),
    end = new TZDate(),
    location,
    recurrenceRule,
    attendees,
    state,
    calendarId,
    bgColor,
    body,
    isReadOnly,
  } = event;

  return createPortal(
    <div className={classNames.popupContainer} ref={popupContainerRef} style={style}>
      <div className={classNames.detailContainer}>
        <EventDetailSectionHeader title={title} isAllday={isAllDay} start={start} end={end} />
        <EventDetailSectionDetail
          location={location}
          recurrenceRule={recurrenceRule}
          attendees={attendees}
          state={state}
          calendarId={calendarId}
          body={body}
        />
        {!isReadOnly && <EventDetailSectionButton />}
      </div>
      <div className={cls('popup-top-line')} style={{ backgroundColor: bgColor }} />
    </div>,
    floatingLayerContainer
  );
};
