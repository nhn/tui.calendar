import { FunctionComponent, h, RefObject } from 'preact';
import { useRef } from 'preact/hooks';

import { Cell } from '@src/components/daygrid/cell';
import { useTheme } from '@src/contexts/theme';
import EventUIModel from '@src/model/eventUIModel';
import { getGridInfo, toFormat, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';

import { Cells } from '@t/panel';

interface Props {
  cssHeight?: CSSValue;
  gridDateEventModelMap?: Record<string, EventUIModel[]>;
  narrowWeekend?: boolean;
  startDayOfWeek?: number;
  workweek?: boolean;
  week: Cells;
  appContainer: RefObject<HTMLDivElement>;
  height?: number;
}

const Grid: FunctionComponent<Props> = ({
  cssHeight,
  narrowWeekend = false,
  startDayOfWeek = 0,
  workweek = false,
  week,
  appContainer,
  gridDateEventModelMap = {},
  height = 0,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { common } = useTheme();

  const { gridInfo } = getGridInfo(week.length, narrowWeekend, startDayOfWeek, workweek);

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
          <Cell
            key={`daygrid-cell-${dayIndex}`}
            date={date}
            dayIndex={dayIndex}
            style={{
              backgroundColor: 'transparent',
              width: toPercent(width),
              left: toPercent(left),
            }}
            parentContainer={container.current}
            appContainer={appContainer.current}
            events={gridDateEventModelMap[ymd]}
            height={height}
          />
        );
      })}
    </div>
  );
};
export default Grid;
