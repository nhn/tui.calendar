import { h } from 'preact';
import { memo } from 'preact/compat';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { isVisibleEvent } from '@src/helpers/events';
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
}

export const MonthEvents = memo(function MonthEvents({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
}: Props) {
  const dayEvents = events
    .filter((uiModel) => isVisibleEvent(uiModel.model))
    .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        eventHeight={eventHeight}
        headerHeight={headerHeight}
      />
    ));

  return <div className={className}>{dayEvents}</div>;
});
