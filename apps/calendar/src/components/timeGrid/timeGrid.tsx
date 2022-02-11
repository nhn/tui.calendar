import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { addTimeGridPrefix, className as timegridClassName } from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { CurrentTimeIndicator } from '@src/components/timeGrid/currentTimeIndicator';
import { GridLines } from '@src/components/timeGrid/gridLines';
import { TimeColumn } from '@src/components/timeGrid/timeColumn';
import { isBetween } from '@src/controller/column';
import { getTopPercentByTime } from '@src/controller/times';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { createGridPositionFinder } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { isSameDate, SIXTY_SECONDS, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { isBetween as isBetweenValue } from '@src/utils/math';

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

function sortGridSelection(gridSelection: GridSelectionData) {
  const {
    startRowIndex: initRowIndex,
    startColumnIndex: initColIndex,
    endRowIndex: currentRowIndex,
    endColumnIndex: currentColIndex,
  } = gridSelection;
  const isReversed =
    initColIndex > currentColIndex ||
    (initColIndex === currentColIndex && initRowIndex > currentRowIndex);

  return isReversed
    ? {
        startRowIndex: currentRowIndex,
        startColIndex: currentColIndex,
        endRowIndex: initRowIndex,
        endColIndex: initColIndex,
      }
    : {
        startRowIndex: initRowIndex,
        startColIndex: initColIndex,
        endRowIndex: currentRowIndex,
        endColIndex: currentColIndex,
      };
}

function calculateGridSelection(
  timeGridSelection: GridSelectionData | null,
  columnIndex: number
): TimeGridSelectionDataByCol | null {
  if (!timeGridSelection) {
    return null;
  }

  const { startColumnIndex: initColIndex, endColumnIndex: currentColIndex } = timeGridSelection;

  const minColIndex = Math.min(initColIndex, currentColIndex);
  const maxColIndex = Math.max(initColIndex, currentColIndex);
  if (!isBetweenValue(columnIndex, minColIndex, maxColIndex)) {
    return null;
  }

  const { startRowIndex, startColIndex, endRowIndex, endColIndex } =
    sortGridSelection(timeGridSelection);

  const hasMultipleColumns = startColIndex !== endColIndex;
  const isStartingColumn = columnIndex === startColIndex;
  const resultGridSelection: TimeGridSelectionDataByCol = {
    startRowIndex,
    endRowIndex,
    isSelectingMultipleColumns: hasMultipleColumns,
    isStartingColumn,
  };

  if (startColIndex < columnIndex && columnIndex < endColIndex) {
    resultGridSelection.startRowIndex = 0;
    resultGridSelection.endRowIndex = 47;
  } else if (startColIndex !== endColIndex) {
    if (startColIndex === columnIndex) {
      resultGridSelection.endRowIndex = 47;
    } else if (endColIndex === columnIndex) {
      resultGridSelection.startRowIndex = 0;
    }
  }

  return resultGridSelection;
}

export function TimeGrid({
  currentTime = new TZDate(),
  timesWidth = 120,
  timezones = [{}],
  timeGridData,
  events,
}: Props) {
  const [stickyContainer, setStickyContainer] = useState<HTMLElement | null>(null);
  const [columnLeft, setColumnLeft] = useState(0);
  const [intervalId, setIntervalId] = useState<TimerID>(null);
  const [timerId, setTimerId] = useState<TimerID>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  // const onCreateEvent = (e: TimeGridSelectionInfo) => {
  //   // @TODO: beforeCreateEvent 구현
  // };
  // const onSelectionStart = (e: TimeGridSelectionInfo) => setGridSelection(e);
  // const onSelectionChange = (e: TimeGridSelectionInfo) => setGridSelection(e);
  // const onSelectionEnd = (e: TimeGridSelectionInfo) => onCreateEvent(e);
  // const onSelectionCancel = () => setGridSelection(null);

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

    if (stickyContainerRef.current) {
      setStickyContainer(stickyContainerRef.current);
    }

    return () => {
      clearTimer();
      clearIntervalTimer();
    };
  }, [currentTime, forceUpdate, intervalId, timerId]);

  const { columns, rows } = timeGridData;

  const eventsByColumns = useMemo(
    () => columns.map(({ date }) => events.filter(isBetween(toStartOfDay(date), toEndOfDay(date)))),
    [columns, events]
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

  const { onMouseDown, gridSelection: timeGridSelection } = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
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
          {columns.map((column, index) => {
            const gridSelection = calculateGridSelection(timeGridSelection, index);

            return (
              <Column
                key={column.date.toString()}
                timeGridRows={rows}
                gridSelection={gridSelection}
                columnDate={column.date}
                columnWidth={toPercent(column.width)}
                events={eventsByColumns[index]}
              />
            );
          })}
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
      <div ref={stickyContainerRef} />
    </div>
  );
}
