import { h, Fragment, VNode } from 'preact';
import range from 'tui-code-snippet/array/range';
import { TimeUnit } from '@src/model';
import { first, last } from '@src/util/array';
import { getScheduleInDateRangeFilter } from '@src/controller/core';
import TZDate from '@src/time/date';
import Schedule, { isBackgroundEvent } from '@src/model/schedule';
import { prefixer } from '@src/components/timegrid';
import { BackgroundEvent } from '@src/components/events/background';
import { getTopPercentByTime } from '@src/controller/times';
import { toPercent } from '@src/util/units';

const styles = {
  column: prefixer('column'),
  gridline: prefixer('gridline'),
  gridlineHalf: prefixer('gridline-half')
};

interface Props {
  unit: TimeUnit;
  times: TZDate[];
  width: string;
  backgroundColor: string;
  start?: number;
  end?: number;
  events: Schedule[];
  renderGridlineChild?: (time: TZDate) => VNode;
}

function renderGridlines(times: TZDate[], renderGridlineChild?: (time: TZDate) => VNode) {
  return (
    <Fragment>
      {times.map((time, index) => {
        return (
          <div className={styles.gridline} key={`gridline-${index}`}>
            <div className={styles.gridlineHalf}></div>
            {renderGridlineChild ? renderGridlineChild(time) : null}
          </div>
        );
      })}
    </Fragment>
  );
}

function renderBackgroundEvents(events: Schedule[], startTime: TZDate, endTime: TZDate) {
  const backgroundEvents = events.filter(isBackgroundEvent);

  return (
    <Fragment>
      {backgroundEvents.map((event, index) => {
        const top = getTopPercentByTime(event.start, startTime, endTime);
        const bottom = getTopPercentByTime(event.end, startTime, endTime);
        const height = bottom - top;

        return (
          <BackgroundEvent
            model={event}
            top={toPercent(top)}
            height={toPercent(height)}
            key={`backgroundEvent-${index}`}
          />
        );
      })}
    </Fragment>
  );
}

export function Column(props: Props) {
  const {
    start = 0,
    end = props.times.length,
    width,
    backgroundColor,
    renderGridlineChild
  } = props;
  const times = props.times.slice(start, end + 1);
  const startTime = first(times);
  const endTime = last(times);
  const events = props.events.filter(getScheduleInDateRangeFilter(startTime, endTime));

  const renderedTimes = times.slice(0, times.length - 1);

  return (
    <div className={styles.column} style={{ width, backgroundColor }}>
      {renderGridlines(renderedTimes, renderGridlineChild)}
      {renderBackgroundEvents(events, startTime, endTime)}
    </div>
  );
}

Column.displayName = 'Column';
Column.defaultProps = {
  unit: 'hour',
  times: range(0, 25).map(hour => {
    const time = new TZDate();
    time.setHours(hour, 0, 0, 0);

    return time;
  }),
  width: '72px',
  backgroundColor: '',
  events: []
};
