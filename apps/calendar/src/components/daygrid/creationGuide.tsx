import { h, FunctionComponent } from 'preact';

import { toPercent } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

const classNames = {
  guide: cls('guide-creation'),
  label: cls('creation-label'),
  bottom: cls('creation-label-bottom'),
};

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

  return <div className={classNames.guide} style={style}></div>;
};

export default CreationGuide;
