import { FunctionComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { useStore } from '@src/contexts/calendarStore';
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

export const MonthEvents: FunctionComponent<Props> = ({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
}) => {
  const draggingEventUIModel = useStore(useCallback((state) => state.dnd.draggingEventUIModel, []));

  const dayEvents = events
    .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isDraggingTarget={uiModel.cid() === draggingEventUIModel?.cid()}
        eventHeight={eventHeight}
        headerHeight={headerHeight}
      />
    ));

  return <div className={className}>{dayEvents}</div>;
};
