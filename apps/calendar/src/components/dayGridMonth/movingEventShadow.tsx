import { ComponentProps, h } from 'preact';

import type { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { MONTH_CELL_BAR_HEIGHT, MONTH_CELL_PADDING_TOP } from '@src/constants/style';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import { useDayGridMonthEventMove } from '@src/hooks/dayGridMonth/useDayGridMonthEventMove';
import { isNil } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof DayGridMonth>, 'dateMatrix' | 'rowInfo'> & {
  rowIndex: number;
  gridPositionFinder: GridPositionFinder;
};

export function MovingEventShadow({ dateMatrix, gridPositionFinder, rowInfo, rowIndex }: Props) {
  const { movingEvent, currentGridPos } = useDayGridMonthEventMove({
    dateMatrix,
    rowInfo,
    gridPositionFinder,
  });

  if (currentGridPos?.rowIndex !== rowIndex || isNil(movingEvent)) {
    return null;
  }

  return (
    <HorizontalEvent
      uiModel={movingEvent}
      movingLeft={movingEvent.left}
      eventHeight={EVENT_HEIGHT}
      headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
    />
  );
}
