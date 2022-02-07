import { h } from 'preact';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { cls, toPercent } from '@src/helpers/css';
import TZDate from '@src/time/date';

import { TimeGridRow } from '@t/grid';

const classNames = {
  times: addTimeGridPrefix('times'),
  time: addTimeGridPrefix('time'),
  timeLabel: addTimeGridPrefix('time-label'),
  first: addTimeGridPrefix('time-first'),
  last: addTimeGridPrefix('time-last'),
};

interface Props {
  timeGridRows: TimeGridRow[];
  columnWidth: number;
}

// @TODO: replace MultipleTimezones component
export function TimeColumn({ timeGridRows, columnWidth }: Props) {
  return (
    <div className={cls(classNames.times)} style={{ width: columnWidth }}>
      {timeGridRows.map((row, index) => {
        if (index % 2 === 1) {
          return null;
        }

        const isFirst = index === 0;
        const isLast = index === timeGridRows.length - 1;
        const className = cls(classNames.time, {
          [classNames.first]: isFirst,
          [classNames.last]: isLast,
        });
        const top = toPercent(!isFirst && !isLast ? timeGridRows[index - 2].top : row.top);
        const height = toPercent(!isFirst && !isLast ? row.height * 4 : row.height * 2);
        const date = new TZDate();
        const startHourAndMinutes = row.startTime.split(':').map(Number) as [number, number];
        date.setHours(...startHourAndMinutes);

        return (
          <div key={`slot-${row.startTime}`} className={className} style={{ top, height }}>
            <Template template="timegridDisplayPrimaryTime" model={{ time: date }} as="span" />
          </div>
        );
      })}
    </div>
  );
}
