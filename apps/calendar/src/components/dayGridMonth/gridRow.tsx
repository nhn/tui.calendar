import { FunctionComponent, h } from 'preact';
import { memo } from 'preact/compat';
import { useRef } from 'preact/hooks';

import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { useTheme } from '@src/contexts/theme';
import { cls, toPercent } from '@src/helpers/css';
import EventUIModel from '@src/model/eventUIModel';
import { toFormat, toStartOfDay } from '@src/time/datetime';

import { Cells } from '@t/panel';

interface Props {
  cssHeight?: CSSValue;
  gridDateEventModelMap?: Record<string, EventUIModel[]>;
  week: Cells;
  gridInfo: GridInfo[];
  height?: number;
}

export const GridRow: FunctionComponent<Props> = memo(
  ({ cssHeight, week, gridInfo, gridDateEventModelMap = {}, height = 0 }) => {
    const container = useRef<HTMLDivElement>(null);
    const { common } = useTheme();

    return (
      <div
        className={cls('weekday-grid')}
        style={{
          height: cssHeight ?? height,
          borderTop: common.border,
        }}
        ref={container}
      >
        {week.map((date, columnIndex) => {
          const dayIndex = date.getDay();
          const { width, left } = gridInfo[columnIndex];
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
              parentContainer={container.current}
              events={gridDateEventModelMap[ymd]}
              height={height}
            />
          );
        })}
      </div>
    );
  }
);
