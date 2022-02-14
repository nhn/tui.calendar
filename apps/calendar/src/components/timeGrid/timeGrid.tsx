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
import { timeGridSelectionHelpers } from '@src/helpers/gridSelection';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { isSameDate, SIXTY_SECONDS, toEndOfDay, toStartOfDay } from '@src/time/datetime';

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

  const {
    onMouseDown,
    gridSelection: timeGridSelection,
    onClick,
  } = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelpers.selectionSorter,
    dateGetter: timeGridSelectionHelpers.dateGetter,
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
          onClick={onClick}
        >
          <GridLines timeGridRows={rows} />
          {columns.map((column, index) => {
            const gridSelection = timeGridSelectionHelpers.calculatorByCurrentIndex(
              timeGridSelection,
              index
            );

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
