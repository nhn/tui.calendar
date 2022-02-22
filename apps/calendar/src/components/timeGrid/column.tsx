import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import produce from 'immer';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelection } from '@src/components/timeGrid/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { getUIModels } from '@src/controller/column';
import { getTopHeightByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { first, last } from '@src/utils/array';
import { isPresent } from '@src/utils/type';

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
  const draggingEventUIModel = useStore((store) => store.dnd.draggingEventUIModel);

  // @TODO: use dynamic value
  const style = { marginRight: 8 };
  const uiModels = getUIModels(events, startTime, endTime);

  return (
    <div className={classNames.events} style={style}>
      {uiModels.map((uiModel, index) => (
        <TimeEvent
          uiModel={uiModel}
          isDraggingTarget={uiModel.cid() === draggingEventUIModel?.cid()}
          key={index}
        />
      ))}
    </div>
  );
}

interface Props {
  timeGridRows: TimeGridRow[];
  gridSelection: TimeGridSelectionDataByCol | null;
  columnDate: TZDate;
  columnWidth: string;
  events: EventUIModel[];
  movingEvent: EventUIModel | null;
  backgroundColor?: string;
  readOnly?: boolean;
}

export const Column = memo(function Column({
  columnDate,
  columnWidth,
  events,
  timeGridRows,
  gridSelection,
  backgroundColor,
  movingEvent,
}: Props) {
  const [startTime, endTime] = useMemo(() => {
    const { startTime: startTimeStr } = first(timeGridRows);
    const { endTime: endTimeStr } = last(timeGridRows);

    const start = setTimeStrToDate(columnDate, startTimeStr);
    const end = setTimeStrToDate(columnDate, endTimeStr);

    return [start, end];
  }, [columnDate, timeGridRows]);

  const gridSelectionProps = useMemo(() => {
    if (!gridSelection) {
      return null;
    }

    const { startRowIndex, endRowIndex, isStartingColumn, isSelectingMultipleColumns } =
      gridSelection;

    const { top: startRowTop, startTime: startRowStartTime } = timeGridRows[startRowIndex];
    const {
      top: endRowTop,
      height: endRowHeight,
      endTime: endRowEndTime,
    } = timeGridRows[endRowIndex];

    const gridSelectionHeight = endRowTop + endRowHeight - startRowTop;

    let text = `${startRowStartTime} - ${endRowEndTime}`;
    if (isSelectingMultipleColumns) {
      text = isStartingColumn ? startRowStartTime : '';
    }

    return {
      top: startRowTop,
      height: gridSelectionHeight,
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
      {movingEvent ? <TimeEvent uiModel={movingEvent} /> : null}
    </div>
  );
});
