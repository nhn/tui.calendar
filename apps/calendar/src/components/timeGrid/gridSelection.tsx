import { FunctionComponent, h } from 'preact';

import { GridSelectionInfo, timeFormats } from '@src/components/timeGrid';
import { toFormat } from '@src/time/datetime';
import { cls, toPercent } from '@src/util/cssHelper';

interface Props extends GridSelectionInfo {
  top: number;
  height: number;
}

export const GridSelection: FunctionComponent<Props> = ({
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
};
