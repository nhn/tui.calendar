import { h, FunctionComponent } from 'preact';

import GridEvent from '@src/components/events/gridEvent';

import TZDate from '@src/time/date';
import { EVENT_HEIGHT, isWithinHeight } from '@src/util/gridHelper';
import ScheduleViewModel from '@src/model/scheduleViewModel';

interface Props {
  name: string;
  cells: TZDate[];
  height: number;
  eventHeight?: number;
  events: ScheduleViewModel[];
  narrowWeekend: boolean;
  className: string;
}

const GridEvents: FunctionComponent<Props> = ({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
}) => {
  const filteredViewModels = events.filter(isWithinHeight(height, eventHeight));
  const headerHeight = 31; // @TODO: 테마에서 값 가져와서 설정

  const dayEvents = filteredViewModels.map((viewModel) => (
    <GridEvent
      viewModel={viewModel}
      key={`${name}-DayEvent-${viewModel.cid()}`}
      eventHeight={eventHeight}
      headerHeight={headerHeight}
    />
  ));

  return <div className={className}>{dayEvents}</div>;
};

export default GridEvents;
