import { FunctionComponent, h, RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import GridWithMouse from '@src/components/dayGridCommon/gridWithMouse';
import GridRow from '@src/components/dayGridMonth/gridRow';
import MonthEvents from '@src/components/dayGridMonth/monthEvents';
import { useGridSelection } from '@src/components/hooks/gridSelection';
import {
  MONTH_CELL_BAR_HEIGHT,
  MONTH_CELL_PADDING_TOP,
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
} from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { getRenderedEventUIModels } from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';

import { CellDateRange } from '@t/components/daygrid/gridSelectionData';
import { CalendarMonthOption } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: RefObject<HTMLDivElement>;
  events?: EventModel[];
  shouldRenderDefaultPopup?: boolean;
  getMousePositionData?: (e: MouseEvent) => MousePositionData | null;
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

function getGridInfoList(calendar: TZDate[][]): CellDateRange[][] {
  return calendar.map<CellDateRange[]>((week) =>
    week.map<CellDateRange>((day) => {
      const start = toStartOfDay(day);
      const end = toEndOfDay(start);

      return {
        start,
        end,
      };
    })
  );
}

const DayGridMonth: FunctionComponent<Props> = ({
  options,
  calendar = [],
  appContainer,
  shouldRenderDefaultPopup = false,
  getMousePositionData = () => null,
}) => {
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const { ref, height } = useGridHeight();

  const { gridSelection, onSelectionChange, onSelectionEnd, onSelectionCancel } =
    useGridSelection(shouldRenderDefaultPopup);

  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const calendarData = useStore(calendarSelector);

  if (!calendarData) {
    return null;
  }

  const gridInfoList = getGridInfoList(calendar);

  return (
    <GridWithMouse
      onSelectionChange={onSelectionChange}
      onSelectionEnd={onSelectionEnd}
      onSelectionCancel={onSelectionCancel}
      gridInfoList={gridInfoList}
      getMousePositionData={getMousePositionData}
    >
      {calendar.map((week, rowIndex) => {
        const { uiModels, gridDateEventModelMap } = getRenderedEventUIModels(
          week,
          calendarData,
          narrowWeekend
        );

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
                gridSelectionData={gridSelection}
                cells={week}
                narrowWeekend={narrowWeekend}
              />
            </div>
          </div>
        );
      })}
    </GridWithMouse>
  );
};

export default DayGridMonth;
