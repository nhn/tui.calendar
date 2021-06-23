import { FunctionComponent, h } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { cls } from '@src/util/cssHelper';

const classNames = {
  background: cls('event-background'),
};

interface Props {
  eventModels: ScheduleViewModel;
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export const BackgroundEvent: FunctionComponent<Props> = ({
  eventModels,
  width = '100%',
  height = '100px',
  top = '',
  right = '',
  bottom = '',
  left = '',
}) => {
  const style = {
    backgroundColor: eventModels.model.bgColor,
    width,
    height,
    top,
    right,
    bottom,
    left,
  };

  return <span className={classNames.background} style={style} />;
};
