import { h } from 'preact';

import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { getLeftAndWidth } from '@src/helpers/grid';
import type TZDate from '@src/time/date';

import type { GridSelectionDataByRow } from '@t/components/gridSelection';
import type { ThemeState } from '@t/theme';

interface Props {
  type: 'allday' | 'month' | 'accumulated';
  gridSelectionData: GridSelectionDataByRow;
  weekDates: TZDate[];
  narrowWeekend: boolean;
}

function commonGridSelectionSelector(theme: ThemeState) {
  return theme.common.gridSelection;
}

export function GridSelection({ type, gridSelectionData, weekDates, narrowWeekend }: Props) {
  const { backgroundColor, border } = useTheme(commonGridSelectionSelector);
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

  return width > 0 ? <div className={cls(type, 'grid-selection')} style={style} /> : null;
}
