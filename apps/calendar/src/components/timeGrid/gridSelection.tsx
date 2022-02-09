import { h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';

interface Props {
  top: number;
  height: number;
  text: string;
  textPosition?: 'top' | 'bottom';
}

export function GridSelection({ top, height, text, textPosition }: Props) {
  const style = {
    top: toPercent(top),
    height: toPercent(height),
  };

  return (
    <div
      className={cls('grid-selection')}
      style={style}
      data-testId={`time-grid-selection-${top}-${height}`}
    >
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
