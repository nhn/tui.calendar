import type { ComponentProps } from 'preact';
import { h } from 'preact';

import type { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import { useAlldayGridRowEventMove } from '@src/hooks/dayGridWeek/useAlldayGridRowEventMove';
import { isNil } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof AlldayGridRow>, 'rowStyleInfo'> & {
  gridPositionFinder: GridPositionFinder;
};

export function MovingEventShadow({
  rowStyleInfo,
  gridPositionFinder,
}: Pick<Props, 'rowStyleInfo'> & {
  gridPositionFinder: GridPositionFinder;
}) {
  const { movingEvent, movingLeft } = useAlldayGridRowEventMove({
    rowStyleInfo,
    gridPositionFinder,
  });

  if (isNil(movingEvent)) {
    return null;
  }

  return (
    <HorizontalEvent
      uiModel={movingEvent}
      eventHeight={EVENT_HEIGHT}
      headerHeight={0}
      movingLeft={movingLeft}
    />
  );
}
