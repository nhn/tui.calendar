import { h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';
import TZDate from '@src/time/date';

interface Props {
  gridSelectionData: GridSelectionDataByRow | null;
  row: TZDate[];
  narrowWeekend: boolean;
}

export function GridSelection({ gridSelectionData, row, narrowWeekend }: Props) {
  if (!gridSelectionData) {
    return null;
  }
  const { startCellIndex, endCellIndex } = gridSelectionData;

  const { left, width } = getLeftAndWidth(
    Math.min(startCellIndex, endCellIndex),
    Math.max(startCellIndex, endCellIndex),
    row,
    narrowWeekend
  );

  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return width > 0 ? <div className={cls('daygrid-grid-selection')} style={style} /> : null;
}
