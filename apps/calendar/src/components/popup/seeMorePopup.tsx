import { FunctionComponent, h } from 'preact';

import GridEvent from '@src/components/events/gridEvent';
import { useTheme } from '@src/components/hooks/theme';
import SeeMoreHeader, {
  HEIGHT as headerHeight,
  MARGIN_BOTTOM as headerMarginBottom,
} from '@src/components/popup/seeMoreHeader';
import { eventStyle } from '@src/components/view/month';
import { cls } from '@src/util/cssHelper';

import { SeeMorePopupParam } from '@t/store';

export const MIN_WIDTH = 280;
export const PADDING = 5;

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = ({ date, events = [] }) => {
  const {
    month: { moreView },
  } = useTheme();

  return (
    <div className={cls('see-more')} style={{ ...moreView, padding: PADDING }}>
      <SeeMoreHeader date={date} />
      <div
        className={cls('month-more-list')}
        style={{ height: `calc(100% - ${headerHeight + headerMarginBottom}px)` }}
      >
        {events.map((viewModel) => (
          <GridEvent
            key={`see-more-event-item-${viewModel.cid()}`}
            viewModel={viewModel}
            eventHeight={eventStyle.HEIGHT}
            headerHeight={headerHeight}
            flat={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeMorePopup;
