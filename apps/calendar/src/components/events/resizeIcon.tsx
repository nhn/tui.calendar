import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';

interface ResizeIconProps {
  style: { lineHeight: number | string };
}

const ResizeIcon: FunctionComponent<ResizeIconProps> = ({ style }) => {
  return (
    <span className={`${cls('weekday-resize-handle')} ${cls('handle-y')}`}>
      <i className={`${cls('icon')} ${cls('ic-handle-y')}`} style={style} />
    </span>
  );
};

export default ResizeIcon;
