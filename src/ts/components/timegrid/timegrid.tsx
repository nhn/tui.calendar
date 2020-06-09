import { h, createRef } from 'preact';
import TZDate from '@src/time/date';
import range from 'tui-code-snippet/array/range';
import {
  addDate,
  clone,
  isSameDate,
  SIXTY_SECONDS,
  toStartOfDay,
  toEndOfDay,
  isBetweenWithDate
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
  CreationGuideInfo
} from '@src/components/timegrid';
import { CurrentTimeLine } from '@src/components/timegrid/currentTimeLine';
import { getTopPercentByTime } from '@src/controller/times';
import { findIndex } from '@src/util/array';
import ContextComponent from '@src/components/contextComponent';
import { ColumnsWithMouse, ColumnInfo } from '@src/components/timegrid/columns';
import pick from 'tui-code-snippet/object/pick';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: prefixer('scroll-area')
};

interface Props {
  currentTime: TZDate;
  unit: TimeUnit;
  timesWidth: number;
  timezones: TimezoneConfig[];
  columnInfoList: ColumnInfo[];
  events: Schedule[];
  start?: number;
  end?: number;
}

interface State {
  stickyContainer: HTMLElement | null;
  columnLeft: number;
  creationGuide: CreationGuideInfo | null;
}

function calculateLeft(timesWidth: number, timezones: Array<any>) {
  return timesWidth * timezones.length;
}

function make24Hours(start: TZDate) {
  return range(0, 25).map(hour => {
    const time = clone(start);
    time.setHours(hour, 0, 0, 0);

    return time;
  });
}

export class TimeGrid extends ContextComponent<Props, State> {
  static displayName = 'TimeGrid';

  static defaultProps = {
    currentTime: new TZDate(),
    unit: 'hour',
    columnInfoList: range(0, 7).map(day => {
      const now = new TZDate();
      const start = toStartOfDay(addDate(now, day + -now.getDay()));
      const end = toEndOfDay(start);

      return {
        start,
        end,
        unit: 'minute',
        slot: 30
      };
    }),
    timesWidth: 72,
    timezones: [{}]
  } as Props;

  state = {
    stickyContainer: null,
    columnLeft: 0,
    creationGuide: null
  };

  refStickyContainer = createRef<HTMLDivElement>();

  intervalId: any;

  timerId: any;

  constructor() {
    super();

    this.initializeListeners();
  }

  initializeListeners() {
    this.onGuideStart = this.onGuideStart.bind(this);
    this.onGuideChange = this.onGuideChange.bind(this);
    this.onGuideEnd = this.onGuideEnd.bind(this);
    this.onGuideCancel = this.onGuideCancel.bind(this);
  }

  componentWillMount() {
    this.onTick = this.onTick.bind(this);
    this.onChangeCollapsed = this.onChangeCollapsed.bind(this);
  }

  componentDidMount() {
    const now = new TZDate();
    const { currentTime } = this.props;
    const showCurrentTime = isSameDate(currentTime, now);

    if (showCurrentTime) {
      this.addTimeoutOnExactMinutes();
    }

    if (this.refStickyContainer.current) {
      this.setState({ stickyContainer: this.refStickyContainer.current });
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
    this.clearInterval();
  }

  clearTimeout() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = 0;
    }
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = 0;
    }
  }

  refreshCurrentTime() {
    this.forceUpdate();
  }

  addTimeoutOnExactMinutes() {
    if (!this.timerId) {
      this.timerId = setTimeout(this.onTick, (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000);
    }
  }

  onTick() {
    this.clearTimeout();

    if (!this.intervalId) {
      this.intervalId = setInterval(this.onTick, REFRESH_INTERVAL);
    }

    this.refreshCurrentTime();
  }

  onChangeCollapsed(collapsed: boolean) {
    const { timesWidth, timezones = [{}] } = this.props;

    if (collapsed) {
      this.setState({ columnLeft: timesWidth });
    } else {
      this.setState({ columnLeft: calculateLeft(timesWidth, timezones) });
    }
  }

  onGuideStart(e: CreationGuideInfo) {
    this.setState({ creationGuide: e });
  }

  onGuideChange(e: CreationGuideInfo) {
    this.setState({ creationGuide: e });
  }

  onGuideEnd(e: CreationGuideInfo) {
    this.onCreateEvent(e);
  }

  onGuideCancel() {
    this.setState({ creationGuide: null });
  }

  onCreateEvent(e: CreationGuideInfo) {
    const { externalEvent } = this.context;

    externalEvent.fire('beforeCreateSchedule', {
      start: e.start,
      end: e.end,
      isAllDay: false
    });
  }

  render(props: Props, state: State) {
    const { columnInfoList, timesWidth, timezones = [{}], events } = props;
    const { stickyContainer, creationGuide } = state;
    const showTimezoneLabel = timezones.length > 1;
    const columnWidth = 100 / columnInfoList.length;
    const columnLeft = state.columnLeft || calculateLeft(timesWidth, timezones);
    const now = new TZDate();
    const currentTimeLineTop = getTopPercentByTime(now, toStartOfDay(now), toEndOfDay(now));
    const columnIndex = findIndex(columnInfoList, ({ start: startTime, end: endTime }) => {
      return isBetweenWithDate(now, startTime, endTime);
    });
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
            onChangeCollapsed={this.onChangeCollapsed}
          />
          <ColumnsWithMouse
            columnLeft={columnLeft}
            columnInfoList={columnInfoList}
            onGuideStart={this.onGuideStart}
            onGuideChange={this.onGuideChange}
            onGuideEnd={this.onGuideEnd}
            onGuideCancel={this.onGuideCancel}
          >
            {columnInfoList.map(({ start }, index) => {
              return (
                <Column
                  key={index}
                  index={index}
                  width={toPercent(columnWidth)}
                  times={make24Hours(start)}
                  events={events}
                  creationGuide={creationGuideColumnIndex === index ? creationGuide : null}
                />
              );
            })}
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
        <div ref={this.refStickyContainer}></div>
      </div>
    );
  }
}
