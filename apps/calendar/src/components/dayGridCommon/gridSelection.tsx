import { FunctionComponent, h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';

import { Cells } from '@t/panel';

interface Props {
  gridSelectionData: { startCellIdx: number; endCellIdx: number } | null;
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
  const { startCellIdx, endCellIdx } = gridSelectionData;
  const isReversed = startCellIdx > endCellIdx;

  const { left, width } = getLeftAndWidth(
    isReversed ? endCellIdx : startCellIdx,
    isReversed ? startCellIdx : endCellIdx,
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
