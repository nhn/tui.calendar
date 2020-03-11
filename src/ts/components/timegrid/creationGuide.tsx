import { h } from 'preact';
import classnames from 'classnames';
import { CreationGuideInfo, timeFormats, prefixer } from '@src/components/timegrid';
import { toFormat } from '@src/time/datetime';
import { toPercent } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

const classNames = {
  guide: prefixer('guide-creation'),
  label: cls('creation-label'),
  bottom: cls('creation-label-bottom')
};

interface Props extends CreationGuideInfo {
  top: number;
  height: number;
}

export function CreationGuide(props: Props) {
  const { start, end, unit, top, height, textPosition } = props;
  const format = timeFormats[unit];
  const text = `${toFormat(start, format)} - ${toFormat(end, format)}`;
  const style = {
    top: toPercent(top),
    height: toPercent(height)
  };
  const labelClassName = classnames(classNames.label, {
    [classNames.bottom]: textPosition === 'bottom'
  });

  return (
    <div className={classNames.guide} style={style}>
      <span className={labelClassName}>{text}</span>
    </div>
  );
}
CreationGuide.displayName = 'CreationGuide';
