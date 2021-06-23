import { FunctionComponent, h } from 'preact';

import GridEvent from '@src/components/events/gridEvent';
import { useTheme } from '@src/components/hooks/theme';
import SeeMoreHeader from '@src/components/popup/seeMoreHeader';
import { cls } from '@src/util/cssHelper';
import { convertPxToNum } from '@src/util/units';

import { SeeMorePopupParam } from '@t/store';

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = (props) => {
  const { date, events = [] } = props;

  const {
    month: { moreView, moreViewTitle, moreViewList, schedule },
  } = useTheme();
  const headerHeight =
    convertPxToNum(moreViewTitle.height) + convertPxToNum(moreViewTitle.marginBottom);
  const moreListStyle = {
    padding: moreViewList.padding,
    height: `calc(100% - ${headerHeight}px)`,
  };
  const eventHeight = convertPxToNum(schedule.height);

  return (
    <div className={cls('see-more')} style={moreView}>
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
