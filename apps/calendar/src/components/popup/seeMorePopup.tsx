import { FunctionComponent, h } from 'preact';

import GridEvent from '@src/components/events/gridEvent';
import { useTheme } from '@src/components/hooks/theme';
import SeeMoreHeader, { HEIGHT as headerHeight } from '@src/components/popup/seeMoreHeader';
import { eventStyle } from '@src/components/view/month';
import { cls } from '@src/util/cssHelper';

import { SeeMorePopupParam } from '@t/store';

const PADDING_BOTTOM = 17;

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = (props) => {
  const { date, events = [] } = props;

  const {
    month: { moreView },
  } = useTheme();

  return (
    <div className={cls('see-more')} style={{ ...moreView, paddingBottom: PADDING_BOTTOM }}>
      <SeeMoreHeader date={date} />
      <div className={cls('month-more-list')} style={{ height: `calc(100% - ${headerHeight}px)` }}>
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
