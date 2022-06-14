import { h } from 'preact';
import { memo } from 'preact/compat';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { MONTH_CELL_BAR_HEIGHT, MONTH_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useTheme } from '@src/contexts/themeStore';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import type EventUIModel from '@src/model/eventUIModel';
import { monthGridCellSelector } from '@src/selectors/theme';

interface Props {
  name: string;
  contentAreaHeight: number;
  eventHeight?: number;
  events: EventUIModel[];
  className: string;
}

export const MonthEvents = memo(function MonthEvents({
  contentAreaHeight,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
}: Props) {
  const { headerHeight } = useTheme(monthGridCellSelector);

  const dayEvents = events
    .filter(isWithinHeight(contentAreaHeight, eventHeight + MONTH_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        eventHeight={eventHeight}
        headerHeight={headerHeight ?? MONTH_CELL_BAR_HEIGHT}
      />
    ));

  return <div className={className}>{dayEvents}</div>;
});
