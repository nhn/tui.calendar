import { h } from 'preact';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { TEST_IDS } from '@src/test/testIds';

import type { ThemeState } from '@t/theme';

const classNames = {
  line: cls(addTimeGridPrefix('now-indicator')),
  left: cls(addTimeGridPrefix('now-indicator-left')),
  marker: cls(addTimeGridPrefix('now-indicator-marker')),
  today: cls(addTimeGridPrefix('now-indicator-today')),
  right: cls(addTimeGridPrefix('now-indicator-right')),
};

interface Props {
  top: number;
  columnWidth: number;
  columnCount: number;
  columnIndex: number;
}

function nowIndicatorTheme(theme: ThemeState) {
  return {
    pastBorder: theme.week.nowIndicatorPast.border,
    todayBorder: theme.week.nowIndicatorToday.border,
    futureBorder: theme.week.nowIndicatorFuture.border,
    bulletBackgroundColor: theme.week.nowIndicatorBullet.backgroundColor,
  };
}

export function NowIndicator({ top, columnWidth, columnCount, columnIndex }: Props) {
  const { pastBorder, todayBorder, futureBorder, bulletBackgroundColor } =
    useTheme(nowIndicatorTheme);

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
      data-testid={TEST_IDS.NOW_INDICATOR}
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
