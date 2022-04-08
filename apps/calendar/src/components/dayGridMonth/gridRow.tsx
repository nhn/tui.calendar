import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback } from 'preact/hooks';

import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
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
  const border = useTheme(useCallback((theme) => theme.common.border, []));

  return (
    <div
      className={cls('weekday-grid')}
      style={{
        height: cssHeight ?? height,
        borderTop: border,
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
