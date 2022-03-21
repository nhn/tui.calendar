import { h } from 'preact';
import { useCallback, useLayoutEffect, useMemo, useState } from 'preact/hooks';

import { addTimeGridPrefix, className as timegridClassName } from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { CurrentTimeIndicator } from '@src/components/timeGrid/currentTimeIndicator';
import { GridLines } from '@src/components/timeGrid/gridLines';
import { MovingEventShadow } from '@src/components/timeGrid/movingEventShadow';
import { TimeColumn } from '@src/components/timeGrid/timeColumn';
import { isBetween, setRenderInfoOfUIModels } from '@src/controller/column';
import { getTopPercentByTime } from '@src/controller/times';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { createGridPositionFinder } from '@src/helpers/grid';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useInterval } from '@src/hooks/common/useInterval';
import { useIsMounted } from '@src/hooks/common/useIsMounted';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  isSameDate,
  MS_PER_MINUTES,
  setTimeStrToDate,
  toEndOfDay,
  toFormat,
  toStartOfDay,
} from '@src/time/datetime';
import { first, last } from '@src/utils/array';

import { TimeGridData } from '@t/grid';
import { TimezoneConfig } from '@t/options';

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: cls(addTimeGridPrefix('scroll-area')),
};

interface Props {
  events: EventUIModel[];
  timeGridData: TimeGridData;
  currentTime?: TZDate;
  timesWidth?: number;
  timezones?: TimezoneConfig[];
}

function calculateLeft(timesWidth: number, timezones: Array<any>) {
  return timesWidth * timezones.length;
}

export function TimeGrid({
  currentTime = new TZDate(),
  timesWidth = 120,
  timezones = [{}],
  timeGridData,
  events,
}: Props) {
  const isMounted = useIsMounted();
  const [timeIndicatorTop, setTimeIndicatorTop] = useState<number | null>(null);
  const [timeIndicatorText, setTimeIndicatorText] = useState<string | null>(null);

  const { columns, rows } = timeGridData;
  const lastColumnIndex = columns.length - 1;

  const totalUIModels = useMemo(
    () =>
      columns
        .map(({ date }) =>
          events
            .filter(isBetween(toStartOfDay(date), toEndOfDay(date)))
            // NOTE: prevent shared reference between columns
            .map((uiModel) => uiModel.clone())
        )
        .map((uiModelsByColumn, columnIndex) =>
          setRenderInfoOfUIModels(
            uiModelsByColumn,
            setTimeStrToDate(columns[columnIndex].date, first(rows).startTime),
            setTimeStrToDate(columns[columnIndex].date, last(rows).endTime)
          )
        ),
    [columns, rows, events]
  );

  const currentDateIndexInColumns = useMemo(
    () => columns.findIndex((column) => isSameDate(column.date, new TZDate())),
    [columns]
  );

  const [columnsContainer, setColumnsContainer] = useDOMNode();
  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        rowsCount: rows.length,
        columnsCount: columns.length,
        container: columnsContainer,
      }),
    [columns.length, columnsContainer, rows.length]
  );

  const onMouseDown = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData,
  });

  const updateTimeGridIndicator = useCallback(() => {
    if (isMounted()) {
      const now = new TZDate();
      const currentDate = timeGridData.columns[currentDateIndexInColumns].date;
      const startTime = setTimeStrToDate(currentDate, timeGridData.rows[0].startTime);
      const endTime = setTimeStrToDate(currentDate, last(timeGridData.rows).endTime);

      if (startTime <= now && now <= endTime) {
        const initialTimeIndicatorTop = getTopPercentByTime(now, startTime, endTime);
        const indicatorText = toFormat(now, 'HH:mm');
        setTimeIndicatorTop(initialTimeIndicatorTop);
        setTimeIndicatorText(indicatorText);
      }
    }
  }, [currentDateIndexInColumns, isMounted, timeGridData]);

  // Calculate initial setTimeIndicatorTop
  useLayoutEffect(() => {
    if (currentDateIndexInColumns >= 0) {
      updateTimeGridIndicator();
    }
  }, [currentDateIndexInColumns, updateTimeGridIndicator]);

  // Set interval to update timeIndicatorTop
  useInterval(updateTimeGridIndicator, currentDateIndexInColumns >= 0 ? MS_PER_MINUTES : null);

  return (
    <div className={classNames.timegrid}>
      <div className={classNames.scrollArea}>
        <TimeColumn timeGridRows={rows} columnWidth={timesWidth} />
        <div
          className={cls('columns')}
          style={{ left: toPx(timesWidth) }}
          ref={setColumnsContainer}
          onMouseDown={onMouseDown}
        >
          <GridLines timeGridRows={rows} />
          <MovingEventShadow gridPositionFinder={gridPositionFinder} timeGridData={timeGridData} />
          {columns.map((column, index) => (
            <Column
              key={column.date.toString()}
              timeGridData={timeGridData}
              columnDate={column.date}
              columnWidth={toPercent(column.width)}
              columnIndex={index}
              totalUIModels={totalUIModels}
              gridPositionFinder={gridPositionFinder}
              isLastColumn={index === lastColumnIndex}
            />
          ))}
          {currentDateIndexInColumns >= 0 && timeIndicatorTop ? (
            <CurrentTimeIndicator
              top={timeIndicatorTop}
              columnWidth={columns[0].width}
              columnCount={columns.length}
              columnIndex={currentDateIndexInColumns}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
