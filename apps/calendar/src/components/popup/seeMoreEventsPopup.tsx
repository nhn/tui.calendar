import { h } from 'preact';
import { createPortal } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { Template } from '@src/components/template';
import {
  MONTH_EVENT_HEIGHT,
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
  MONTH_MORE_VIEW_HEADER_PADDING,
  MONTH_MORE_VIEW_HEADER_PADDING_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useFloatingLayer } from '@src/contexts/floatingLayer';
import { useMonthTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { seeMorePopupParamSelector } from '@src/selectors/popup';
import { toFormat } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

const classNames = {
  container: cls('see-more-container'),
  seeMore: cls('see-more'),
  header: cls('see-more-header'),
  list: cls('month-more-list'),
};

export function SeeMoreEventsPopup() {
  const popupParams = useStore(seeMorePopupParamSelector);
  const { date, events = [], popupPosition } = popupParams ?? {};
  const { moreView, moreViewTitle } = useMonthTheme();
  const seeMorePopupSlot = useFloatingLayer('seeMorePopupSlot');
  const eventBus = useEventBus();
  const moreEventsPopupContainerRef = useRef(null);
  const isHidden = isNil(date) || isNil(popupPosition) || isNil(seeMorePopupSlot);

  useEffect(() => {
    if (!isHidden && moreEventsPopupContainerRef.current) {
      eventBus.fire('clickMoreEventsBtn', {
        date: date.toDate(),
        target: moreEventsPopupContainerRef.current,
      });
    }
  }, [date, eventBus, isHidden]);

  if (isHidden) {
    return null;
  }

  const style = {
    height: MONTH_MORE_VIEW_HEADER_HEIGHT,
    marginBottom: MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
    padding: MONTH_MORE_VIEW_HEADER_PADDING,
    backgroundColor: moreViewTitle.backgroundColor,
  };

  const moreTitle = {
    ymd: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate().toString().padStart(2, '0'),
  };

  const moreViewListStyle = {
    height: `calc(100% - ${
      MONTH_MORE_VIEW_HEADER_HEIGHT +
      MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM +
      MONTH_MORE_VIEW_HEADER_PADDING_TOP
    }px)`,
  };

  return createPortal(
    <div
      role="dialog"
      className={classNames.container}
      style={popupPosition}
      ref={moreEventsPopupContainerRef}
    >
      <div className={classNames.seeMore} style={moreView}>
        <div className={classNames.header} style={style}>
          <Template template="monthMoreTitleDate" param={moreTitle} />
          <ClosePopupButton type="moreEvents" />
        </div>
        <div className={classNames.list} style={moreViewListStyle}>
          {events.map((uiModel) => (
            <HorizontalEvent
              key={`see-more-event-item-${uiModel.cid()}`}
              uiModel={uiModel}
              eventHeight={MONTH_EVENT_HEIGHT}
              headerHeight={MONTH_MORE_VIEW_HEADER_HEIGHT}
              flat={true}
            />
          ))}
        </div>
      </div>
    </div>,
    seeMorePopupSlot
  );
}
