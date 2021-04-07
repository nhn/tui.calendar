import { h, FunctionComponent } from 'preact';

import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';

const PANEL_GRID_WRAPPER_CLASS_NAME = cls('panel-grid-wrapper');
const PANEL_GRID_CLASS_NAME = cls('panel-grid');
const WIDTH_PER_DAY = 100 / 12;
const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};

interface Props {
  gridInfoList: TZDate[];
}

export const Grid: FunctionComponent<Props> = ({ gridInfoList }) => {
  return (
    <div className={PANEL_GRID_WRAPPER_CLASS_NAME}>
      {gridInfoList.map((gridInfo, index) => {
        const day = gridInfo.getDay();
        const left = !day ? toPercent(0) : toPercent((2 * index - 1) * WIDTH_PER_DAY);
        const width =
          day === 0 || day === 6 ? toPercent(WIDTH_PER_DAY) : toPercent(WIDTH_PER_DAY * 2);

        return (
          <div
            key={`grid-${gridInfo.getDate()}`}
            className={PANEL_GRID_CLASS_NAME}
            style={{ ...DEFAULT_GRID_STYLE, width, left }}
          />
        );
      })}
    </div>
  );
};
