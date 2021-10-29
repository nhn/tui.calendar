import { FunctionComponent, h } from 'preact';

import GridEvent from '@src/components/events/gridEvent';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { EVENT_HEIGHT, isWithinHeight } from '@src/util/gridHelper';

interface Props {
  name: string;
  cells: TZDate[];
  height: number;
  eventHeight?: number;
  events: EventUIModel[];
  narrowWeekend: boolean;
  className: string;
  headerHeight: number;
  eventTopMargin: number;
}

const GridEvents: FunctionComponent<Props> = ({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
}) => {
  const filteredUIModels = events.filter(
    isWithinHeight(height - headerHeight, eventHeight + eventTopMargin)
  );

  const dayEvents = filteredUIModels.map((uiModel) => (
    <GridEvent
      uiModel={uiModel}
      key={`${name}-DayEvent-${uiModel.cid()}`}
      eventHeight={eventHeight}
      headerHeight={headerHeight}
    />
  ));

  return <div className={className}>{dayEvents}</div>;
};

export default GridEvents;
