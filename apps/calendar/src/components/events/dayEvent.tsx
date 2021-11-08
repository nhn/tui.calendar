import { FunctionComponent, h } from 'preact';

import EventUIModel from '@src/model/eventUIModel';
import { cls, toPercent, toPx } from '@src/util/cssHelper';
import { EVENT_HEIGHT } from '@src/util/gridHelper';

interface Props {
  uiModel: EventUIModel;
}

export const DayEvent: FunctionComponent<Props> = ({ uiModel }) => {
  const { width, left, top, exceedRight } = uiModel;

  const style = {
    width: toPercent(width),
    left: toPercent(left),
    top: toPx(top * EVENT_HEIGHT),
  };

  const dayEventBlockClassName = `${cls('weekday-event-block')} ${cls(
    exceedRight ? 'weekday-exceed-right' : ''
  )}`;

  return (
    <div className={dayEventBlockClassName} style={style}>
      <div className={cls('weekday-event')}>{uiModel.cid()}</div>
    </div>
  );
};
