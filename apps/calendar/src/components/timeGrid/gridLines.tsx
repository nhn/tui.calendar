import { h } from 'preact';
import { memo } from 'preact/compat';

import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { getTimeSteps } from '@src/time/datetime';

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
  const { STEPS } = getTimeSteps(timeGridRows);
  const { halfHourLineBorder, hourLineBorder } = useTheme(gridLineBorderSelector);

  let count = 1;

  return (
    <div className={cls('gridlines')}>
      {timeGridRows.map((time) => {
        count = count === STEPS + 1 ? 1 : count;
        const isUpperLine = count !== STEPS;
        count += 1;

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
