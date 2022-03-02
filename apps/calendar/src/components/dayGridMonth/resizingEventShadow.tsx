import { ComponentProps, h } from 'preact';

import type { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
} from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { getRenderedEventUIModels } from '@src/helpers/grid';
import { useDayGridMonthEventResize } from '@src/hooks/dayGridMonth/dayGridMonthEventResize';
import { isNil } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof DayGridMonth>, 'dateMatrix' | 'cellWidthMap'> & {
  gridPositionFinder: GridPositionFinder;
  renderedUIModels: ReturnType<typeof getRenderedEventUIModels>[];
  rowIndex: number;
};

export function ResizingEventShadow({
  dateMatrix,
  cellWidthMap,
  gridPositionFinder,
  renderedUIModels,
  rowIndex,
}: Props) {
  const resizingEventShadowProps = useDayGridMonthEventResize({
    dateMatrix,
    gridPositionFinder,
    cellWidthMap,
    renderedUIModels,
  });

  const shadowProp = resizingEventShadowProps?.[rowIndex];

  if (isNil(shadowProp) || shadowProp.length === 0) {
    return null;
  }

  const [uiModel, resizingWidth] = shadowProp;

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
