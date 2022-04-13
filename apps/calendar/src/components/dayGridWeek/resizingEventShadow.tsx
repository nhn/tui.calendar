import type { ComponentProps } from 'preact';
import { h } from 'preact';

import type { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import { useAlldayGridRowEventResize } from '@src/hooks/dayGridWeek/useAlldayGridRowEventResize';
import { isNil } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof AlldayGridRow>, 'weekDates' | 'gridColWidthMap'> & {
  gridPositionFinder: GridPositionFinder;
};

export function ResizingEventShadow({ weekDates, gridColWidthMap, gridPositionFinder }: Props) {
  const { resizingEvent, resizingWidth } = useAlldayGridRowEventResize({
    weekDates,
    gridColWidthMap,
    gridPositionFinder,
  });

  if (isNil(resizingEvent)) {
    return null;
  }

  return (
    <HorizontalEvent
      uiModel={resizingEvent}
      eventHeight={EVENT_HEIGHT}
      headerHeight={0}
      resizingWidth={resizingWidth}
    />
  );
}
