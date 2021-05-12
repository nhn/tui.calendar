import { h, FunctionComponent } from 'preact';

import { Cell } from '@src/components/daygrid/cell';
import Schedule from '@src/model/schedule';
import { cls } from '@src/util/cssHelper';
import { getGridLeftAndWidth } from '@src/time/datetime';
import { toPercent } from '@src/util/units';
import TZDate from '@src/time/date';
import { useRef } from 'preact/hooks';

interface GridProps {
  height: number | string;
  events?: Schedule[];
  narrowWeekend?: boolean;
  startDayOfWeek?: number;
  workweek?: boolean;
  calendar: TZDate[];
  appContainer: { current: HTMLDivElement };
}

const Grid: FunctionComponent<GridProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const {
    height,
    narrowWeekend = false,
    startDayOfWeek = 0,
    workweek = false,
    calendar,
    appContainer,
    events = [], // @TODO: 그리드에 입력될 이벤트 정보를 셀에 넘겨주기 위함 (작성 필요)
  } = props;

  const style = {
    height,
    borderTop: '1px solid #e5e5e5',
  };

  const grids = getGridLeftAndWidth(calendar.length, narrowWeekend, startDayOfWeek, workweek);

  return (
    <div className={cls('grid')} style={style} ref={container}>
      {calendar.map((date, index) => {
        const dayIndex = date.getDay();
        const { width, left } = grids[index];

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
          />
        );
      })}
    </div>
  );
};
export default Grid;
