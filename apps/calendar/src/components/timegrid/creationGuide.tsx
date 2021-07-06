import { FunctionComponent, h } from 'preact';

import { CreationGuideInfo, timeFormats } from '@src/components/timegrid';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';

interface Props extends CreationGuideInfo {
  top: number;
  height: number;
}

export const CreationGuide: FunctionComponent<Props> = ({
  start,
  end,
  unit,
  top,
  height,
  textPosition,
}) => {
  const format = timeFormats[unit];
  const text = `${toFormat(start, format)} - ${toFormat(end, format)}`;
  const style = {
    top: toPercent(top),
    height: toPercent(height),
  };

  return (
    // @TODO: change classname & selector to 'timegrid-creation-guide'
    <div className={cls('guide-creation')} style={style}>
      <span
        className={cls('creation-label', {
          'creation-label-bottom': textPosition === 'bottom',
        })}
      >
        {text}
      </span>
    </div>
  );
};
