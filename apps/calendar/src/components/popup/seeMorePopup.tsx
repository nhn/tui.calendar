import { h, FunctionComponent } from 'preact';
import { useActions, useStore } from '../hooks/store';
import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { pick } from '@src/util/utils';
import { capitalizeDayName, getDayName } from '@src/util/dayName';

interface MoreHeaderProps {
  date: number;
  day: string;
}

interface MoreTitleProps {
  date: number;
  day: string;
}

const MoreTitle: FunctionComponent<MoreTitleProps> = (props) => {
  const { date, day } = props;
  const { state } = useStore('theme');
  const style = pick(
    state.month.moreViewTitle,
    'height',
    'marginBottom',
    'backgroundColor',
    'borderBottom',
    'padding'
  );

  return (
    <div className={cls('more-title')} style={style}>
      <span className={cls('more-title-date')}>{date}</span>{' '}
      <span className={cls('more-title-day')}>{day}</span>
    </div>
  );
};

const MoreHeader: FunctionComponent<MoreHeaderProps> = (props) => {
  const { date, day } = props;
  const { hide } = useActions('layerPopup');

  return (
    <div className={cls('see-more-header')}>
      <MoreTitle date={date} day={day} />
      <button type="button" className={cls('see-more-close')} onClick={hide}>
        X
      </button>
    </div>
  );
};

interface SeeMoreProps {
  date: TZDate;
  events: Schedule[];
  layout: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

interface EventInSeeMoreProps {
  event: Schedule;
}

const EventItem: FunctionComponent<EventInSeeMoreProps> = (props) => {
  const {
    event: { title },
  } = props;

  // @TODO: 일정 타이틀 템플릿 적용
  return <div>{title}</div>;
};

const SeeMorePopup: FunctionComponent<SeeMoreProps> = (props) => {
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
      <MoreHeader date={date.getDate()} day={dayName} />
      {events.map((event, index) => (
        <EventItem event={event} key={`see-more-event-item-${index}`} />
      ))}
    </div>
  );
};

export default SeeMorePopup;
