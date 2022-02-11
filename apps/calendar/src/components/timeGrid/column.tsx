import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelection } from '@src/components/timeGrid/gridSelection';
import { getUIModels } from '@src/controller/column';
import { getTopHeightByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { first, last } from '@src/utils/array';

import { TimeGridRow } from '@t/grid';

const classNames = {
  column: cls('column'),
  grid: cls('grid'),
  backgrounds: cls('background-events'),
  events: cls('events'),
};

function GridLines({ timeGridRows }: { timeGridRows: TimeGridRow[] }) {
  return (
    <div className={classNames.grid}>
      {timeGridRows.map((time, index) => (
        <div
          key={`gridline-${time.startTime}-${time.endTime}`}
          className={cls('gridline-half', `gridline-half--${index % 2 === 1 ? 'lower' : 'upper'}`)}
          style={{
            top: toPercent(time.top),
            height: toPercent(time.height),
          }}
        />
      ))}
    </div>
  );
}

function BackgroundEvents({
  events,
  startTime,
  endTime,
}: {
  events: EventUIModel[];
  startTime: TZDate;
  endTime: TZDate;
}) {
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

function VerticalEvents({
  events,
  startTime,
  endTime,
}: {
  events: EventUIModel[];
  startTime: TZDate;
  endTime: TZDate;
}) {
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

interface Props {
  timeGridRows: TimeGridRow[];
  gridSelection: TimeGridSelectionDataByCol | null;
  columnDate: TZDate;
  columnWidth: string;
  events: EventUIModel[];
  backgroundColor?: string;
  readOnly?: boolean;
}

export function Column({
  columnDate,
  columnWidth,
  events,
  timeGridRows,
  gridSelection,
  backgroundColor,
}: Props) {
  const [startTime, endTime] = useMemo(() => {
    const { startTime: startTimeStr } = first(timeGridRows);
    const { endTime: endTimeStr } = last(timeGridRows);
    const startHourAndMinutes = startTimeStr.split(':').map(Number) as [number, number];
    const endHourAndMinutes = endTimeStr.split(':').map(Number) as [number, number];

    const start = new TZDate(columnDate);
    const end = new TZDate(columnDate);
    start.setHours(...startHourAndMinutes);
    end.setHours(...endHourAndMinutes);

    return [start, end];
  }, [columnDate, timeGridRows]);

  const gridSelectionProps = useMemo(() => {
    if (!gridSelection) {
      return null;
    }

    const { startRowIndex, endRowIndex, isStartingColumn, isSelectingMultipleColumns } =
      gridSelection;

    const { top } = timeGridRows[startRowIndex];
    const height = timeGridRows[endRowIndex].top + timeGridRows[endRowIndex].height - top;
    let text = '';
    if (isSelectingMultipleColumns && isStartingColumn) {
      text = timeGridRows[startRowIndex].startTime;
    } else if (isSelectingMultipleColumns) {
      text = '';
    } else {
      text = `${timeGridRows[startRowIndex].startTime} - ${timeGridRows[endRowIndex].endTime}`;
    }

    return {
      top,
      height,
      text,
    };
  }, [gridSelection, timeGridRows]);

  const style = {
    width: columnWidth,
    backgroundColor,
  };

  return (
    <div className={classNames.column} style={style}>
      <BackgroundEvents events={events} startTime={startTime} endTime={endTime} />
      {gridSelectionProps ? <GridSelection {...gridSelectionProps} /> : null}
      <VerticalEvents events={events} startTime={startTime} endTime={endTime} />
    </div>
  );
}
