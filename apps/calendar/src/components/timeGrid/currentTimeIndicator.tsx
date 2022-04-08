import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';

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

export function CurrentTimeIndicator({ top, columnWidth, columnCount, columnIndex }: Props) {
  const color = useTheme(useCallback((theme) => theme.week.currentTime.color, []));

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
      <div className={classNames.left} style={{ width: leftLine.width, borderColor: color }} />
      <div className={classNames.marker} style={{ left: leftLine.left, backgroundColor: color }} />
      <div
        className={classNames.today}
        style={{
          left: leftLine.left,
          width: toPercent(columnWidth),
          borderColor: color,
        }}
      />
      <div
        className={classNames.right}
        style={{
          left: rightLine.left,
        }}
      />
    </div>
  );
}
