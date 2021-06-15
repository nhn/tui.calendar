import { h, FunctionComponent } from 'preact';

import { toPercent } from '@src/util/units';
import { cls } from '@src/util/cssHelper';
import { getLeftAndWidth } from '@src/util/gridHelper';

import { GridGuideCreationInfo } from '@t/components/daygrid/gridWithMouse';
import { Cells } from '@t/panel';

interface CreationGuideProps {
  left: number;
  width: number;
}

export function renderCreationGuide(
  creationGuide: GridGuideCreationInfo,
  cells: Cells,
  narrowWeekend: boolean
) {
  const { start, end } = creationGuide;
  const { left, width } = getLeftAndWidth(start, end, cells, narrowWeekend);

  return width > 0 ? <CreationGuide {...creationGuide} left={left} width={width} /> : null;
}

const CreationGuide: FunctionComponent<CreationGuideProps> = (props) => {
  const { left, width } = props;
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return <div className={cls('daygrid-creation-guide')} style={style} />;
};

export default CreationGuide;
