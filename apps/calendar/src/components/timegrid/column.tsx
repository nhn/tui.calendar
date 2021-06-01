import { h, VNode } from 'preact';
import range from 'tui-code-snippet/array/range';
import { TimeUnit } from '@src/model';
import { first, last } from '@src/util/array';
import TZDate from '@src/time/date';
import Schedule, { isBackgroundEvent } from '@src/model/schedule';
import { CreationGuideInfo } from '@src/components/timegrid';
import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { getTopHeightByTime } from '@src/controller/times';
import { toPercent } from '@src/util/units';
import { CreationGuide } from '@src/components/timegrid/creationGuide';
import { cls } from '@src/util/cssHelper';
import { getViewModels, isBetween } from '@src/controller/column';
import ScheduleViewModel from '@src/model/scheduleViewModel';

const classNames = {
  column: cls('column'),
  grid: cls('grid'),
  gridline: cls('gridline'),
  gridlineHalf: cls('gridline-half'),
  backgrounds: cls('background-events'),
  events: cls('events'),
};

interface Props {
  unit: TimeUnit;
  slot: number;
  times: TZDate[];
  width: string;
  backgroundColor: string;
  start?: number;
  end?: number;
  events: ScheduleViewModel[];
  creationGuide: CreationGuideInfo | null;
  index: number;
  readOnly?: boolean;
  renderGridlineChild?: (time: TZDate) => VNode;
}

function renderGridlines(times: TZDate[], renderGridlineChild?: (time: TZDate) => VNode) {
  return (
    <div className={classNames.grid}>
      {times.map((time, index) => {
        return (
          <div className={classNames.gridline} key={`gridline-${index}`}>
            <div className={classNames.gridlineHalf}></div>
            {renderGridlineChild ? renderGridlineChild(time) : null}
          </div>
        );
      })}
    </div>
  );
}

function renderBackgroundEvents(events: ScheduleViewModel[], startTime: TZDate, endTime: TZDate) {
  const backgroundEvents = events.filter(isBackgroundEvent);

  return (
    <div className={classNames.backgrounds}>
      {backgroundEvents.map((event, index) => {
        const { top, height } = getTopHeightByTime(
          event.model.start,
          event.model.end,
          startTime,
          endTime
        );

        return (
          <BackgroundEvent
            viewModel={event}
            top={toPercent(top)}
            height={toPercent(height)}
            key={`backgroundEvent-${index}`}
          />
        );
      })}
    </div>
  );
}

function renderEvents(events: ScheduleViewModel[], startTime: TZDate, endTime: TZDate) {
  const marginRight = 8;
  const style = {
    marginRight,
  };
  const viewModels = getViewModels(events, startTime, endTime);

  return (
    <div className={classNames.events} style={style}>
      {viewModels.map((viewModel, index) => {
        return <TimeEvent viewModel={viewModel} key={index} />;
      })}
    </div>
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
    readOnly,
    index,
    renderGridlineChild,
  } = props;
  const times = props.times.slice(start, end + 1);
  const startTime = first(times);
  const endTime = last(times);
  const events = props.events.filter(isBetween(startTime, endTime));
  const renderedTimes = times.slice(0, times.length - 1);
  const style = {
    width,
    backgroundColor,
  };

  return (
    <div className={classNames.column} style={style} data-index={index}>
      {renderGridlines(renderedTimes, renderGridlineChild)}
      {renderBackgroundEvents(events, startTime, endTime)}
      {renderEvents(events, startTime, endTime)}
      {!readOnly ? renderCreationGuide(creationGuide, startTime, endTime) : null}
    </div>
  );
}

Column.displayName = 'Column';
Column.defaultProps = {
  unit: 'minute',
  slot: 30,
  times: range(0, 25).map((hour) => {
    const time = new TZDate();
    time.setHours(hour, 0, 0, 0);

    return time;
  }),
  width: '72px',
  backgroundColor: '',
  events: [],
  creationGuide: null,
  readOnly: false,
  index: 0,
} as Props;
