import { h } from 'preact';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import { addTimeGridPrefix, className as timegridClassName } from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { CurrentTimeIndicator } from '@src/components/timeGrid/currentTimeIndicator';
import { GridLines } from '@src/components/timeGrid/gridLines';
import { MovingEventShadow } from '@src/components/timeGrid/movingEventShadow';
import { TimeColumn } from '@src/components/timeGrid/timeColumn';
import { isBetween } from '@src/controller/column';
import { getTopPercentByTime } from '@src/controller/times';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { createGridPositionFinder } from '@src/helpers/grid';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { isSameDate, setTimeStrToDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { last } from '@src/utils/array';

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
  const [timeIndicatorTop, setTimeIndicatorTop] = useState<number | null>(null);
  const isMountedRef = useRef(false);

  const { columns, rows } = timeGridData;
  const lastColumnIndex = columns.length - 1;

  const eventsByColumns = useMemo(
    () =>
      columns.map(({ date }) =>
        events
          .filter(isBetween(toStartOfDay(date), toEndOfDay(date)))
          // NOTE: prevent shared reference between columns
          .map((uiModel) => uiModel.clone())
      ),
    [columns, events]
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

  // Calculate initial setTimeIndicatorTop
  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (!isMountedRef.current && currentDateIndexInColumns >= 0) {
      const now = new TZDate();
      const currentDate = timeGridData.columns[currentDateIndexInColumns].date;
      const startTime = setTimeStrToDate(currentDate, timeGridData.rows[0].startTime);
      const endTime = setTimeStrToDate(currentDate, last(timeGridData.rows).endTime);

      if (startTime <= now && now <= endTime) {
        const initialTimeIndicatorTop = getTopPercentByTime(now, startTime, endTime);
        setTimeIndicatorTop(initialTimeIndicatorTop);
      }

      isMountedRef.current = true;

      return () => {
        isMountedRef.current = false;
      };
    }
  }, [currentDateIndexInColumns, timeGridData]);

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
              timeGridRows={rows}
              columnDate={column.date}
              columnWidth={toPercent(column.width)}
              columnIndex={index}
              events={eventsByColumns[index]}
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
