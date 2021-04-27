import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import { getGridStyleInfo } from '@src/time/panelEvent';

import type { GridInfoList } from '@t/panel';

const TOTAL_WIDTH = 100;
const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};

interface Props {
  gridInfoList: GridInfoList;
  narrowWeekend: boolean;
}

export const PanelGrid: FunctionComponent<Props> = ({ gridInfoList, narrowWeekend }) => {
  const { widthList, leftList } = getGridStyleInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: TOTAL_WIDTH,
  });

  const getCells = () =>
    gridInfoList.map((gridInfo, index) => {
      const width = toPercent(widthList[index]);
      const left = toPercent(leftList[index]);

      return (
        <div
          key={`panel-grid-${gridInfo.getDate()}`}
          className={cls('panel-grid')}
          style={{ ...DEFAULT_GRID_STYLE, width, left }}
        />
      );
    });

  return <div className={cls('panel-grid-wrapper')}>{getCells()}</div>;
};
