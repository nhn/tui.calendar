import { h, createRef, FunctionComponent } from 'preact';
import TZDate from '@src/time/date';
import range from 'tui-code-snippet/array/range';
import {
  addDate,
  clone,
  isSameDate,
  SIXTY_SECONDS,
  toStartOfDay,
  toEndOfDay,
  isBetweenWithDate,
} from '@src/time/datetime';
import { TimeUnit, TimezoneConfig } from '@src/model';
import Schedule from '@src/model/schedule';
import { cls } from '@src/util/cssHelper';
import { toPx, toPercent } from '@src/util/units';
import { MultipleTimezones } from '@src/components/timegrid/multipleTimezones';
import { Column } from '@src/components/timegrid/column';
import {
  className as timegridClassName,
  prefixer,
  CreationGuideInfo,
} from '@src/components/timegrid';
import { CurrentTimeLine } from '@src/components/timegrid/currentTimeLine';
import { getTopPercentByTime } from '@src/controller/times';
import { findIndex } from '@src/util/array';
import ContextComponent from '@src/components/contextComponent';
import { ColumnsWithMouse, ColumnInfo } from '@src/components/timegrid/columns';
import pick from 'tui-code-snippet/object/pick';
import { useEffect, useRef, useState } from 'preact/hooks';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: prefixer('scroll-area'),
};

interface Props {
  events: Schedule[];
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
  const [creationGuide, setCreationGuide] = useState<CreationGuideInfo | null>(null);
  const [intervalId, setIntervalId] = useState<TimerID>(null);
  const [timerId, setTimerId] = useState<TimerID>(null);
  const stickyContainerRef = useRef<HTMLDivElement>();
  const forceUpdate = useForceUpdate();

  const onCreateEvent = (e: CreationGuideInfo) => {
    // const { externalEvent } = this.context;
    //
    // externalEvent.fire('beforeCreateSchedule', {
    //   start: e.start,
    //   end: e.end,
    //   isAllDay: false,
    // });
  };
  const onGuideStart = (e: CreationGuideInfo) => setCreationGuide(e);
  const onGuideChange = (e: CreationGuideInfo) => setCreationGuide(e);
  const onGuideEnd = (e: CreationGuideInfo) => onCreateEvent(e);
  const onGuideCancel = () => setCreationGuide(null);

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
  const creationGuideColumnIndex: number = pick(creationGuide, 'columnIndex');

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
        <ColumnsWithMouse
          columnLeft={left}
          columnInfoList={columnInfoList}
          onGuideStart={onGuideStart}
          onGuideChange={onGuideChange}
          onGuideEnd={onGuideEnd}
          onGuideCancel={onGuideCancel}
        >
          {columnInfoList.map(({ start: startTime }, index) => (
            <Column
              key={index}
              index={index}
              width={toPercent(columnWidth)}
              times={make24Hours(startTime)}
              events={events}
              creationGuide={creationGuideColumnIndex === index ? creationGuide : null}
            />
          ))}
          {showCurrentTime ? (
            <CurrentTimeLine
              top={currentTimeLineTop}
              columnWidth={columnWidth}
              columnCount={columnInfoList.length}
              columnIndex={columnIndex}
            />
          ) : null}
        </ColumnsWithMouse>
      </div>
      <div ref={stickyContainerRef} />
    </div>
  );
};
