import { h } from 'preact';
import Schedule from '@src/model/schedule';
import { cls } from '@src/util/cssHelper';

const styles = {
  background: cls('event-background')
};

interface Props {
  model: Schedule;
  width: string;
  height: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export function BackgroundEvent(props: Props) {
  const { model, width, height, top, right, bottom, left } = props;
  const style = {
    backgroundColor: model.bgColor,
    width,
    height,
    top,
    right,
    bottom,
    left
  };

  return <span className={styles.background} style={style}></span>;
}
BackgroundEvent.displayName = 'BackgroundEvent';
BackgroundEvent.defaultProps = {
  width: '100%',
  height: '100px',
  top: '',
  right: '',
  bottom: '',
  left: ''
};
