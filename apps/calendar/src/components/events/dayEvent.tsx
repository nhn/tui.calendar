import { FunctionComponent, h } from 'preact';

import { cls, toPercent, toPx } from '@src/helpers/css';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import EventUIModel from '@src/model/eventUIModel';

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
