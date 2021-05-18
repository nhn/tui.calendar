import { FunctionComponent, h } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';
import { EVENT_HEIGHT } from '@src/util/gridHelper';

interface Props {
  viewModel: ScheduleViewModel;
}

export const DayEvent: FunctionComponent<Props> = ({ viewModel }) => {
  const { width, left, top, exceedRight } = viewModel;

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
      <div className={cls('weekday-event')}>{viewModel.cid()}</div>
    </div>
  );
};
