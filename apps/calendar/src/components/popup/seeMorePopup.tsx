import { h, FunctionComponent } from 'preact';
import { useStore } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';
import { pick } from '@src/util/utils';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import { SeeMorePopupParam } from '@t/store';
import SeeMoreHeader from '@src/components/popup/seeMoreHeader';
import GridEvent from '@src/components/events/gridEvent';

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = (props) => {
  const { date, events = [] } = props;

  const { state } = useStore('theme');
  const style = pick(
    state.month.moreView,
    'backgroundColor',
    'border',
    'boxShadow',
    'paddingBottom'
  );

  // @TODO: 요일 템플릿 적용
  const dayName = capitalizeDayName(getDayName(date.getDay()));

  return (
    <div className={cls('see-more')} style={style}>
      <SeeMoreHeader date={date.getDate()} day={dayName} />
      {events.map((event, index) => (
        <GridEvent event={event} key={`see-more-event-item-${index}`} />
      ))}
    </div>
  );
};

export default SeeMorePopup;
