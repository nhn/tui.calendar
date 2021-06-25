import { FunctionComponent, h } from 'preact';

import { MouseEventListener } from '@src/components/hooks/drag';
import { cls } from '@src/util/cssHelper';

interface ResizeIconProps {
  style: { lineHeight: number | string };
  onMouseDown: MouseEventListener;
}

const ResizeIcon: FunctionComponent<ResizeIconProps> = ({ style, onMouseDown }) => {
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
