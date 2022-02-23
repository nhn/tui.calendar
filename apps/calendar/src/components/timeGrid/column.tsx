import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelection } from '@src/components/timeGrid/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { setRenderInfoOfUIModels } from '@src/controller/column';
import { getTopHeightByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { draggingEventUIModelSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { first, last } from '@src/utils/array';
import { isPresent } from '@src/utils/type';

import { TimeGridRow } from '@t/grid';
import { CalendarState } from '@t/store';

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
  const draggingEventUIModel = useStore(draggingEventUIModelSelector);
  const draggingEventUIModelCID = draggingEventUIModel?.cid();

  // @TODO: use dynamic value
  const style = { marginRight: 8 };
  const uiModels = useMemo(
    () => setRenderInfoOfUIModels(events, startTime, endTime),
    [endTime, events, startTime]
  );
  const verticalEvents = useMemo(
    () =>
      uiModels.map((uiModel) => (
        <TimeEvent
          key={`${uiModel.valueOf()}-${uiModel.cid()}`}
          uiModel={uiModel}
          isDraggingTarget={uiModel.cid() === draggingEventUIModelCID}
        />
      )),
    [draggingEventUIModelCID, uiModels]
  );

  return (
    <div className={classNames.events} style={style}>
      {verticalEvents}
    </div>
  );
}

interface Props {
  timeGridRows: TimeGridRow[];
  gridSelection: TimeGridSelectionDataByCol | null;
  columnDate: TZDate;
  columnWidth: string;
  events: EventUIModel[];
  movingEventTop: number | null;
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
  movingEventTop,
}: Props) {
  const draggingEventUIModel = useStore(
    useCallback(
      (state: CalendarState) => (isPresent(movingEventTop) ? state.dnd.draggingEventUIModel : null),
      [movingEventTop]
    )
  );

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

  const shouldRenderMovingEvent = isPresent(draggingEventUIModel) && isPresent(movingEventTop);

  return (
    <div className={classNames.column} style={style}>
      <BackgroundEvents events={events} startTime={startTime} endTime={endTime} />
      {shouldRenderMovingEvent ? (
        <TimeEvent uiModel={draggingEventUIModel} movingEventTop={movingEventTop} />
      ) : null}
      {gridSelectionProps ? <GridSelection {...gridSelectionProps} /> : null}
      <VerticalEvents events={events} startTime={startTime} endTime={endTime} />
    </div>
  );
});
