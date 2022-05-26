import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';
import type TZDate from '@src/time/date';

interface Props {
  gridSelectionData: GridSelectionDataByRow;
  weekDates: TZDate[];
  narrowWeekend: boolean;
}

export function GridSelection({ gridSelectionData, weekDates, narrowWeekend }: Props) {
  const { backgroundColor, border } = useTheme(
    useCallback((theme) => theme.common.gridSelection, [])
  );
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
    backgroundColor,
    border,
  };

  return width > 0 ? <div className={cls('daygrid-grid-selection')} style={style} /> : null;
}
