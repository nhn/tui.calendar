import { FunctionComponent, h } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface Props {
  viewModel: ScheduleViewModel;
}

const EVENT_HEIGHT = 20;

export const DayEvent: FunctionComponent<Props> = ({ viewModel }) => {
  const { width, left, top, exceedRight } = viewModel;

  const style = {
    width: toPercent(width),
    left: toPercent(left),
    top: toPx(top * EVENT_HEIGHT),
  };

  return (
    <div
      className={`${cls('weekday-event-block')} ${cls(exceedRight ? 'weekday-exceed-right' : '')}`}
      style={style}
    >
      <div className={cls('weekday-event')}>{viewModel.cid()}</div>
    </div>
  );
};
