import { FunctionComponent, h } from 'preact';

import GridEvent from '@src/components/events/gridEvent';
import { useTheme } from '@src/components/hooks/theme';
import SeeMoreHeader from '@src/components/popup/seeMoreHeader';
import {
  MONTH_EVENT_HEIGHT,
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
  MONTH_MORE_VIEW_PADDING,
} from '@src/constants/style';
import { cls } from '@src/util/cssHelper';

import { SeeMorePopupParam } from '@t/store';

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = ({ date, events = [] }) => {
  const {
    month: { moreView },
  } = useTheme();

  return (
    <div className={cls('see-more')} style={{ ...moreView, padding: MONTH_MORE_VIEW_PADDING }}>
      <SeeMoreHeader date={date} />
      <div
        className={cls('month-more-list')}
        style={{
          height: `calc(100% - ${
            MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM
          }px)`,
        }}
      >
        {events.map((viewModel) => (
          <GridEvent
            key={`see-more-event-item-${viewModel.cid()}`}
            viewModel={viewModel}
            eventHeight={MONTH_EVENT_HEIGHT}
            headerHeight={MONTH_MORE_VIEW_HEADER_HEIGHT}
            flat={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeMorePopup;
