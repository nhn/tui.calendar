import { FunctionComponent, h } from 'preact';
import { createPortal } from 'preact/compat';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import { EventDetailSectionButton } from '@src/components/popup/eventDetailSectionButton';
import { EventDetailSectionDetail } from '@src/components/popup/eventDetailSectionDetail';
import { EventDetailSectionHeader } from '@src/components/popup/eventDetailSectionHeader';
import { HALF_OF_POPUP_ARROW_HEIGHT } from '@src/constants/popup';
import { useStore } from '@src/contexts/calendarStore';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayer';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls } from '@src/helpers/css';
import { eventDetailPopupParamSelector } from '@src/selectors/popup';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { StyleProp } from '@t/components/common';
import { Rect } from '@t/store';

enum PopupArrowDirection {
  right = 'right',
  left = 'left',
}

const classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
  topLine: cls('popup-top-line'),
  border: cls('popup-arrow-border'),
  fill: cls('popup-arrow-fill'),
};

function calculatePopupPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  let top = eventRect.top + eventRect.height / 2 - popupRect.height / 2;
  let left = eventRect.left + eventRect.width;

  if (top + popupRect.height > layoutRect.top + layoutRect.height) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (left + popupRect.width > layoutRect.left + layoutRect.width) {
    left = eventRect.left - popupRect.width;
  }

  return [Math.max(0, top), Math.max(left, layoutRect.left)];
}

function calculatePopupArrowPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  const top = eventRect.top + eventRect.height / 2;
  const popupLeft = eventRect.left + eventRect.width;

  const isOverLayoutContainer = popupLeft + popupRect.width > layoutRect.left + layoutRect.width;
  const direction = isOverLayoutContainer ? PopupArrowDirection.right : PopupArrowDirection.left;

  return { top, direction };
}

export const EventDetailPopup: FunctionComponent = () => {
  const { event, eventRect } = useStore(eventDetailPopupParamSelector);
  const layoutContainer = useLayoutContainer();
  const floatingLayerContainer = useFloatingLayerContainer();
  const popupContainerRef = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<StyleProp>({});
  const [arrowTop, setArrowTop] = useState<number>(0);
  const [arrowDirection, setArrowDirection] = useState<PopupArrowDirection>(
    PopupArrowDirection.left
  );

  const popupArrowClassName = useMemo(() => {
    const right = arrowDirection === PopupArrowDirection.right;
    const left = arrowDirection === PopupArrowDirection.left;

    return cls('popup-arrow', { right, left });
  }, [arrowDirection]);

  useLayoutEffect(() => {
    if (popupContainerRef.current && eventRect && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();

      const [top, left] = calculatePopupPosition(eventRect, layoutRect, popupRect);
      const { top: arrowTopPosition, direction } = calculatePopupArrowPosition(
        eventRect,
        layoutRect,
        popupRect
      );

      setStyle({ top, left });
      setArrowTop(arrowTopPosition - top - HALF_OF_POPUP_ARROW_HEIGHT);
      setArrowDirection(direction);
    }
  }, [eventRect, layoutContainer]);

  if (isNil(event) || isNil(eventRect) || isNil(floatingLayerContainer)) {
    return null;
  }

  const {
    title = '',
    isAllday = false,
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
    <div role="dialog" className={classNames.popupContainer} ref={popupContainerRef} style={style}>
      <div className={classNames.detailContainer}>
        <EventDetailSectionHeader title={title} isAllday={isAllday} start={start} end={end} />
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
      <div className={classNames.topLine} style={{ backgroundColor: bgColor }} />
      <div className={popupArrowClassName}>
        <div className={classNames.border} style={{ top: arrowTop }}>
          <div className={classNames.fill} />
        </div>
      </div>
    </div>,
    floatingLayerContainer
  );
};
