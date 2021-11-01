import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import { getLeftAndWidth } from '@src/util/gridHelper';
import { toPercent } from '@src/util/units';

import { GridCreationGuide } from '@t/components/daygrid/gridWithMouse';
import { Cells } from '@t/panel';

interface Props {
  creationGuide: GridCreationGuide | null;
  cells: Cells;
  narrowWeekend: boolean;
}

export const GridSelection: FunctionComponent<Props> = ({
  creationGuide,
  cells,
  narrowWeekend,
}) => {
  if (!creationGuide) {
    return null;
  }

  const { start, end } = creationGuide;
  const { left, width } = getLeftAndWidth(start, end, cells, narrowWeekend);
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return width > 0 ? <div className={cls('daygrid-creation-guide')} style={style} /> : null;
};
