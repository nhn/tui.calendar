import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

interface Props {
  style: { lineHeight: number | string };
  onMouseDown: MouseEventListener;
}

const ResizeIcon: FunctionComponent<Props> = ({ style, onMouseDown }) => {
  return (
    <span
      className={`${cls('weekday-resize-handle')} ${cls('handle-y')}`}
      onMouseDown={onMouseDown}
    >
      <i className={`${cls('icon')} ${cls('ic-handle-y')}`} style={style} />
    </span>
  );
};

export default ResizeIcon;
