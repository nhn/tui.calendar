import { useDraggingEvent } from '@src/hooks/event/draggingEvent';

import { GridPositionFinder, TimeGridData } from '@t/grid';

export function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent('move');

  return {
    movingEvent,
  };
}
