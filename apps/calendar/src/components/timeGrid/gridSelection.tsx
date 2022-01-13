import { h } from 'preact';

import { timeFormats } from '@src/components/timeGrid';
import { cls, toPercent } from '@src/helpers/css';
import { toFormat } from '@src/time/datetime';

import { TimeGridSelectionInfo } from '@t/components/timeGrid/gridSelection';

interface Props extends TimeGridSelectionInfo {
  top: number;
  height: number;
}

export function GridSelection({ start, end, unit, top, height, textPosition }: Props) {
  const format = timeFormats[unit];
  const text = `${toFormat(start, format)} - ${toFormat(end, format)}`;
  const style = {
    top: toPercent(top),
    height: toPercent(height),
  };

  return (
    <div className={cls('grid-selection')} style={style}>
      <span
        className={cls('grid-selection-label', {
          'grid-selection-label-bottom': textPosition === 'bottom',
        })}
      >
        {text}
      </span>
    </div>
  );
}
