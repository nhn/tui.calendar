import { h, Component, Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import isNumber from 'tui-code-snippet/type/isNumber';
import range from 'tui-code-snippet/array/range';
import { className as timegridClassName, prefixer } from '@src/components/timegrid';
import { Times, TimeProps } from '@src/components/timegrid/times';
import { CollapseButton } from '@src/components/timegrid/collapseButton';
import { TimezoneLabel } from '@src/components/timegrid/timezoneLabel';
import {
  addHours,
  addMinutes,
  toFormat,
  getTimezoneDifference,
  isSameDate,
  clone,
  SIXTY_SECONDS,
  getDateDifference,
  toStartOfDay
} from '@src/time/datetime';
import { TimezoneConfig } from '@src/model';
import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';
import { noop } from '@src/util';

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  timegrid: cls(timegridClassName),
  sticky: prefixer('sticky')
};

interface Props {
  currentTime: TZDate;
  width: string;
  timezones?: TimezoneConfig[];
  showTimezoneLabel?: boolean;
  stickyContainer?: HTMLElement | null;
  onChangeCollapsed?: (collapsed: boolean) => void;
}

function makeHours(now: TZDate, timezoneOffset?: number): TimeProps[] {
  return range(0, 25).map(hour => {
    let date = addHours(now, hour);

    if (isNumber(timezoneOffset)) {
      date = addMinutes(date, getTimezoneDifference(date, timezoneOffset));
    }

    return {
      date,
      display: toFormat(date, 'HH:mm tt')
    };
  });
}

export class MultipleTimezones extends Component<Props> {
  static displayName = 'MultipleTimezones';

  static defaultProps = {
    currentTime: new TZDate(),
    width: '72px'
  };

  state = {
    collapsed: false
  };

  intervalId: any;

  timerId: any;

  componentWillMount() {
    this.onTick = this.onTick.bind(this);
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

  onTick() {
    this.clearTimeout();

    if (!this.intervalId) {
      this.intervalId = setInterval(this.onTick, REFRESH_INTERVAL);
    }

    this.refreshCurrentTime();
  }

  refreshCurrentTime() {
    this.forceUpdate();
  }

  addTimeoutOnExactMinutes() {
    if (!this.timerId) {
      this.timerId = setTimeout(this.onTick, (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000);
    }
  }

  makeTimezones() {
    const { currentTime } = this.props;
    let { timezones = [] } = this.props;
    const startOfToday = toStartOfDay(currentTime);

    if (!timezones.length) {
      timezones = [{}];
    }

    return timezones.map((timezone, index) => {
      const { timezoneOffset } = timezone;
      const isPrimaryTimezone = index === 0;

      return {
        times: makeHours(startOfToday, timezoneOffset),
        currentTime: isPrimaryTimezone
          ? clone(currentTime)
          : addMinutes(currentTime, getTimezoneDifference(currentTime, timezoneOffset)),
        timezone
      };
    });
  }

  onClickCollapseButton(value: boolean) {
    const { onChangeCollapsed = noop } = this.props;
    const collapsed = !value;

    onChangeCollapsed(collapsed);

    this.setState({ collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const { showTimezoneLabel, width, stickyContainer } = this.props;

    const timezones = this.makeTimezones();
    const [primaryTimes, ...subTimes] = timezones.map(timezone => timezone.times);
    const [primaryCurrentTime, ...subCurrentTimes] = timezones.map(
      timezone => timezone.currentTime
    );
    const reverseTimes = collapsed ? [] : subTimes.reverse();
    const reverseCurrentTimes = collapsed ? [] : subCurrentTimes.reverse();
    const now = new TZDate();
    const showCurrentTime = isSameDate(primaryCurrentTime, now);

    if (showCurrentTime) {
      this.addTimeoutOnExactMinutes();
    }

    let timezoneLabels = null;
    if (showTimezoneLabel) {
      timezoneLabels = this.renderTimezoneLabels(
        timezones.map(({ timezone }) => timezone),
        width
      );
    }

    return (
      <Fragment>
        {reverseTimes.map((times, index) => (
          <Times
            key={index}
            width={width}
            times={times}
            showCurrentTime={showCurrentTime}
            currentTime={reverseCurrentTimes[index]}
            dateDifference={getDateDifference(reverseCurrentTimes[index], primaryCurrentTime)}
            timeTemplate="timegridDisplayTime"
          />
        ))}
        <Times
          width={width}
          times={primaryTimes}
          showCurrentTime={showCurrentTime}
          currentTime={primaryCurrentTime}
          timeTemplate="timegridDisplayPrimaryTime"
        />

        {stickyContainer && timezoneLabels
          ? createPortal(timezoneLabels, stickyContainer)
          : timezoneLabels}
      </Fragment>
    );
  }

  renderTimezoneLabels(timezones: TimezoneConfig[], width: string) {
    const [primaryTimezone, ...subTimezones] = timezones;
    const reverseTimezones = subTimezones.reverse();
    if (!reverseTimezones.length) {
      return null;
    }

    return (
      <div className={classNames.sticky}>
        {!this.state.collapsed
          ? reverseTimezones.map((timezone, index) => (
              <TimezoneLabel key={index} timezone={timezone} width={width} />
            ))
          : null}
        <TimezoneLabel
          timezone={primaryTimezone}
          width={width}
          renderCollapseButton={() => this.renderCollapseButton()}
        />
      </div>
    );
  }

  renderCollapseButton() {
    const { collapsed } = this.state;

    return (
      <CollapseButton
        onClick={(value: boolean) => this.onClickCollapseButton(value)}
        collapsed={collapsed}
      />
    );
  }
}
