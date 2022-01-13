import { h } from 'preact';
import { memo } from 'preact/compat';

import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { useTheme } from '@src/contexts/theme';
import { cls, toPercent } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/domNode';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { toFormat, toStartOfDay } from '@src/time/datetime';

import { CellStyle } from '@t/time/datetime';

interface Props {
  cssHeight?: CSSValue;
  gridDateEventModelMap?: Record<string, EventUIModel[]>;
  week: TZDate[];
  rowInfo: CellStyle[];
  height?: number;
}

export const GridRow = memo(function GridRow({
  cssHeight,
  week,
  rowInfo,
  gridDateEventModelMap = {},
  height = 0,
}: Props) {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const { common } = useTheme();

  return (
    <div
      className={cls('weekday-grid')}
      style={{
        height: cssHeight ?? height,
        borderTop: common.border,
      }}
      ref={containerRefCallback}
    >
      {week.map((date, columnIndex) => {
        const dayIndex = date.getDay();
        const { width, left } = rowInfo[columnIndex];
        const ymd = toFormat(toStartOfDay(date), 'YYYYMMDD');

        return (
          <GridCell
            key={`daygrid-cell-${dayIndex}`}
            date={date}
            dayIndex={dayIndex}
            style={{
              backgroundColor: 'transparent',
              width: toPercent(width),
              left: toPercent(left),
            }}
            parentContainer={container}
            events={gridDateEventModelMap[ymd]}
            height={height}
          />
        );
      })}
    </div>
  );
});
