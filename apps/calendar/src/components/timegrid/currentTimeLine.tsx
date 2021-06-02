import { FunctionComponent, h } from 'preact';

import { prefixer } from '@src/components/timegrid';
import { toPercent } from '@src/util/units';

const classNames = {
  line: prefixer('current-time-line'),
  left: prefixer('current-time-line-left'),
  marker: prefixer('current-time-line-marker'),
  today: prefixer('current-time-line-today'),
  right: prefixer('current-time-line-right'),
};

interface Props {
  top: number;
  columnWidth: number;
  columnCount: number;
  columnIndex: number;
}

export const CurrentTimeLine: FunctionComponent<Props> = ({
  top,
  columnWidth,
  columnCount,
  columnIndex,
}) => {
  const leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex),
  };
  const rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1)),
  };
  const currentTimeLeftBorderTop = '1px dashed #515ce6';
  const currentTimeBulletBackgroundColor = '#515ce6';
  const currentTimeTodayBorderTop = '1px solid #515ce6';
  const currentTimeRightBorderTop = 'none';

  return (
    <div className={classNames.line} style={{ top: toPercent(top) }}>
      <div
        className={classNames.left}
        style={{ width: leftLine.width, borderTop: currentTimeLeftBorderTop }}
      />
      <div
        className={classNames.marker}
        style={{ left: leftLine.left, backgroundColor: currentTimeBulletBackgroundColor }}
      />
      <div
        className={classNames.today}
        style={{
          left: leftLine.left,
          width: toPercent(columnWidth),
          borderTop: currentTimeTodayBorderTop,
        }}
      />
      <div
        className={classNames.right}
        style={{
          left: rightLine.left,
          borderTop: currentTimeRightBorderTop,
        }}
      />
    </div>
  );
};
