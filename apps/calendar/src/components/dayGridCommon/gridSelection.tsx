import { h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';
import TZDate from '@src/time/date';

interface Props {
  gridSelectionData: GridSelectionDataByRow;
  weekDates: TZDate[];
  narrowWeekend: boolean;
}

export function GridSelection({ gridSelectionData, weekDates, narrowWeekend }: Props) {
  const { startCellIndex, endCellIndex } = gridSelectionData;

  const { left, width } = getLeftAndWidth(
    Math.min(startCellIndex, endCellIndex),
    Math.max(startCellIndex, endCellIndex),
    weekDates,
    narrowWeekend
  );

  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return width > 0 ? <div className={cls('daygrid-grid-selection')} style={style} /> : null;
}
