import { h, Fragment, VNode } from 'preact';
import range from 'tui-code-snippet/array/range';
import { TimeUnit } from '@src/model';
import { first, last } from '@src/util/array';
import { getScheduleInDateRangeFilter } from '@src/controller/core';
import TZDate from '@src/time/date';
import Schedule, { isBackgroundEvent } from '@src/model/schedule';
import { prefixer, CreationGuideInfo } from '@src/components/timegrid';
import { BackgroundEvent } from '@src/components/events/background';
import { getTopHeightByTime } from '@src/controller/times';
import { toPercent } from '@src/util/units';
import { CreationGuide } from './creationGuide';

const classNames = {
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
  creationGuide: CreationGuideInfo | null;
  renderGridlineChild?: (time: TZDate) => VNode;
}

function renderGridlines(times: TZDate[], renderGridlineChild?: (time: TZDate) => VNode) {
  return (
    <Fragment>
      {times.map((time, index) => {
        return (
          <div className={classNames.gridline} key={`gridline-${index}`}>
            <div className={classNames.gridlineHalf}></div>
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
        const { top, height } = getTopHeightByTime(event.start, event.end, startTime, endTime);

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

function renderCreationGuide(
  creationGuide: CreationGuideInfo | null,
  startTime: TZDate,
  endTime: TZDate
) {
  if (!creationGuide) {
    return null;
  }

  const { top, height } = getTopHeightByTime(
    creationGuide.start,
    creationGuide.end,
    startTime,
    endTime
  );

  return <CreationGuide {...creationGuide} top={top} height={height} />;
}

export function Column(props: Props) {
  const {
    start = 0,
    end = props.times.length,
    width,
    backgroundColor,
    creationGuide,
    renderGridlineChild
  } = props;
  const times = props.times.slice(start, end + 1);
  const startTime = first(times);
  const endTime = last(times);
  const events = props.events.filter(getScheduleInDateRangeFilter(startTime, endTime));

  const renderedTimes = times.slice(0, times.length - 1);

  return (
    <div className={classNames.column} style={{ width, backgroundColor }}>
      {renderGridlines(renderedTimes, renderGridlineChild)}
      {renderBackgroundEvents(events, startTime, endTime)}
      {renderCreationGuide(creationGuide, startTime, endTime)}
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
  events: [],
  creationGuide: null
} as Props;
