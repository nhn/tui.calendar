import { FunctionComponent, h, RefObject } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import GridRow from '@src/components/dayGridMonth/gridRow';
import MonthEvents from '@src/components/dayGridMonth/monthEvents';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { getRenderedEventUIModels } from '@src/helpers/grid';
import { createMousePositionDataGrabberMonth } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDrag } from '@src/hooks/common/drag';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { getSize } from '@src/utils/dom';
import { isBetween } from '@src/utils/math';
import { isPresent } from '@src/utils/type';

import { CalendarMonthOptions } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOptions;
  dateMatrix: TZDate[][];
  gridInfo: GridInfo[];
  appContainer: RefObject<HTMLDivElement>;
  events?: EventModel[];
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
) {
  let resultGridSelection = null;

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

const DayGridMonth: FunctionComponent<Props> = ({
  options,
  dateMatrix = [],
  gridInfo = [],
  appContainer,
}) => {
  const [gridContainer, setGridContainerRef] = useDOMNode<HTMLDivElement>();
  const calendarData = useStore(calendarSelector);
  const { ref, height } = useGridHeight();

  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;
  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection);
  const mousePositionDataGrabber = useMemo(
    () =>
      gridContainer
        ? createMousePositionDataGrabberMonth(dateMatrix, gridInfo, gridContainer)
        : () => null,
    [dateMatrix, gridContainer, gridInfo]
  );

  const gridSelection = useDayGridSelection(mousePositionDataGrabber);

  return (
    <div ref={setGridContainerRef} onMouseDown={onMouseDown} style={{ height: toPercent(100) }}>
      {dateMatrix.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = getRenderedEventUIModels(
          week,
          calendarData,
          narrowWeekend
        );

        const gridSelectionDataByRow = calcGridSelectionData(gridSelection, rowIndex, week.length);

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
                workweek={workweek}
                startDayOfWeek={startDayOfWeek}
                narrowWeekend={narrowWeekend}
                week={week}
                appContainer={appContainer}
                height={height}
              />
              <MonthEvents
                name="month"
                cells={week}
                events={uiModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={MONTH_EVENT_HEIGHT}
                className={cls('weekday-events')}
                headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
                eventTopMargin={MONTH_EVENT_MARGIN_TOP}
              />
              <GridSelection
                gridSelectionData={gridSelectionDataByRow}
                cells={week}
                narrowWeekend={narrowWeekend}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayGridMonth;
