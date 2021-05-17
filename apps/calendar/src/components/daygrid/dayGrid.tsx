import { h, FunctionComponent, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/components/hooks/store';

import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';

import { toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { CalendarMonthOption } from '@t/store';
import { getSize } from '@src/util/domutil';
import { cls } from '@src/util/cssHelper';
import { EVENT_HEIGHT, getRenderedEventViewModels } from '@src/util/gridHelper';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
  events?: Schedule[];
}

function useGridHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getSize(ref.current).height);
  }, []);

  return { ref, height };
}

const DayGrid: FunctionComponent<DayGridProps> = (props) => {
  const { options, calendar = [], appContainer } = props;
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const { ref, height } = useGridHeight();

  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const {
    state: { dataStore, theme },
  } = useStore(['dataStore', 'theme']);

  if (!theme || !dataStore) {
    return null;
  }

  const { schedule: monthScheduleTheme } = theme.month;
  const eventHeight = parseFloat(monthScheduleTheme.height);

  return (
    <Fragment>
      {calendar.map((week, index) => {
        const { viewModels, gridDateEventModelMap } = getRenderedEventViewModels(
          week,
          dataStore,
          narrowWeekend
        );

        return (
          <div
            key={`dayGrid-events-${index}`}
            className={cls('month-week-item')}
            style={{ height: toPercent(rowHeight) }}
            ref={ref}
          >
            <div className={cls('weekday')}>
              <Grid
                cssHeight={toPercent(TOTAL_PERCENT_HEIGHT)}
                gridDateEventModelMap={gridDateEventModelMap}
                workweek={workweek}
                startDayOfWeek={startDayOfWeek}
                narrowWeekend={narrowWeekend}
                calendar={week}
                appContainer={appContainer}
                eventHeight={eventHeight}
                height={height}
              />
              <GridEvents
                name="month"
                cells={week}
                events={viewModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={eventHeight}
                className={cls('weekday-schedules')}
              />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default DayGrid;
