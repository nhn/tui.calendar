import { h } from 'preact';
import { memo } from 'preact/compat';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import EventUIModel from '@src/model/eventUIModel';

interface Props {
  name: string;
  height: number;
  eventHeight?: number;
  events: EventUIModel[];
  narrowWeekend: boolean;
  className: string;
  headerHeight: number;
  eventTopMargin: number;
  draggingEvent: EventUIModel | null;
}

export const MonthEvents = memo(function MonthEvents({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
  draggingEvent,
}: Props) {
  const dayEvents = events
    .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isDraggingTarget={uiModel.cid() === draggingEvent?.cid()}
        eventHeight={eventHeight}
        headerHeight={headerHeight}
      />
    ));

  return <div className={className}>{dayEvents}</div>;
});
