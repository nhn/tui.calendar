import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useMemo } from 'preact/hooks';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelectionByColumn } from '@src/components/timeGrid/gridSelectionByColumn';
import { useTheme } from '@src/contexts/themeStore';
import { getTopHeightByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { isBackgroundEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { first, last } from '@src/utils/array';

import { GridPositionFinder, TimeGridData } from '@t/grid';

import { ResizingGuideByColumn } from './resizingGuideByColumn';

const classNames = {
  column: cls('column'),
  backgrounds: cls('background-events'),
  events: cls('events'),
};

function BackgroundEvents({
  eventUIModels,
  startTime,
  endTime,
}: {
  eventUIModels: EventUIModel[];
  startTime: TZDate;
  endTime: TZDate;
}) {
  const backgroundEvents = eventUIModels.filter(isBackgroundEvent);

  return (
    <div className={classNames.backgrounds}>
      {backgroundEvents.map((eventUIModel, index) => {
        const { top, height } = getTopHeightByTime(
          eventUIModel.model.start,
          eventUIModel.model.end,
          startTime,
          endTime
        );

        return (
          <BackgroundEvent
            uiModel={eventUIModel}
            top={toPercent(top)}
            height={toPercent(height)}
            key={`backgroundEvent-${index}`}
          />
        );
      })}
    </div>
  );
}

function VerticalEvents({ eventUIModels }: { eventUIModels: EventUIModel[] }) {
  // @TODO: use dynamic value
  const style = { marginRight: 8 };

  return (
    <div className={classNames.events} style={style}>
      {eventUIModels.map((eventUIModel) => (
        <TimeEvent key={`${eventUIModel.valueOf()}-${eventUIModel.cid()}`} uiModel={eventUIModel} />
      ))}
    </div>
  );
}

interface Props {
  timeGridData: TimeGridData;
  columnDate: TZDate;
  columnWidth: string;
  columnIndex: number;
  totalUIModels: EventUIModel[][];
  gridPositionFinder: GridPositionFinder;
  isLastColumn: boolean;
  backgroundColor?: string;
  readOnly?: boolean;
}

export const Column = memo(function Column({
  columnDate,
  columnWidth,
  columnIndex,
  totalUIModels,
  gridPositionFinder,
  timeGridData,
  backgroundColor,
  isLastColumn,
}: Props) {
  const { rows: timeGridRows } = timeGridData;
  const borderRight = useTheme(useCallback((theme) => theme.week.timeGrid.borderRight, []));

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
    borderRight: isLastColumn ? 'none' : borderRight,
  };

  const uiModelsByColumn = totalUIModels[columnIndex];

  return (
    <div
      className={classNames.column}
      style={style}
      data-testid={`timegrid-column-${columnDate.getDay()}`}
    >
      <BackgroundEvents eventUIModels={uiModelsByColumn} startTime={startTime} endTime={endTime} />
      <VerticalEvents eventUIModels={uiModelsByColumn} />
      <ResizingGuideByColumn
        gridPositionFinder={gridPositionFinder}
        totalUIModels={totalUIModels}
        columnIndex={columnIndex}
        timeGridData={timeGridData}
      />
      <GridSelectionByColumn columnIndex={columnIndex} timeGridRows={timeGridRows} />
    </div>
  );
});
