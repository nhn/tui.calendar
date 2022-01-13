import { h } from 'preact';
import { createPortal } from 'preact/compat';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { Template } from '@src/components/template';
import {
  MONTH_EVENT_HEIGHT,
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
  MONTH_MORE_VIEW_PADDING,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useFloatingLayerContainer } from '@src/contexts/floatingLayer';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { seeMorePopupParamSelector } from '@src/selectors/popup';
import { toFormat } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

export function SeeMoreEventsPopup() {
  const floatingLayerContainer = useFloatingLayerContainer();
  const { date, events = [], popupPosition } = useStore(seeMorePopupParamSelector);
  const {
    month: { moreView, moreViewTitle },
  } = useTheme();

  if (isNil(floatingLayerContainer) || isNil(date) || isNil(popupPosition)) {
    return null;
  }

  const style = {
    height: MONTH_MORE_VIEW_HEADER_HEIGHT,
    marginBottom: MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
    backgroundColor: moreViewTitle.backgroundColor,
  };

  const moreTitle = {
    ymd: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate(),
  };

  return createPortal(
    <div role="dialog" className={cls('see-more-container')} style={popupPosition}>
      <div className={cls('see-more')} style={{ ...moreView, padding: MONTH_MORE_VIEW_PADDING }}>
        <div className={cls('see-more-header')} style={style}>
          <Template template="monthMoreTitleDate" model={moreTitle} />
          <ClosePopupButton />
        </div>
        <div
          className={cls('month-more-list')}
          style={{
            height: `calc(100% - ${
              MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM
            }px)`,
          }}
        >
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
    floatingLayerContainer
  );
}
