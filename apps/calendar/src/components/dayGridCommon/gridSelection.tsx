import { FunctionComponent, h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';

import { Cells } from '@t/panel';

interface Props {
  gridSelectionData: { startCellIndex: number; endCellIndex: number } | null;
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
  const { startCellIndex, endCellIndex } = gridSelectionData;

  const { left, width } = getLeftAndWidth(
    Math.min(startCellIndex, endCellIndex),
    Math.max(startCellIndex, endCellIndex),
    cells,
    narrowWeekend
  );

  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return width > 0 ? <div className={cls('daygrid-grid-selection')} style={style} /> : null;
};
