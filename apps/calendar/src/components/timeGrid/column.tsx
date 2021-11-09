import { FunctionComponent, h, VNode } from 'preact';

import range from 'tui-code-snippet/array/range';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelectionInfo } from '@src/components/timeGrid';
import { GridSelection } from '@src/components/timeGrid/gridSelection';
import { getUIModels, isBetween } from '@src/controller/column';
import { getTopHeightByTime } from '@src/controller/times';
import { TimeUnit } from '@src/model';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { first, last } from '@src/util/array';
import { cls, toPercent } from '@src/util/cssHelper';

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
  events?: EventUIModel[];
  gridSelection?: GridSelectionInfo | null;
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

function renderBackgroundEvents(events: EventUIModel[], startTime: TZDate, endTime: TZDate) {
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

function renderEvents(events: EventUIModel[], startTime: TZDate, endTime: TZDate) {
  const marginRight = 8;
  const style = { marginRight };
  const uiModels = getUIModels(events, startTime, endTime);

  return (
    <div className={classNames.events} style={style}>
      {uiModels.map((uiModel, index) => {
        return <TimeEvent eventModels={uiModel} key={index} />;
      })}
    </div>
  );
}

function renderGridSelection(
  gridSelection: GridSelectionInfo | null,
  startTime: TZDate,
  endTime: TZDate
) {
  if (!gridSelection) {
    return null;
  }

  const { top, height } = getTopHeightByTime(
    gridSelection.start,
    gridSelection.end,
    startTime,
    endTime
  );

  return <GridSelection {...gridSelection} top={top} height={height} />;
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
  gridSelection = null,
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
      {!readOnly ? renderGridSelection(gridSelection, startTime, endTime) : null}
    </div>
  );
};
