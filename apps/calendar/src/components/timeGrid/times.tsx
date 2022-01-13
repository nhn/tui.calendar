import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';
import addClass from 'tui-code-snippet/domUtil/addClass';
import removeClass from 'tui-code-snippet/domUtil/removeClass';

import Template from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { CurrentTimeLabel } from '@src/components/timeGrid/currentTimeLabel';
import { useTheme } from '@src/contexts/theme';
import { getTopPercentByTime } from '@src/controller/times';
import { cls } from '@src/helpers/css';
import { TemplateName } from '@src/template/default';
import TZDate from '@src/time/date';
import { isSameDate, isSameMonth, isSameYear, toFormat } from '@src/time/datetime';
import { first, last } from '@src/utils/array';
import { isOverlapped } from '@src/utils/dom';

import { TimeUnit } from '@t/events';

const classNames = {
  times: addTimeGridPrefix('times'),
  time: addTimeGridPrefix('time'),
  timeLabel: addTimeGridPrefix('time-label'),
  past: addTimeGridPrefix('time-past'),
  first: addTimeGridPrefix('time-first'),
  last: addTimeGridPrefix('time-last'),
  hidden: addTimeGridPrefix('time-hidden'),
  collapseButton: addTimeGridPrefix('collapse-button'),
  currentTime: addTimeGridPrefix('current-time'),
};

export interface TimeProps {
  date: TZDate;
  display: string;
}

interface Props {
  unit?: TimeUnit;
  times?: TimeProps[];
  width?: string;
  showFirst?: boolean;
  showLast?: boolean;
  showCurrentTime?: boolean;
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
  const timeLabelElements = Array.from(
    timesElement.getElementsByClassName(cls(classNames.timeLabel))
  );
  const [currentElement] = Array.from(
    timesElement.getElementsByClassName(cls(classNames.currentTime))
  );

  timeLabelElements.forEach((timeLabelElement) => {
    if (isOverlapped(timeLabelElement, currentElement)) {
      addClass(timeLabelElement, cls(classNames.hidden));
    } else {
      removeClass(timeLabelElement, cls(classNames.hidden));
    }
  });
}

export function Times({
  unit = 'hour',
  width = '72px',
  showFirst = false,
  showLast = false,
  showCurrentTime = false,
  currentTime = new TZDate(),
  dateDifference,
  times = range(0, 25).map((hour) => {
    const date = new TZDate();
    date.setHours(hour, 0, 0, 0);

    const display = toFormat(date, 'HH:mm');

    return {
      date,
      display,
    };
  }),
  start = 0,
  end = times.length - 1,
  timeTemplate,
}: Props) {
  const { week } = useTheme();
  const pastTimeColor = week.pastTime.color;
  const filteredTimes = times.slice(start, end + 1);
  const timesLength = filteredTimes.length - 1;
  const top = getTopPercentByTime(currentTime, first(filteredTimes).date, last(filteredTimes).date);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showCurrentTime && ref.current) {
      hideOverlappedTime(ref.current);
    }
  }, [showCurrentTime]);

  return (
    <div ref={ref} className={cls(classNames.times)} style={{ width }}>
      {filteredTimes.map((slot, index) => {
        const isPast = isPastByUnit(slot.date, currentTime, unit);
        const isFirst = index === 0;
        const isLast = index === timesLength;
        const className = cls(classNames.time, {
          [classNames.past]: isPast,
          [classNames.first]: isFirst,
          [classNames.last]: isLast,
          [classNames.hidden]: isLast && !showLast,
        });
        const display = !showFirst && isFirst ? '' : slot.display;
        const style = {
          color: isPast ? pastTimeColor : '',
        };

        return (
          <div className={className} style={style} key={`slot-${index}`}>
            <span className={cls(classNames.timeLabel)}>
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
