import { h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';

import { TimeGridRow } from '@t/grid';

export function GridLines({ timeGridRows }: { timeGridRows: TimeGridRow[] }) {
  return (
    <div className={cls('gridlines')}>
      {timeGridRows.map((time, index) => (
        <div
          key={`gridline-${time.startTime}-${time.endTime}`}
          className={cls('gridline-half', `gridline-half--${index % 2 === 1 ? 'lower' : 'upper'}`)}
          style={{
            top: toPercent(time.top),
            height: toPercent(time.height),
          }}
        />
      ))}
    </div>
  );
}
