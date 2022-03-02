import { h } from 'preact';
import { memo } from 'preact/compat';
import { useMemo } from 'preact/hooks';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelectionByColumn } from '@src/components/timeGrid/gridSelectionByColumn';
import { setRenderInfoOfUIModels } from '@src/controller/column';
import { getTopHeightByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { first, last } from '@src/utils/array';

import { TimeGridRow } from '@t/grid';

const classNames = {
  column: cls('column'),
  backgrounds: cls('background-events'),
  events: cls('events'),
};

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
            uiModel={event}
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
  // @TODO: use dynamic value
  const style = { marginRight: 8 };
  const uiModels = useMemo(
    () => setRenderInfoOfUIModels(events, startTime, endTime),
    [endTime, events, startTime]
  );
  const verticalEvents = useMemo(
    () =>
      uiModels.map((uiModel) => (
        <TimeEvent key={`${uiModel.valueOf()}-${uiModel.cid()}`} uiModel={uiModel} />
      )),
    [uiModels]
  );

  return (
    <div className={classNames.events} style={style}>
      {verticalEvents}
    </div>
  );
}

interface Props {
  timeGridRows: TimeGridRow[];
  columnDate: TZDate;
  columnWidth: string;
  columnIndex: number;
  events: EventUIModel[];
  backgroundColor?: string;
  readOnly?: boolean;
}

export const Column = memo(function Column({
  columnDate,
  columnWidth,
  columnIndex,
  events,
  timeGridRows,
  backgroundColor,
}: Props) {
  const [startTime, endTime] = useMemo(() => {
    const { startTime: startTimeStr } = first(timeGridRows);
    const { endTime: endTimeStr } = last(timeGridRows);

    const start = setTimeStrToDate(columnDate, startTimeStr);
    const end = setTimeStrToDate(columnDate, endTimeStr);

    return [start, end];
  }, [columnDate, timeGridRows]);

  const style = {
    width: columnWidth,
    backgroundColor,
  };

  return (
    <div
      className={classNames.column}
      style={style}
      data-testid={`timegrid-column-${columnDate.getDay()}`}
    >
      <BackgroundEvents events={events} startTime={startTime} endTime={endTime} />
      <GridSelectionByColumn columnIndex={columnIndex} timeGridRows={timeGridRows} />
      <VerticalEvents events={events} startTime={startTime} endTime={endTime} />
    </div>
  );
});
