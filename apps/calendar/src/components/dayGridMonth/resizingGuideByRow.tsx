import type { ComponentProps } from 'preact';
import { h } from 'preact';

import type { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
} from '@src/constants/style';
import { cls } from '@src/helpers/css';
import type { getRenderedEventUIModels } from '@src/helpers/grid';
import { useDayGridMonthEventResize } from '@src/hooks/dayGridMonth/useDayGridMonthEventResize';
import { isNil } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof DayGridMonth>, 'dateMatrix' | 'cellWidthMap'> & {
  gridPositionFinder: GridPositionFinder;
  renderedUIModels: ReturnType<typeof getRenderedEventUIModels>[];
  rowIndex: number;
};

export function ResizingGuideByRow({
  dateMatrix,
  cellWidthMap,
  gridPositionFinder,
  renderedUIModels,
  rowIndex,
}: Props) {
  const resizingGuideProps = useDayGridMonthEventResize({
    dateMatrix,
    gridPositionFinder,
    cellWidthMap,
    renderedUIModels,
    rowIndex,
  });

  if (isNil(resizingGuideProps)) {
    return null;
  }

  const [uiModel, resizingWidth] = resizingGuideProps;

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
