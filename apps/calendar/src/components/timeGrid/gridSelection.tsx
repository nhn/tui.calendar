import { h } from 'preact';

import { cls, toPercent } from '@src/helpers/css';

interface Props {
  top: number;
  height: number;
  text: string;
}

export function GridSelection({ top, height, text }: Props) {
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
      {text.length > 0 ? <span className={cls('grid-selection-label')}>{text}</span> : null}
    </div>
  );
}
