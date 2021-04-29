import { FunctionComponent, h } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface Props {
  viewModel: ScheduleViewModel;
}

export const DayEvent: FunctionComponent<Props> = ({ viewModel }) => {
  const style = {
    width: toPercent(viewModel.width),
    left: toPercent(viewModel.left),
    top: toPx(viewModel.top * 20),
  };

  return (
    <div className={cls('weekday-event-block')} style={style}>
      <div className={cls('weekday-event')}>{viewModel.cid()}</div>
    </div>
  );
};
