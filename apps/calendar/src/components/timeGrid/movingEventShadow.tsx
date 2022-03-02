import { h } from 'preact';

import { TimeEvent } from '@src/components/events/timeEvent';
import { useTimeGridEventMove } from '@src/hooks/timeGrid/timeGridEventMove';
import { isNil } from '@src/utils/type';

import { GridPositionFinder, TimeGridData } from '@t/grid';

export function MovingEventShadow({
  gridPositionFinder,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  timeGridData: TimeGridData;
}) {
  const { movingEvent, nextStartTime } = useTimeGridEventMove({
    gridPositionFinder,
    timeGridData,
  });

  if (isNil(movingEvent)) {
    return null;
  }

  return <TimeEvent uiModel={movingEvent} nextStartTime={nextStartTime} />;
}
