import { Fragment, FunctionComponent, h, RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

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
import { getRenderedEventUIModels } from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import { calendarSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import { getSize } from '@src/utils/dom';

import { CalendarMonthOption } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
  options: CalendarMonthOption;
  dateMatrix: TZDate[][];
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

const DayGridMonth: FunctionComponent<Props> = ({ options, dateMatrix = [], appContainer }) => {
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const { ref, height } = useGridHeight();

  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const calendarData = useStore(calendarSelector);

  if (!calendarData) {
    return null;
  }

  return (
    <Fragment>
      {dateMatrix.map((week, rowIndex) => {
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
              <GridSelection gridSelectionData={null} cells={week} narrowWeekend={narrowWeekend} />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default DayGridMonth;
