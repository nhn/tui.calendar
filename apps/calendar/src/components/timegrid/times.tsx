import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';
import toArray from 'tui-code-snippet/collection/toArray';
import addClass from 'tui-code-snippet/domUtil/addClass';
import removeClass from 'tui-code-snippet/domUtil/removeClass';
import TZDate from '@src/time/date';
import { TimeUnit } from '@src/model';
import { toFormat, isSameDate, isSameMonth, isSameYear } from '@src/time/datetime';
import { getTopPercentByTime } from '@src/controller/times';
import { first, last } from '@src/util/array';
import { isOverlapped } from '@src/util/domutil';
import { Template } from '@src/components/template';
import { TemplateName } from '@src/template/default';
import { prefixer } from '@src/components/timegrid';
import { CurrentTimeLabel } from '@src/components/timegrid/currentTimeLabel';
import { classnames } from '@src/util/cssHelper';

const classNames = {
  times: prefixer('times'),
  time: prefixer('time'),
  timeLabel: prefixer('time-label'),
  past: prefixer('time-past'),
  first: prefixer('time-first'),
  last: prefixer('time-last'),
  hidden: prefixer('time-hidden'),
  collpaseButton: prefixer('collapse-button'),
  currentTime: prefixer('current-time'),
};

export interface TimeProps {
  date: TZDate;
  display: string;
}

interface Props {
  unit: TimeUnit;
  times: TimeProps[];
  width: string;
  showFirst: boolean;
  showLast: boolean;
  showCurrentTime: boolean;
  currentTime?: TZDate;
  dateDifference?: number;
  start?: number;
  end?: number;
  timeTemplate?: TemplateName;
}

// eslint-disable-next-line complexity
function isPastByUnit(time: TZDate, now: TZDate, unit: TimeUnit) {
  let past = time < now;

  if (unit === 'date') {
    past = past && !isSameDate(time, now);
  } else if (unit === 'month') {
    past = past && !isSameMonth(time, now);
  } else if (unit === 'year') {
    past = past && !isSameYear(time, now);
  }

  return past;
}

function hideOverlappedTime(timesElement: HTMLElement) {
  const timeLabelElements = toArray<HTMLElement>(
    timesElement.getElementsByClassName(classNames.timeLabel)
  );
  const [currentElement] = toArray<HTMLElement>(
    timesElement.getElementsByClassName(classNames.currentTime)
  );

  timeLabelElements.forEach((timeLabelElement) => {
    if (isOverlapped(timeLabelElement, currentElement)) {
      addClass(timeLabelElement, classNames.hidden);
    } else {
      removeClass(timeLabelElement, classNames.hidden);
    }
  });
}

export function Times(props: Props) {
  const {
    unit,
    width = '72px',
    showFirst,
    showLast,
    showCurrentTime,
    currentTime = new TZDate(),
    dateDifference,
    start = 0,
    end = props.times.length - 1,
    timeTemplate,
  } = props;
  const times = props.times.slice(start, end + 1);
  const top = getTopPercentByTime(currentTime, first(times).date, last(times).date);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showCurrentTime && ref.current) {
      hideOverlappedTime(ref.current);
    }
  }, [showCurrentTime]);

  return (
    <div ref={ref} className={classNames.times} style={{ width }}>
      {times.map((slot, index) => {
        const isPast = isPastByUnit(slot.date, currentTime, unit);
        const isFirst = index === 0;
        const isLast = index === times.length - 1;
        const className = classnames(classNames.time, {
          [classNames.past]: isPast,
          [classNames.first]: isFirst,
          [classNames.last]: isLast,
          [classNames.hidden]: isLast && !showLast,
        });
        const display = !showFirst && isFirst ? '' : slot.display;

        return (
          <div className={className} key={index}>
            <span className={classNames.timeLabel}>
              {timeTemplate ? (
                <Template template={timeTemplate} model={{ time: slot.date }} />
              ) : (
                display
              )}
            </span>
          </div>
        );
      })}
      {showCurrentTime ? (
        <CurrentTimeLabel
          unit={unit}
          time={currentTime}
          top={top}
          dateDifference={dateDifference}
        />
      ) : null}
    </div>
  );
}

Times.displayName = 'Times';
Times.defaultProps = {
  unit: 'hour',
  times: range(0, 25).map((hour) => {
    const date = new TZDate();
    date.setHours(hour, 0, 0, 0);

    const display = toFormat(date, 'HH:mm');

    return {
      date,
      display,
    };
  }),
  width: '72px',
  showCurrentTime: false,
  showFirst: false,
  showLast: false,
};
