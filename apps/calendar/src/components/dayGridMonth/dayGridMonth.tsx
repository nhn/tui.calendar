import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { AccumulatedGridSelection } from '@src/components/dayGridMonth/accumulatedGridSelection';
import { GridRow } from '@src/components/dayGridMonth/gridRow';
import { GridSelectionByRow } from '@src/components/dayGridMonth/gridSelectionByRow';
import { MonthEvents } from '@src/components/dayGridMonth/monthEvents';
import { MovingEventShadow } from '@src/components/dayGridMonth/movingEventShadow';
import { ResizingGuideByRow } from '@src/components/dayGridMonth/resizingGuideByRow';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { createGridPositionFinder, getRenderedEventUIModels } from '@src/helpers/grid';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import { useCalendarData } from '@src/hooks/calendar/useCalendarData';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import { calendarSelector, optionsSelector } from '@src/selectors';
import type TZDate from '@src/time/date';
import { getSize } from '@src/utils/dom';

import type { CalendarMonthOptions } from '@t/store';
import type { CellInfo } from '@t/time/datetime';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  dateMatrix: TZDate[][];
  rowInfo: CellInfo[];
  cellWidthMap: string[][];
}

function useGridHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(getSize(ref.current).height);
    }
  }, []);

  return { ref, height };
}

export function DayGridMonth({ dateMatrix = [], rowInfo = [], cellWidthMap = [] }: Props) {
  const [gridContainer, setGridContainerRef] = useDOMNode<HTMLDivElement>();
  const calendar = useStore(calendarSelector);
  const { ref, height } = useGridHeight();

  const { eventFilter, month: monthOptions } = useStore(optionsSelector);
  const { visibleWeeksCount, narrowWeekend } = monthOptions as CalendarMonthOptions;
  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        container: gridContainer,
        rowsCount: dateMatrix.length,
        columnsCount: dateMatrix[0].length,
      }),
    [dateMatrix, gridContainer]
  );

  const calendarData = useCalendarData(calendar, eventFilter);
  const renderedEventUIModels = useMemo(
    () => dateMatrix.map((week) => getRenderedEventUIModels(week, calendarData, narrowWeekend)),
    [calendarData, dateMatrix, narrowWeekend]
  );

  const onMouseDown = useGridSelection({
    type: 'dayGridMonth',
    gridPositionFinder,
    dateCollection: dateMatrix,
    dateGetter: dayGridMonthSelectionHelper.getDateFromCollection,
    selectionSorter: dayGridMonthSelectionHelper.sortSelection,
  });

  return (
    <div ref={setGridContainerRef} onMouseDown={onMouseDown} className={cls('month-daygrid')}>
      {dateMatrix.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = renderedEventUIModels[rowIndex];

        return (
          <div
            key={`dayGrid-events-${rowIndex}`}
            className={cls('month-week-item')}
            style={{ height: toPercent(rowHeight) }}
            ref={ref}
          >
            <div className={cls('weekday')}>
              <GridRow
                cssHeight={toPercent(TOTAL_PERCENT_HEIGHT)}
                gridDateEventModelMap={gridDateEventModelMap}
                week={week}
                rowInfo={rowInfo}
                height={height}
              />
              <MonthEvents
                name="month"
                events={uiModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={MONTH_EVENT_HEIGHT}
                className={cls('weekday-events')}
                headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
                eventTopMargin={MONTH_EVENT_MARGIN_TOP}
              />
              <GridSelectionByRow
                weekDates={week}
                narrowWeekend={narrowWeekend}
                rowIndex={rowIndex}
              />
              <AccumulatedGridSelection
                rowIndex={rowIndex}
                weekDates={week}
                narrowWeekend={narrowWeekend}
              />
            </div>
            <ResizingGuideByRow
              dateMatrix={dateMatrix}
              gridPositionFinder={gridPositionFinder}
              rowIndex={rowIndex}
              cellWidthMap={cellWidthMap}
              renderedUIModels={renderedEventUIModels}
            />
            <MovingEventShadow
              dateMatrix={dateMatrix}
              gridPositionFinder={gridPositionFinder}
              rowIndex={rowIndex}
              rowInfo={rowInfo}
            />
          </div>
        );
      })}
    </div>
  );
}
