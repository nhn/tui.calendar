import { h } from 'preact';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
} from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { AvailableResizingEventShadowProps } from '@src/hooks/dayGridMonth/dayGridMonthEventResize';

export function ResizingEventShadow({
  shadowEventProps,
}: {
  shadowEventProps: AvailableResizingEventShadowProps;
}) {
  const [uiModel, resizingWidth] = shadowEventProps;

  return (
    <div className={cls('weekday-events')}>
      <HorizontalEvent
        key={`resizing-event-${uiModel.cid()}`}
        uiModel={uiModel}
        eventHeight={MONTH_EVENT_HEIGHT}
        headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
        resizingWidth={resizingWidth}
      />
    </div>
  );
}
