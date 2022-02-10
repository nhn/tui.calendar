import { h } from 'preact';

import { cls } from '@src/helpers/css';

interface Props {
  style: { lineHeight: number | string };
  onMouseDown?: MouseEventListener;
}

export function ResizeIcon({ style, onMouseDown }: Props) {
  return (
    <span
      className={`${cls('weekday-resize-handle')} ${cls('handle-y')}`}
      onMouseDown={onMouseDown}
      data-test-id="horizontal-event-resize-icon"
    >
      <i className={`${cls('icon')} ${cls('ic-handle-y')}`} style={style} />
    </span>
  );
}
