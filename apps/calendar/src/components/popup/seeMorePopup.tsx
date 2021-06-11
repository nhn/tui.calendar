import { h, FunctionComponent } from 'preact';

import { useStore } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';
import { pick } from '@src/util/utils';
import { SeeMorePopupParam } from '@t/store';
import SeeMoreHeader from '@src/components/popup/seeMoreHeader';
import GridEvent from '@src/components/events/gridEvent';
import { convertPxToNum } from '@src/util/units';

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = (props) => {
  const { date, events = [] } = props;

  const {
    state: {
      month: { moreView, moreViewTitle, moreViewList, schedule },
    },
  } = useStore('theme');
  const style = pick(moreView, 'backgroundColor', 'border', 'boxShadow', 'paddingBottom');
  const headerHeight = convertPxToNum(moreViewTitle.height, moreViewTitle.marginBottom);
  const moreListStyle = {
    padding: moreViewList.padding,
    height: `calc(100% - ${headerHeight}px)`,
  };
  const eventHeight = convertPxToNum(schedule.height);

  return (
    <div className={cls('see-more')} style={style}>
      <SeeMoreHeader date={date} />
      <div className={cls('month-more-list')} style={moreListStyle}>
        {events.map((viewModel) => (
          <GridEvent
            key={`see-more-event-item-${viewModel.cid()}`}
            viewModel={viewModel}
            eventHeight={eventHeight}
            headerHeight={headerHeight}
            flat={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeMorePopup;
