import { h } from 'preact';
import { createPortal } from 'preact/compat';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import { EventDetailSectionDetail } from '@src/components/popup/eventDetailSectionDetail';
import { EventDetailSectionHeader } from '@src/components/popup/eventDetailSectionHeader';
import { DetailPopupArrowDirection, HALF_OF_POPUP_ARROW_HEIGHT } from '@src/constants/popup';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayer';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls } from '@src/helpers/css';
import { isLeftOutOfLayout, isTopOutOfLayout } from '@src/helpers/popup';
import { eventDetailPopupParamSelector } from '@src/selectors/popup';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { StyleProp } from '@t/components/common';
import { Rect } from '@t/store';

const classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
  topLine: cls('popup-top-line'),
  border: cls('popup-arrow-border'),
  fill: cls('popup-arrow-fill'),
  sectionButton: cls('popup-section', 'section-button'),
  content: cls('content'),
  editIcon: cls('icon', 'ic-edit'),
  deleteIcon: cls('icon', 'ic-delete'),
  editButton: cls('edit-button'),
  deleteButton: cls('delete-button'),
  verticalLine: cls('vertical-line'),
};

function calculatePopupPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  let top = eventRect.top + eventRect.height / 2 - popupRect.height / 2;
  let left = eventRect.left + eventRect.width;

  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = eventRect.left - popupRect.width;
  }

  return [Math.max(top, layoutRect.top), Math.max(left, layoutRect.left)];
}

function calculatePopupArrowPosition(eventRect: Rect, layoutRect: Rect, popupRect: Rect) {
  const top = eventRect.top + eventRect.height / 2;
  const popupLeft = eventRect.left + eventRect.width;

  const isOutOfLayout = popupLeft + popupRect.width > layoutRect.left + layoutRect.width;
  const direction = isOutOfLayout
    ? DetailPopupArrowDirection.right
    : DetailPopupArrowDirection.left;

  return { top, direction };
}

export function EventDetailPopup() {
  const { event, eventRect } = useStore(eventDetailPopupParamSelector);
  const { showFormPopup } = useDispatch('popup');
  const layoutContainer = useLayoutContainer();
  const floatingLayerContainer = useFloatingLayerContainer();
  const popupContainerRef = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<StyleProp>({});
  const [arrowTop, setArrowTop] = useState<number>(0);
  const [arrowDirection, setArrowDirection] = useState<DetailPopupArrowDirection>(
    DetailPopupArrowDirection.left
  );

  const popupArrowClassName = useMemo(() => {
    const right = arrowDirection === DetailPopupArrowDirection.right;
    const left = arrowDirection === DetailPopupArrowDirection.left;

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
    isPrivate,
  } = event;

  const popupArrowPointPosition = {
    top: eventRect.top + eventRect.height / 2,
    left: eventRect.left + eventRect.width / 2,
  };

  const onClickEditButton = () =>
    showFormPopup({
      isCreationPopup: false,
      event,
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
      eventState: state,
      popupArrowPointPosition,
    });

  const eventDetailPopupSlot =
    floatingLayerContainer.querySelector(`.${cls('event-detail-popup-slot')}`) ??
    floatingLayerContainer;

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
        {!isReadOnly && (
          <div className={classNames.sectionButton}>
            <button type="button" className={classNames.editButton} onClick={onClickEditButton}>
              <span className={classNames.editIcon} />
              <span className={classNames.content}>Edit</span>
            </button>
            <div className={classNames.verticalLine} />
            <button type="button" className={classNames.deleteButton}>
              <span className={classNames.deleteIcon} />
              <span className={classNames.content}>Delete</span>
            </button>
          </div>
        )}
      </div>
      <div className={classNames.topLine} style={{ backgroundColor: bgColor }} />
      <div className={popupArrowClassName}>
        <div className={classNames.border} style={{ top: arrowTop }}>
          <div className={classNames.fill} />
        </div>
      </div>
    </div>,
    eventDetailPopupSlot
  );
}
