import { h, FunctionComponent } from 'preact';

import { toPercent } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface CreationGuideProps {
  left: number;
  width: number;
}

const CreationGuide: FunctionComponent<CreationGuideProps> = (props) => {
  const { left, width } = props;
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
  };

  return <div className={cls('guide-creation')} style={style}></div>;
};

export default CreationGuide;
