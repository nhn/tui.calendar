import { h } from 'preact';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';

import type { ThemeState } from '@t/theme';

const classNames = {
  line: cls(addTimeGridPrefix('current-time-line')),
  left: cls(addTimeGridPrefix('current-time-line-left')),
  marker: cls(addTimeGridPrefix('current-time-line-marker')),
  today: cls(addTimeGridPrefix('current-time-line-today')),
  right: cls(addTimeGridPrefix('current-time-line-right')),
};

interface Props {
  top: number;
  columnWidth: number;
  columnCount: number;
  columnIndex: number;
}

function currentTimeIndicatorTheme(theme: ThemeState) {
  return {
    pastBorder: theme.week.currentTimeLinePast.border,
    todayBorder: theme.week.currentTimeLineToday.border,
    futureBorder: theme.week.currentTimeLineFuture.border,
    bulletBackgroundColor: theme.week.currentTimeLineBullet.backgroundColor,
  };
}

export function CurrentTimeIndicator({ top, columnWidth, columnCount, columnIndex }: Props) {
  const { pastBorder, todayBorder, futureBorder, bulletBackgroundColor } =
    useTheme(currentTimeIndicatorTheme);

  const leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex),
  };
  const rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1)),
  };

  return (
    <div
      className={classNames.line}
      style={{ top: toPercent(top) }}
      data-testid="timegrid-current-time-indicator"
    >
      <div className={classNames.left} style={{ width: leftLine.width, borderTop: pastBorder }} />
      <div
        className={classNames.marker}
        style={{ left: leftLine.left, backgroundColor: bulletBackgroundColor }}
      />
      <div
        className={classNames.today}
        style={{
          left: leftLine.left,
          width: toPercent(columnWidth),
          borderTop: todayBorder,
        }}
      />
      <div
        className={classNames.right}
        style={{
          left: rightLine.left,
          borderTop: futureBorder,
        }}
      />
    </div>
  );
}
