import { h, Component, Fragment } from 'preact';
import isNumber from 'tui-code-snippet/type/isNumber';
import range from 'tui-code-snippet/array/range';
import { prefixer } from '@src/components/timegrid';
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

const REFRESH_INTERVAL = 1000 * SIXTY_SECONDS;

const classNames = {
  container: prefixer('container'),
  stickyContainer: prefixer('sticky-container')
};

interface Props {
  timezones?: TimezoneConfig[];
  showTimezoneLabel?: boolean;
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
    const { timezones = [] } = this.props;
    const now = new TZDate();
    const startOfToday = toStartOfDay(now);

    return timezones.map((timezone, index) => {
      const { timezoneOffset } = timezone;
      const isPrimaryTimezone = index === 0;

      return {
        times: makeHours(startOfToday, timezoneOffset),
        currentTime: isPrimaryTimezone
          ? clone(now)
          : addMinutes(now, getTimezoneDifference(now, timezoneOffset)),
        timezone
      };
    });
  }

  render() {
    const { collapsed } = this.state;
    const { showTimezoneLabel } = this.props;

    const timezones = this.makeTimezones();
    const [primaryTimes, ...subTimes] = timezones.map(timezone => timezone.times);
    const [primaryCurrentTime, ...subCurrentTimes] = timezones.map(
      timezone => timezone.currentTime
    );
    const reverseTimes = collapsed ? [] : subTimes.reverse();
    const reverseCurrentTimes = collapsed ? [] : subCurrentTimes.reverse();
    const showCurrentTime = isSameDate(primaryCurrentTime, new TZDate());

    if (showCurrentTime) {
      this.addTimeoutOnExactMinutes();
    }

    return (
      <Fragment>
        <div className={classNames.container}>
          {reverseTimes.map((times, index) => (
            <Times
              key={index}
              times={times}
              showCurrentTime={showCurrentTime}
              currentTime={reverseCurrentTimes[index]}
              dateDifference={getDateDifference(reverseCurrentTimes[index], primaryCurrentTime)}
              timeTemplate="timegridDisplayTime"
            />
          ))}
          <Times
            times={primaryTimes}
            showCurrentTime={showCurrentTime}
            currentTime={primaryCurrentTime}
            timeTemplate="timegridDisplayPrimaryTime"
          />
        </div>

        {showTimezoneLabel
          ? this.renderStickyContainer(timezones.map(({ timezone }) => timezone))
          : null}
      </Fragment>
    );
  }

  renderStickyContainer(timezones: TimezoneConfig[]) {
    const [primaryTimezone, ...subTimezones] = timezones;
    const reverseTimezones = subTimezones.reverse();

    return (
      <Fragment>
        {reverseTimezones.length ? (
          <div className={classNames.stickyContainer}>
            {!this.state.collapsed
              ? reverseTimezones.map((timezone, index) => (
                  <TimezoneLabel key={index} timezone={timezone} />
                ))
              : null}
            <TimezoneLabel
              timezone={primaryTimezone}
              renderCollapseButton={() => this.renderCollapseButton()}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }

  renderCollapseButton() {
    const { collapsed } = this.state;

    return (
      <CollapseButton
        onClick={(value: boolean) => {
          this.setState({ collapsed: !value });
        }}
        collapsed={collapsed}
      />
    );
  }
}
