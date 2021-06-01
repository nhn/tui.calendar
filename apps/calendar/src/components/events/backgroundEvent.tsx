import { h } from 'preact';
import Schedule from '@src/model/schedule';
import { cls } from '@src/util/cssHelper';
import ScheduleViewModel from '@src/model/scheduleViewModel';

const classNames = {
  background: cls('event-background'),
};

interface Props {
  viewModel: ScheduleViewModel;
  width: string;
  height: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export function BackgroundEvent(props: Props) {
  const { viewModel, width, height, top, right, bottom, left } = props;
  const style = {
    backgroundColor: viewModel.model.bgColor,
    width,
    height,
    top,
    right,
    bottom,
    left,
  };

  return <span className={classNames.background} style={style}></span>;
}
BackgroundEvent.displayName = 'BackgroundEvent';
BackgroundEvent.defaultProps = {
  width: '100%',
  height: '100px',
  top: '',
  right: '',
  bottom: '',
  left: '',
};
