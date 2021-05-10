import { h, FunctionComponent, Fragment } from 'preact';

import { toPercent } from '@src/util/units';
import Grid from '@src/components/daygrid/grid';
import Schedule from '@src/model/schedule';
import React from 'preact/compat';
import TZDate from '@src/time/date';
import { CalendarMonthOption } from '@t/store';

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
}

const DayGrid: FunctionComponent<DayGridProps> = (props) => {
  const { options, calendar = [], appContainer } = props;
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const rowHeight = 100 / visibleWeeksCount;
  const events: Schedule[] = [];

  return (
    <Fragment>
      {calendar.map((week, index) => (
        <Grid
          key={index}
          height={toPercent(rowHeight)}
          events={events}
          workweek={workweek}
          startDayOfWeek={startDayOfWeek}
          narrowWeekend={narrowWeekend}
          calendar={week}
          appContainer={appContainer}
        />
      ))}
    </Fragment>
  );
};

export default DayGrid;
