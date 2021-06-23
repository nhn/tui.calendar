import { FunctionComponent, h } from 'preact';
import { useRef } from 'preact/hooks';

import { Cell } from '@src/components/daygrid/cell';
import { useTheme } from '@src/components/hooks/theme';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import { getGridLeftAndWidth, toFormat, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { EVENT_HEIGHT } from '@src/util/gridHelper';
import { toPercent, toPx } from '@src/util/units';

import { CSSValue } from '@t/components/daygrid/cell';

interface GridProps {
  cssHeight?: CSSValue;
  gridDateEventModelMap?: Record<string, ScheduleViewModel[]>;
  narrowWeekend?: boolean;
  startDayOfWeek?: number;
  workweek?: boolean;
  calendar: TZDate[];
  appContainer: { current: HTMLDivElement };
  eventHeight?: number;
  height?: number;
}

const Grid: FunctionComponent<GridProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const {
    cssHeight,
    narrowWeekend = false,
    startDayOfWeek = 0,
    workweek = false,
    calendar,
    appContainer,
    gridDateEventModelMap = {},
    eventHeight = EVENT_HEIGHT,
    height = 0,
  } = props;
  const { common } = useTheme();

  const style = {
    height: cssHeight ?? toPx(height),
    borderTop: common.border,
  };

  const grids = getGridLeftAndWidth(calendar.length, narrowWeekend, startDayOfWeek, workweek);

  return (
    <div className={cls('weekday-grid')} style={style} ref={container}>
      {calendar.map((date, columnIndex) => {
        const dayIndex = date.getDay();
        const { width, left } = grids[columnIndex];
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
            eventHeight={eventHeight}
            height={height}
          />
        );
      })}
    </div>
  );
};
export default Grid;
