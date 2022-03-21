import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

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
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  isSameDate,
  setTimeStrToDate,
  SIXTY_SECONDS,
  toEndOfDay,
  toStartOfDay,
} from '@src/time/datetime';
import { first, last } from '@src/utils/array';

import { TimeGridData } from '@t/grid';
import { TimezoneConfig } from '@t/options';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

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

type TimerID = number | null;

function calculateLeft(timesWidth: number, timezones: Array<any>) {
  return timesWidth * timezones.length;
}

function useForceUpdate() {
  const [, setForceUpdate] = useState(0);

  return () => setForceUpdate((prev) => prev + 1);
}

export function TimeGrid({
  currentTime = new TZDate(),
  timesWidth = 120,
  timezones = [{}],
  timeGridData,
  events,
}: Props) {
  const [columnLeft, setColumnLeft] = useState(0);
  const [intervalId, setIntervalId] = useState<TimerID>(null);
  const [timerId, setTimerId] = useState<TimerID>(null);
  const forceUpdate = useForceUpdate();

  const onChangeCollapsed = (collapsed: boolean) =>
    setColumnLeft(collapsed ? timesWidth : calculateLeft(timesWidth, timezones));

  useEffect(() => {
    const now = new TZDate();
    const showCurrentTime = isSameDate(currentTime, now);
    const clearTimer = () => {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(0);
      }
    };
    const clearIntervalTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
      }
    };
    const onTick = () => {
      clearTimer();

      if (!intervalId) {
        const id = window.setInterval(onTick, REFRESH_INTERVAL);
        setIntervalId(id);
      }

      forceUpdate();
    };
    const addTimeoutOnExactMinutes = () => {
      if (!timerId) {
        const timeout = (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000;
        setTimerId(window.setTimeout(onTick, timeout));
      }
    };

    if (showCurrentTime) {
      addTimeoutOnExactMinutes();
    }

    return () => {
      clearTimer();
      clearIntervalTimer();
    };
  }, [currentTime, forceUpdate, intervalId, timerId]);

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

  const now = new TZDate();
  const currentTimeLineTop = getTopPercentByTime(now, toStartOfDay(now), toEndOfDay(now));
  const currentDateIndexInColumns = columns.findIndex((column) => isSameDate(column.date, now));

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
          {/* @TODO: Should be reimplement `CurrentTimeIndicator` component */}
          {currentDateIndexInColumns > 0 ? (
            <CurrentTimeIndicator
              top={currentTimeLineTop}
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
