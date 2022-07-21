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
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { createGridPositionFinder, getRenderedEventUIModels } from '@src/helpers/grid';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import { useCalendarData } from '@src/hooks/calendar/useCalendarData';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import { calendarSelector, optionsSelector } from '@src/selectors';
import { monthVisibleEventCountSelector } from '@src/selectors/options';
import { monthGridCellSelector } from '@src/selectors/theme';
import type TZDate from '@src/time/date';
import { getSize } from '@src/utils/dom';
import { passConditionalProp } from '@src/utils/preact';

import type { CalendarMonthOptions } from '@t/store';
import type { CellInfo } from '@t/time/datetime';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  dateMatrix: TZDate[][];
  rowInfo: CellInfo[];
  cellWidthMap: string[][];
}

function useCellContentAreaHeight(eventHeight: number) {
  const visibleEventCount = useStore(monthVisibleEventCountSelector);
  const { headerHeight: themeHeaderHeight, footerHeight: themeFooterHeight } =
    useTheme(monthGridCellSelector);

  const ref = useRef<HTMLDivElement>(null);
  const [cellContentAreaHeight, setCellContentAreaHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rowHeight = getSize(ref.current).height;
      const headerHeight = MONTH_CELL_PADDING_TOP + (themeHeaderHeight ?? MONTH_CELL_BAR_HEIGHT);
      const footerHeight = themeFooterHeight ?? 0;

      const baseContentAreaHeight = rowHeight - headerHeight - footerHeight;
      const visibleEventCountHeight = visibleEventCount * (eventHeight + MONTH_EVENT_MARGIN_TOP);

      setCellContentAreaHeight(Math.min(baseContentAreaHeight, visibleEventCountHeight));
    }
  }, [themeFooterHeight, themeHeaderHeight, eventHeight, visibleEventCount]);

  return { ref, cellContentAreaHeight };
}

export function DayGridMonth({ dateMatrix = [], rowInfo = [], cellWidthMap = [] }: Props) {
  const [gridContainer, setGridContainerRef] = useDOMNode<HTMLDivElement>();
  const calendar = useStore(calendarSelector);
  // TODO: event height need to be dynamic
  const { ref, cellContentAreaHeight } = useCellContentAreaHeight(MONTH_EVENT_HEIGHT);

  const { eventFilter, month: monthOptions, isReadOnly } = useStore(optionsSelector);
  const { narrowWeekend, startDayOfWeek } = monthOptions as CalendarMonthOptions;
  const rowHeight = TOTAL_PERCENT_HEIGHT / dateMatrix.length;

  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        container: gridContainer,
        rowsCount: dateMatrix.length,
        columnsCount: dateMatrix[0].length,
        narrowWeekend,
        startDayOfWeek,
      }),
    [dateMatrix, gridContainer, narrowWeekend, startDayOfWeek]
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
    <div
      ref={setGridContainerRef}
      onMouseDown={passConditionalProp(!isReadOnly, onMouseDown)}
      className={cls('month-daygrid')}
    >
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
                gridDateEventModelMap={gridDateEventModelMap}
                week={week}
                rowInfo={rowInfo}
                contentAreaHeight={cellContentAreaHeight}
              />
              <MonthEvents
                name="month"
                events={uiModels}
                contentAreaHeight={cellContentAreaHeight}
                eventHeight={MONTH_EVENT_HEIGHT}
                className={cls('weekday-events')}
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
