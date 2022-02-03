import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { addTimeGridPrefix, className as timegridClassName } from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { ColumnInfo, ColumnWithMouse } from '@src/components/timeGrid/columnWithMouse';
import { CurrentTimeIndicator } from '@src/components/timeGrid/currentTimeIndicator';
import { MultipleTimezones } from '@src/components/timeGrid/multipleTimezones';
import { isBetween } from '@src/controller/column';
import { getTopPercentByTime } from '@src/controller/times';
import { cls, toPercent, toPx } from '@src/helpers/css';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  addDate,
  clone,
  isBetweenWithDate,
  isSameDate,
  SIXTY_SECONDS,
  toEndOfDay,
  toStartOfDay,
} from '@src/time/datetime';

import { TimeGridSelectionInfo } from '@t/components/timeGrid/gridSelection';
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

function make24Hours(start: TZDate) {
  return range(0, 25).map((hour) => {
    const time = clone(start);
    time.setHours(hour, 0, 0, 0);

    return time;
  });
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
  const [gridSelection, setGridSelection] = useState<TimeGridSelectionInfo | null>(null);
  const [intervalId, setIntervalId] = useState<TimerID>(null);
  const [timerId, setTimerId] = useState<TimerID>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  const onCreateEvent = (e: TimeGridSelectionInfo) => {
    // @TODO: beforeCreateEvent 구현
  };
  const onSelectionStart = (e: TimeGridSelectionInfo) => setGridSelection(e);
  const onSelectionChange = (e: TimeGridSelectionInfo) => setGridSelection(e);
  const onSelectionEnd = (e: TimeGridSelectionInfo) => onCreateEvent(e);
  const onSelectionCancel = () => setGridSelection(null);

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

  const showTimezoneLabel = timezones.length > 1;
  const now = new TZDate();
  const currentTimeLineTop = getTopPercentByTime(now, toStartOfDay(now), toEndOfDay(now));
  const currentDateIndexInColumns = columns.findIndex((column) => isSameDate(column.date, now));

  return (
    <div className={classNames.timegrid}>
      <div className={classNames.scrollArea}>
        <MultipleTimezones
          timezones={timezones}
          currentTime={now}
          showTimezoneLabel={showTimezoneLabel}
          width={toPx(timesWidth)}
          stickyContainer={stickyContainer}
          onChangeCollapsed={onChangeCollapsed}
        />
        <div
          className={cls('columns')}
          style={{
            width: `calc(100% - ${toPx(timesWidth)})`,
            left: toPx(timesWidth),
          }}
        >
          {columns.map((column, index) => (
            <Column
              key={index}
              timeGridRows={rows}
              columnDate={column.date}
              columnWidth={toPercent(column.width)}
              events={eventsByColumns[index]}
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
      <div ref={stickyContainerRef} />
    </div>
  );
}
