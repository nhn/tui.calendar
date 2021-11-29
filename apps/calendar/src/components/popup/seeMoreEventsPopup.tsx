import { FunctionComponent, h } from 'preact';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import Template from '@src/components/template';
import {
  MONTH_EVENT_HEIGHT,
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
  MONTH_MORE_VIEW_PADDING,
} from '@src/constants/style';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { toFormat } from '@src/time/datetime';

import { SeeMorePopupParam } from '@t/store';

export const SeeMoreEventsPopup: FunctionComponent<SeeMorePopupParam> = ({ date, events = [] }) => {
  const {
    month: { moreView, moreViewTitle },
  } = useTheme();

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

  return (
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
  );
};
