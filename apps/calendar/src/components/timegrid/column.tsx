import { FunctionComponent, h, VNode } from 'preact';
import range from 'tui-code-snippet/array/range';

import { TimeUnit } from '@src/model';
import { first, last } from '@src/util/array';
import TZDate from '@src/time/date';
import { isBackgroundEvent } from '@src/model/schedule';
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
  unit?: TimeUnit;
  slot?: number;
  times?: TZDate[];
  width?: string;
  backgroundColor?: string;
  start?: number;
  end?: number;
  events?: ScheduleViewModel[];
  creationGuide?: CreationGuideInfo | null;
  index?: number;
  readOnly?: boolean;
  renderGridlineChild?: (time: TZDate) => VNode;
}

function renderGridlines(times: TZDate[], renderGridlineChild?: (time: TZDate) => VNode) {
  return (
    <div className={classNames.grid}>
      {times.map((time, index) => (
        <div className={classNames.gridline} key={`gridline-${index}`}>
          <div className={classNames.gridlineHalf} />
          {renderGridlineChild ? renderGridlineChild(time) : null}
        </div>
      ))}
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
            eventModels={event}
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
  const style = { marginRight };
  const viewModels = getViewModels(events, startTime, endTime);

  return (
    <div className={classNames.events} style={style}>
      {viewModels.map((viewModel, index) => {
        return <TimeEvent eventModels={viewModel} key={index} />;
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

export const Column: FunctionComponent<Props> = ({
  times = range(0, 25).map((hour) => {
    const time = new TZDate();
    time.setHours(hour, 0, 0, 0);

    return time;
  }),
  events = [],
  unit = 'minute',
  slot = 30,
  start = 0,
  end = times.length,
  width = '72px',
  backgroundColor = '',
  creationGuide = null,
  readOnly = false,
  index = 0,
  renderGridlineChild,
}) => {
  const filteredTimes = times.slice(start, end + 1);
  const startTime = first(filteredTimes);
  const endTime = last(filteredTimes);
  const filteredEvents = events.filter(isBetween(startTime, endTime));
  const renderedTimes = filteredTimes.slice(0, filteredTimes.length - 1);
  const style = {
    width,
    backgroundColor,
  };

  return (
    <div className={classNames.column} style={style} data-index={index}>
      {renderGridlines(renderedTimes, renderGridlineChild)}
      {renderBackgroundEvents(filteredEvents, startTime, endTime)}
      {renderEvents(filteredEvents, startTime, endTime)}
      {!readOnly ? renderCreationGuide(creationGuide, startTime, endTime) : null}
    </div>
  );
};
