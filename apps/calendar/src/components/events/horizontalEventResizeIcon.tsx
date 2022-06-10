import { h } from 'preact';

import { cls } from '@src/helpers/css';

import type { MouseEventListener } from '@t/util';

interface Props {
  onMouseDown?: MouseEventListener;
}

export function HorizontalEventResizeIcon({ onMouseDown }: Props) {
  return (
    <span
      className={`${cls('weekday-resize-handle')} ${cls('handle-y')}`}
      onMouseDown={onMouseDown}
      data-testid="horizontal-event-resize-icon"
    >
      <i className={`${cls('icon')} ${cls('ic-handle-y')}`} />
    </span>
  );
}
