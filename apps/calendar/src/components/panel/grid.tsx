import { h, FunctionComponent } from 'preact';

import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import { Day } from '@src/components/panel/schedules';
import { PANEL_NAME } from '@src/controller/week';

const PANEL_GRID_WRAPPER_CLASS_NAME = cls('panel-grid-wrapper');
const PANEL_GRID_CLASS_NAME = cls('panel-grid');
const WIDTH_PER_DAY = 100 / 12;
const DEFAULT_GRID_STYLE = {
  width: toPercent(100),
  left: 0,
  borderRight: '1px solid #ddd',
};

interface Props {
  name: PANEL_NAME;
  gridInfoList: TZDate[];
}

export const Grid: FunctionComponent<Props> = ({ gridInfoList }) => {
  const isDayView = gridInfoList.length === 1;

  return (
    <div className={PANEL_GRID_WRAPPER_CLASS_NAME}>
      {isDayView ? (
        <div className={PANEL_GRID_CLASS_NAME} style={{ ...DEFAULT_GRID_STYLE }} />
      ) : (
        gridInfoList.map((gridInfo, index) => {
          const day = gridInfo.getDay();
          const left = day === Day.SUN ? toPercent(0) : toPercent((2 * index - 1) * WIDTH_PER_DAY);
          const width =
            day === Day.SUN || day === Day.SAT
              ? toPercent(WIDTH_PER_DAY)
              : toPercent(WIDTH_PER_DAY * 2);

          return (
            <div
              key={`week-grid-${gridInfo.getDate()}`}
              className={PANEL_GRID_CLASS_NAME}
              style={{ ...DEFAULT_GRID_STYLE, width, left }}
            />
          );
        })
      )}
    </div>
  );
};
