import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useEffect, useState } from 'preact/hooks';

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

export const MonthEvents = memo(function MonthEvents({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
}: Props) {
  const draggingEventUIModel = useStore(useCallback((state) => state.dnd.draggingEventUIModel, []));
  const [draggingEventUIModelCId, setDraggingEventUIModelCId] = useState<number | null>(null);

  // Timing hack to make sure the dragging event state is updated
  // before changing opacities of target dragging events.
  useEffect(() => {
    requestAnimationFrame(() => {
      if (draggingEventUIModel) {
        setDraggingEventUIModelCId(draggingEventUIModel.cid());
      } else {
        setDraggingEventUIModelCId(null);
      }
    });
  }, [draggingEventUIModel]);

  const dayEvents = events
    .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isDraggingTarget={uiModel.cid() === draggingEventUIModelCId}
        eventHeight={eventHeight}
        headerHeight={headerHeight}
      />
    ));

  return <div className={className}>{dayEvents}</div>;
});
