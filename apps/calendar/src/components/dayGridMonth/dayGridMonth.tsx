import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridRow } from '@src/components/dayGridMonth/gridRow';
import { MonthEvents } from '@src/components/dayGridMonth/monthEvents';
import { ResizingEventShadow } from '@src/components/dayGridMonth/resizingEventShadow';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { EVENT_HEIGHT, getRenderedEventUIModels } from '@src/helpers/grid';
import { createGridPositionFinder } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import { usePopupWithDayGridSelection } from '@src/hooks/dayGridCommon/popupWithDayGridSelection';
import { useDayGridMonthEventMove } from '@src/hooks/dayGridMonth/dayGridMonthEventMove';
import {
  hasResizingEventShadowProps,
  useDayGridMonthEventResize,
} from '@src/hooks/dayGridMonth/dayGridMonthEventResize';
import { calendarSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { getSize } from '@src/utils/dom';
import { isBetween } from '@src/utils/math';
import { isPresent } from '@src/utils/type';

import { CalendarMonthOptions } from '@t/store';
import { CellInfo } from '@t/time/datetime';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOptions;
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

function sortGridSelection(gridSelection: GridSelectionData) {
  const { initRowIndex, initColIndex, currentRowIndex, currentColIndex } = gridSelection;
  const isReversed =
    initRowIndex > currentRowIndex ||
    (initRowIndex === currentRowIndex && initColIndex > currentColIndex);

  return isReversed
    ? {
        startRowIndex: currentRowIndex,
        startColIndex: currentColIndex,
        endRowIndex: initRowIndex,
        endColIndex: initColIndex,
      }
    : {
        startRowIndex: initRowIndex,
        startColIndex: initColIndex,
        endRowIndex: currentRowIndex,
        endColIndex: currentColIndex,
      };
}

function calcGridSelectionData(
  gridSelection: GridSelectionData | null,
  rowIndex: number,
  weekLength: number
): GridSelectionDataByRow | null {
  let resultGridSelection: GridSelectionDataByRow | null = null;

  if (isPresent(gridSelection)) {
    const { startRowIndex, startColIndex, endRowIndex, endColIndex } =
      sortGridSelection(gridSelection);

    if (
      isBetween(
        rowIndex,
        Math.min(startRowIndex, endRowIndex),
        Math.max(startRowIndex, endRowIndex)
      )
    ) {
      let startCellIndex = startColIndex;
      let endCellIndex = endColIndex;

      if (startRowIndex < rowIndex) {
        startCellIndex = 0;
      }

      if (endRowIndex > rowIndex) {
        endCellIndex = weekLength - 1;
      }

      resultGridSelection = { startCellIndex, endCellIndex };
    }
  }

  return resultGridSelection;
}

export function DayGridMonth({ options, dateMatrix = [], rowInfo = [], cellWidthMap = [] }: Props) {
  const [gridContainer, setGridContainerRef] = useDOMNode<HTMLDivElement>();
  const calendarData = useStore(calendarSelector);
  const { ref, height } = useGridHeight();

  const { visibleWeeksCount, narrowWeekend } = options;
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

  const renderedEventUIModels = useMemo(
    () => dateMatrix.map((week) => getRenderedEventUIModels(week, calendarData, narrowWeekend)),
    [calendarData, dateMatrix, narrowWeekend]
  );

  const gridSelection = useDayGridSelection(gridPositionFinder);
  const onMouseDown = usePopupWithDayGridSelection({ gridSelection, dateMatrix });
  const { movingEvent, currentGridPos } = useDayGridMonthEventMove({
    dateMatrix,
    rowInfo,
    gridPositionFinder,
  });
  const { resizingEvent, resizingEventShadowProps } = useDayGridMonthEventResize({
    dateMatrix,
    gridPositionFinder,
    cellWidthMap,
    renderedUIModels: renderedEventUIModels,
  });

  return (
    <div ref={setGridContainerRef} onMouseDown={onMouseDown} className={cls('month-daygrid')}>
      {dateMatrix.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = renderedEventUIModels[rowIndex];
        const isMouseInWeek = rowIndex === currentGridPos?.y;
        const gridSelectionDataByRow = calcGridSelectionData(gridSelection, rowIndex, week.length);
        const resizingEventShadowPropsByRow = resizingEventShadowProps?.[rowIndex];

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
                draggingEvent={movingEvent || resizingEvent}
              />
              {gridSelectionDataByRow && (
                <GridSelection
                  gridSelectionData={gridSelectionDataByRow}
                  weekDates={week}
                  narrowWeekend={narrowWeekend}
                />
              )}
            </div>
            {hasResizingEventShadowProps(resizingEventShadowPropsByRow) && (
              <ResizingEventShadow shadowEventProps={resizingEventShadowPropsByRow} />
            )}
            {isMouseInWeek && movingEvent && (
              <HorizontalEvent
                uiModel={movingEvent}
                eventHeight={EVENT_HEIGHT}
                headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
