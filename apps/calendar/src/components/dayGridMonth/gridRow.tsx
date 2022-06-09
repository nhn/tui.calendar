import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback } from 'preact/hooks';

import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { toFormat, toStartOfDay } from '@src/time/datetime';

import type { CellStyle } from '@t/time/datetime';

interface Props {
  gridDateEventModelMap?: Record<string, EventUIModel[]>;
  week: TZDate[];
  rowInfo: CellStyle[];
  contentAreaHeight: number;
}

export const GridRow = memo(function GridRow({
  week,
  rowInfo,
  gridDateEventModelMap = {},
  contentAreaHeight,
}: Props) {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const border = useTheme(useCallback((theme) => theme.common.border, []));

  return (
    <div className={cls('weekday-grid')} style={{ borderTop: border }} ref={containerRefCallback}>
      {week.map((date, columnIndex) => {
        const dayIndex = date.getDay();
        const { width, left } = rowInfo[columnIndex];
        const ymd = toFormat(toStartOfDay(date), 'YYYYMMDD');

        return (
          <GridCell
            key={`daygrid-cell-${dayIndex}`}
            date={date}
            style={{
              width: toPercent(width),
              left: toPercent(left),
            }}
            parentContainer={container}
            events={gridDateEventModelMap[ymd]}
            contentAreaHeight={contentAreaHeight}
          />
        );
      })}
    </div>
  );
});
