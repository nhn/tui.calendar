import { h } from 'preact';

import { cls } from '@src/helpers/css';
import type EventUIModel from '@src/model/eventUIModel';

const classNames = {
  background: cls('event-background'),
};

interface Props {
  uiModel: EventUIModel;
  width?: string;
  height?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export function BackgroundEvent({
  uiModel,
  width = '100%',
  height = '100px',
  top = '',
  right = '',
  bottom = '',
  left = '',
}: Props) {
  const style = {
    backgroundColor: uiModel.model.backgroundColor,
    width,
    height,
    top,
    right,
    bottom,
    left,
  };

  return <span className={classNames.background} style={style} />;
}
