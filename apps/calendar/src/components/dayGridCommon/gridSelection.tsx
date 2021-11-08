import { FunctionComponent, h } from 'preact';

import { cls, toPercent } from '@src/util/cssHelper';
import { getLeftAndWidth } from '@src/util/gridHelper';

import { GridSelectionData } from '@t/components/daygrid/gridWithMouse';
import { Cells } from '@t/panel';

interface Props {
  gridSelectionData: GridSelectionData | null;
  cells: Cells;
  narrowWeekend: boolean;
}

export const GridSelection: FunctionComponent<Props> = ({
  gridSelectionData,
  cells,
  narrowWeekend,
}) => {
  if (!gridSelectionData) {
    return null;
  }

  const { start, end } = gridSelectionData;
  const { left, width } = getLeftAndWidth(start, end, cells, narrowWeekend);
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return width > 0 ? <div className={cls('daygrid-grid-selection')} style={style} /> : null;
};
