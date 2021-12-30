import { FunctionComponent, h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridRow } from '@src/components/dayGridMonth/gridRow';
import { MonthEvents } from '@src/components/dayGridMonth/monthEvents';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { EVENT_FORM_POPUP_WIDTH } from '@src/constants/popup';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { EVENT_HEIGHT, getRenderedEventUIModels } from '@src/helpers/grid';
import { createMousePositionDataGrabberMonth } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDrag } from '@src/hooks/common/drag';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import { useDayGridMonthEventMove } from '@src/hooks/dayGridMonth/dayGridMonthEventMove';
import { calendarSelector } from '@src/selectors';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';
import { compare } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';
import { isBetween } from '@src/utils/math';
import { isPresent } from '@src/utils/type';

import { CalendarMonthOptions } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOptions;
  dateMatrix: TZDate[][];
  gridInfo: GridInfo[];
  useCreationPopup: boolean;
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

export const DayGridMonth: FunctionComponent<Props> = ({
  options,
  dateMatrix = [],
  gridInfo = [],
  useCreationPopup,
}) => {
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const [gridContainer, setGridContainerRef] = useDOMNode<HTMLDivElement>();
  const calendarData = useStore(calendarSelector);
  const { show } = useDispatch('popup');
  const { ref, height } = useGridHeight();

  const { visibleWeeksCount, narrowWeekend } = options;
  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const mousePositionDataGrabber = useMemo(
    () =>
      gridContainer
        ? createMousePositionDataGrabberMonth(dateMatrix, gridInfo, gridContainer)
        : () => null,
    [dateMatrix, gridContainer, gridInfo]
  );

  const gridSelection = useDayGridSelection(mousePositionDataGrabber);
  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection, {
    onDragStart: (e) => {
      dragStartPos.current = {
        x: e.pageX,
        y: e.pageY,
      };
    },
    onDragEnd: (e) => {
      if (!gridSelection || !useCreationPopup || !dragStartPos.current) {
        return;
      }

      const { initColIndex, initRowIndex, currentColIndex, currentRowIndex } = gridSelection;
      const { x, y } = dragStartPos.current;
      const { pageX, pageY } = e;

      dragStartPos.current = null;
      e.stopPropagation();

      const selectionStartDate = dateMatrix[initRowIndex][initColIndex];
      const selectionEndDate = dateMatrix[currentRowIndex][currentColIndex];
      const isInCreased = compare(selectionStartDate, selectionEndDate) === -1;
      const start = isInCreased ? selectionStartDate : selectionEndDate;
      const end = isInCreased ? selectionEndDate : selectionStartDate;

      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupPosition: {
            left: (pageX + x - EVENT_FORM_POPUP_WIDTH) / 2,
            top: (pageY + y) / 2,
          },
        },
      });
    },
  });

  const { movingEvent, currentGridPos } = useDayGridMonthEventMove({
    cells: dateMatrix,
    gridInfo,
    mousePositionDataGrabber,
  });

  const renderedEventUiModels = useMemo(
    () => dateMatrix.map((week) => getRenderedEventUIModels(week, calendarData, narrowWeekend)),
    [calendarData, dateMatrix, narrowWeekend]
  );

  return (
    <div ref={setGridContainerRef} onMouseDown={onMouseDown} className={cls('month-daygrid')}>
      {dateMatrix.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = renderedEventUiModels[rowIndex];
        const isMouseInWeek = rowIndex === currentGridPos?.y;
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
                week={week}
                gridInfo={gridInfo}
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
              <GridSelection
                gridSelectionData={gridSelectionDataByRow}
                cells={week}
                narrowWeekend={narrowWeekend}
              />
            </div>
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
};
