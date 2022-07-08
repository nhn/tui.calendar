import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback } from 'preact/hooks';

import { TimeEvent } from '@src/components/events/timeEvent';
import { GridSelectionByColumn } from '@src/components/timeGrid/gridSelectionByColumn';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { usePrimaryTimezone } from '@src/hooks/timezone/usePrimaryTimezone';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { isSameDate, isWeekend } from '@src/time/datetime';

import type { GridPositionFinder, TimeGridData } from '@t/grid';
import type { ThemeState } from '@t/theme';

import { ResizingGuideByColumn } from './resizingGuideByColumn';

const classNames = {
  column: cls('column'),
  backgrounds: cls('background-events'),
  events: cls('events'),
};

// TODO: implement BackgroundEvents
// function BackgroundEvents({
//   eventUIModels,
//   startTime,
//   endTime,
// }: {
//   eventUIModels: EventUIModel[];
//   startTime: TZDate;
//   endTime: TZDate;
// }) {
//   const backgroundEvents = eventUIModels.filter(isBackgroundEvent);

//   return (
//     <div className={classNames.backgrounds}>
//       {backgroundEvents.map((eventUIModel, index) => {
//         const { top, height } = getTopHeightByTime(
//           eventUIModel.model.start,
//           eventUIModel.model.end,
//           startTime,
//           endTime
//         );

//         return (
//           <BackgroundEvent
//             uiModel={eventUIModel}
//             top={toPercent(top)}
//             height={toPercent(height)}
//             key={`backgroundEvent-${index}`}
//           />
//         );
//       })}
//     </div>
//   );
// }

function VerticalEvents({
  eventUIModels,
  minEventHeight,
}: {
  eventUIModels: EventUIModel[];
  minEventHeight: number;
}) {
  // @TODO: use dynamic value
  const style = { marginRight: 8 };

  return (
    <div className={classNames.events} style={style}>
      {eventUIModels.map((eventUIModel) => (
        <TimeEvent
          key={`${eventUIModel.valueOf()}-${eventUIModel.cid()}`}
          uiModel={eventUIModel}
          minHeight={minEventHeight}
        />
      ))}
    </div>
  );
}

function backgroundColorSelector(theme: ThemeState) {
  return {
    defaultBackgroundColor: theme.week.dayGrid.backgroundColor,
    todayBackgroundColor: theme.week.today.backgroundColor,
    weekendBackgroundColor: theme.week.weekend.backgroundColor,
  };
}

function getBackgroundColor({
  today,
  columnDate,
  defaultBackgroundColor,
  todayBackgroundColor,
  weekendBackgroundColor,
}: {
  today: TZDate;
  columnDate: TZDate;
  defaultBackgroundColor: string;
  todayBackgroundColor: string;
  weekendBackgroundColor: string;
}) {
  const isTodayColumn = isSameDate(today, columnDate);
  const isWeekendColumn = isWeekend(columnDate.getDay());

  if (isTodayColumn) {
    return todayBackgroundColor;
  }

  if (isWeekendColumn) {
    return weekendBackgroundColor;
  }

  return defaultBackgroundColor;
}

interface Props {
  timeGridData: TimeGridData;
  columnDate: TZDate;
  columnWidth: string;
  columnIndex: number;
  totalUIModels: EventUIModel[][];
  gridPositionFinder: GridPositionFinder;
  isLastColumn: boolean;
  readOnly?: boolean;
}

export const Column = memo(function Column({
  columnDate,
  columnWidth,
  columnIndex,
  totalUIModels,
  gridPositionFinder,
  timeGridData,
  isLastColumn,
}: Props) {
  const { rows: timeGridRows } = timeGridData;
  const borderRight = useTheme(useCallback((theme) => theme.week.timeGrid.borderRight, []));
  const backgroundColorTheme = useTheme(backgroundColorSelector);
  const [, getNow] = usePrimaryTimezone();
  const today = getNow();

  // const [startTime, endTime] = useMemo(() => {
  //   const { startTime: startTimeStr } = first(timeGridRows);
  //   const { endTime: endTimeStr } = last(timeGridRows);

  //   const start = setTimeStrToDate(columnDate, startTimeStr);
  //   const end = setTimeStrToDate(columnDate, endTimeStr);

  //   return [start, end];
  // }, [columnDate, timeGridRows]);

  const backgroundColor = getBackgroundColor({ today, columnDate, ...backgroundColorTheme });

  const style = {
    width: columnWidth,
    backgroundColor,
    borderRight: isLastColumn ? 'none' : borderRight,
  };

  const uiModelsByColumn = totalUIModels[columnIndex];

  const minEventHeight = timeGridRows[0].height;

  return (
    <div
      className={classNames.column}
      style={style}
      data-testid={`timegrid-column-${columnDate.getDay()}`}
    >
      {/* <BackgroundEvents eventUIModels={uiModelsByColumn} startTime={startTime} endTime={endTime} /> */}
      <VerticalEvents eventUIModels={uiModelsByColumn} minEventHeight={minEventHeight} />
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
