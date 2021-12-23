/* eslint-disable complexity */
import { FunctionComponent, h, RefObject } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import GridRow from '@src/components/dayGridMonth/gridRow';
import { MonthEvents } from '@src/components/dayGridMonth/monthEvents';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { EVENT_HEIGHT, getRenderedEventUIModels } from '@src/helpers/grid';
import { createMousePositionDataGrabberMonth } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDrag } from '@src/hooks/common/drag';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import { useDayGridMonthEventMove } from '@src/hooks/dayGridMonth/dayGridMonthEventMove';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { isBetweenWithDate, toEndOfDay } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';

import { CalendarMonthOption } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOption;
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

export const DayGridMonth: FunctionComponent<Props> = ({
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

  const gridSelection = useDayGridSelection(mousePositionDataGrabber, dateMatrix);
  const flattenCells = dateMatrix.flat();
  const { uiModels: monthUIModels } = getRenderedEventUIModels(
    flattenCells,
    calendarData,
    narrowWeekend
  );

  // const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent(
  //   monthUIModels,
  //   'move'
  // );

  const { movingEvent, currentGridPos } = useDayGridMonthEventMove({
    events: monthUIModels,
    cells: dateMatrix,
    gridInfo,
    mousePositionDataGrabber,
  });

  // console.log(movingEvent);

  // const { movingEvent } = useDayGridMonthEventMove({
  //   monthUIModels,
  //   cells,
  //   dateMatrix,
  //   gridInfo,
  //   mousePositionDataGrabber,
  // });

  return (
    <div ref={setGridContainerRef} onMouseDown={onMouseDown} style={{ height: toPercent(100) }}>
      {dateMatrix.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = getRenderedEventUIModels(
          week,
          calendarData,
          narrowWeekend
        );
        const isMouseInWeek = rowIndex === currentGridPos?.y;

        // @TODO
        // - GridSelection이 인덱스만 받게 한다.
        // - 루프 안에서 인덱스의 차만 구하여 GridSelection 컴포넌트에 넘겨준다.
        //   - 1주일 치의 날짜 배열에서 시작지점의 인덱스와 끝지점의 인덱스를 받는다.
        //   - 컴포넌트 안에서 start, end 날짜 기준으로 스타일 계산하는 함수도 고친다.
        // - useDayGridSelection은 드래그 시작 시 위치도 리턴해야한다.
        //   - GridSelectionData 타입을 변경한다.
        // ----------
        // 처음에는 gridSelection.start, gridSelection.end 만 이용하여 동작하도록 구현해본다.

        let tempGridSelection = null;
        if (
          gridSelection &&
          gridSelection.end >= week[0] &&
          gridSelection.start <= week[week.length - 1]
        ) {
          let selectionStartDateInRow =
            gridSelection?.start > week[0] ? gridSelection?.start : week[0];
          let selectionEndDateInRow =
            gridSelection?.end < week[week.length - 1]
              ? gridSelection?.end
              : toEndOfDay(week[week.length - 1]);

          if (isBetweenWithDate(gridSelection.start, week[0], week[week.length - 1])) {
            selectionStartDateInRow = gridSelection.start;
          }

          if (isBetweenWithDate(gridSelection.end, week[0], week[week.length - 1])) {
            selectionEndDateInRow = gridSelection.end;
          }

          tempGridSelection = {
            ...gridSelection,
            start: selectionStartDateInRow,
            end: selectionEndDateInRow,
          };
        }

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
                week={rowIndex}
                events={uiModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={MONTH_EVENT_HEIGHT}
                className={cls('weekday-events')}
                headerHeight={MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT}
                eventTopMargin={MONTH_EVENT_MARGIN_TOP}
                gridInfo={gridInfo}
                mousePositionDataGrabber={mousePositionDataGrabber}
              />
              <GridSelection
                gridSelectionData={tempGridSelection}
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
