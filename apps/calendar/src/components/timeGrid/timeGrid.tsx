import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import pick from 'tui-code-snippet/object/pick';

import {
  addTimeGridPrefix,
  className as timegridClassName,
  GridSelectionInfo,
} from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { ColumnInfo, ColumnWithMouse } from '@src/components/timeGrid/columnWithMouse';
import { CurrentTimeIndicator } from '@src/components/timeGrid/currentTimeIndicator';
import { MultipleTimezones } from '@src/components/timeGrid/multipleTimezones';
import { getTopPercentByTime } from '@src/controller/times';
import { TimeUnit, TimezoneConfig } from '@src/model';
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
import { findIndex } from '@src/util/array';
import { cls, toPercent, toPx } from '@src/util/cssHelper';
import { range } from '@src/util/utils';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: cls(addTimeGridPrefix('scroll-area')),
};

interface Props {
  events: EventUIModel[];
  currentTime?: TZDate;
  timesWidth?: number;
  timezones?: TimezoneConfig[];
  columnInfoList?: ColumnInfo[];
  unit?: TimeUnit;
  start?: number;
  end?: number;
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

export const TimeGrid: FunctionComponent<Props> = ({
  currentTime = new TZDate(),
  columnInfoList = range(0, 7).map((day) => {
    const now = new TZDate();
    const start = toStartOfDay(addDate(now, day + -now.getDay()));
    const end = toEndOfDay(start);

    return {
      start,
      end,
      unit: 'minute',
      slot: 30,
    } as ColumnInfo;
  }),
  timesWidth = 120,
  timezones = [{}],
  unit = 'hour',
  events,
}) => {
  const [stickyContainer, setStickyContainer] = useState<HTMLElement | null>(null);
  const [columnLeft, setColumnLeft] = useState(0);
  const [gridSelection, setGridSelection] = useState<GridSelectionInfo | null>(null);
  const [intervalId, setIntervalId] = useState<TimerID>(null);
  const [timerId, setTimerId] = useState<TimerID>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  const onCreateEvent = (e: GridSelectionInfo) => {
    // @TODO: beforeCreateEvent 구현
  };
  const onSelectionStart = (e: GridSelectionInfo) => setGridSelection(e);
  const onSelectionChange = (e: GridSelectionInfo) => setGridSelection(e);
  const onSelectionEnd = (e: GridSelectionInfo) => onCreateEvent(e);
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

  const showTimezoneLabel = timezones.length > 1;
  const columnWidth = 100 / columnInfoList.length;
  const left = columnLeft || calculateLeft(timesWidth, timezones);
  const now = new TZDate();
  const currentTimeLineTop = getTopPercentByTime(now, toStartOfDay(now), toEndOfDay(now));
  const columnIndex = findIndex(columnInfoList, ({ start, end }) =>
    isBetweenWithDate(now, start, end)
  );
  const showCurrentTime = columnIndex >= 0;
  const gridSelectionColumnIndex: number = pick(gridSelection, 'columnIndex');

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
        <ColumnWithMouse
          columnLeft={left}
          columnInfoList={columnInfoList}
          onSelectionStart={onSelectionStart}
          onSelectionChange={onSelectionChange}
          onSelectionEnd={onSelectionEnd}
          onSelectionCancel={onSelectionCancel}
        >
          {columnInfoList.map(({ start: startTime }, index) => (
            <Column
              key={index}
              index={index}
              width={toPercent(columnWidth)}
              times={make24Hours(startTime)}
              events={events}
              gridSelection={gridSelectionColumnIndex === index ? gridSelection : null}
            />
          ))}
          {showCurrentTime ? (
            <CurrentTimeIndicator
              top={currentTimeLineTop}
              columnWidth={columnWidth}
              columnCount={columnInfoList.length}
              columnIndex={columnIndex}
            />
          ) : null}
        </ColumnWithMouse>
      </div>
      <div ref={stickyContainerRef} />
    </div>
  );
};
