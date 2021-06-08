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
  headerHeight: number;
}

const GridEvents: FunctionComponent<Props> = ({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
}) => {
  // @TODO: 테마에서 값 가져와서 설정
  const eventTopMargin = 2;
  const filteredViewModels = events.filter(
    isWithinHeight(height - headerHeight, eventHeight + eventTopMargin)
  );

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
