import { h, Component, createRef } from 'preact';
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
import { TimeProps } from '@src/components/timegrid/times';
import { className as timegridClassName, prefixer } from '@src/components/timegrid';
import { CurrentTimeLine } from '@src/components/timegrid/currentTimeLine';
import { getTopPercentByTime } from '@src/controller/times';
import { findIndex } from '@src/util/array';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: prefixer('scroll-area'),
  columns: prefixer('columns')
};

interface ColumnInfo {
  unit: TimeUnit;
  startTime: TZDate;
  endTime: TZDate;
  times: TimeProps[];
}
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

export class TimeGrid extends Component<Props, State> {
  static displayName = 'TimeGrid';

  static defaultProps = {
    currentTime: new TZDate(),
    unit: 'hour',
    columnInfoList: range(0, 7).map(day => {
      const startTime = addDate(new TZDate(), day);
      const endTime = addDate(new TZDate(), day + 1);

      return {
        startTime,
        endTime
      };
    }),
    timesWidth: 72,
    timezones: [{}]
  } as Props;

  state = {
    stickyContainer: null,
    columnLeft: 0
  };

  refStickyContainer = createRef<HTMLDivElement>();

  intervalId: any;

  timerId: any;

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

  render(props: Props, state: State) {
    const { columnInfoList, timesWidth, timezones = [{}], events } = props;
    const showTimezoneLabel = timezones.length > 1;
    const columWidth = 100 / columnInfoList.length;

    const { stickyContainer } = state;
    const columnLeft = state.columnLeft || calculateLeft(timesWidth, timezones);
    const now = new TZDate();
    const currentTimeLineTop = getTopPercentByTime(now, toStartOfDay(now), toEndOfDay(now));
    const columnIndex = findIndex(columnInfoList, ({ startTime, endTime }) => {
      return isBetweenWithDate(now, startTime, endTime);
    });
    const showCurrentTime = columnIndex >= 0;

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
          <div className={classNames.columns} style={{ left: columnLeft }}>
            {columnInfoList.map(({ startTime }, index) => {
              return (
                <Column
                  key={index}
                  width={toPercent(columWidth)}
                  times={make24Hours(startTime)}
                  events={events}
                />
              );
            })}
            {showCurrentTime ? (
              <CurrentTimeLine
                top={currentTimeLineTop}
                columnWidth={columWidth}
                columnCount={columnInfoList.length}
                columnIndex={columnIndex}
              />
            ) : null}
          </div>
        </div>
        <div ref={this.refStickyContainer}></div>
      </div>
    );
  }
}
