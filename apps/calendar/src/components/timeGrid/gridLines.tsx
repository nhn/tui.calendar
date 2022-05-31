import { h } from 'preact';
import { memo } from 'preact/compat';

import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';

import type { TimeGridRow } from '@t/grid';
import type { ThemeState } from '@t/theme';

function gridLineBorderSelector(theme: ThemeState) {
  return {
    halfHourLineBorder: theme.week.timeGridHalfHourLine.borderBottom,
    hourLineBorder: theme.week.timeGridHourLine.borderBottom,
  };
}

export const GridLines = memo(function GridLines({
  timeGridRows,
}: {
  timeGridRows: TimeGridRow[];
}) {
  const { halfHourLineBorder, hourLineBorder } = useTheme(gridLineBorderSelector);

  return (
    <div className={cls('gridlines')}>
      {timeGridRows.map((time, index) => {
        const isUpperLine = index % 2 === 0;

        return (
          <div
            key={`gridline-${time.startTime}-${time.endTime}`}
            className={cls('gridline-half')}
            style={{
              top: toPercent(time.top),
              height: toPercent(time.height),
              borderBottom: isUpperLine ? halfHourLineBorder : hourLineBorder,
            }}
            data-testid={`gridline-${time.startTime}-${time.endTime}`}
          />
        );
      })}
    </div>
  );
});
