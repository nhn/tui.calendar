import { h, FunctionComponent, Fragment } from 'preact';

import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';

import { toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { CalendarMonthOption } from '@t/store';
import { DataStore } from '@src/model';
import { findByDateRange } from '@src/controller/month';
import { getRenderViewModel } from '@src/event/gridEvent';
import { EVENT_HEIGHT } from '@src/event/panelEvent';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { useStore } from '../hooks/store';
import { useEffect, useRef, useState } from 'preact/hooks';
import { getSize } from '@src/util/domutil';
import { cls } from '@src/util/cssHelper';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
  events?: Schedule[];
}

function renderEvents(cells: TZDate[], dataStore: DataStore, narrowWeekend: boolean) {
  const { idsOfDay } = dataStore;
  const eventViewModels = findByDateRange(dataStore, {
    start: cells[0],
    end: cells[cells.length - 1],
  });
  const data: Record<number, ScheduleViewModel> = [];

  eventViewModels.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((viewModel) => {
        const cid = viewModel.model.cid();
        data[cid] = getRenderViewModel(viewModel, cells, narrowWeekend);
      });
    });
  });

  const gridModels = Object.keys(idsOfDay).reduce<Record<string, ScheduleViewModel[]>>(
    (acc, ymd) => {
      const ids = idsOfDay[ymd];

      acc[ymd] = ids.map((cid) => data[cid]).filter((vm) => !!vm);

      return acc;
    },
    {}
  );

  return {
    viewModels: Object.values(data),
    gridModels,
  };
}

const DayGrid: FunctionComponent<DayGridProps> = (props) => {
  const { options, calendar = [], appContainer } = props;
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const rowHeight = TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount || 6, 1);
  const name = 'dayGrid';

  const { state: dataStore } = useStore('dataStore');

  const eventHeight = EVENT_HEIGHT;

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getSize(ref.current).height);
  }, []);

  return (
    <Fragment>
      {calendar.map((week, index) => {
        const { viewModels, gridModels } = renderEvents(week, dataStore, narrowWeekend);

        return (
          <div
            key={`${name}-events-${index}`}
            className={cls('month-week-item')}
            style={{ height: toPercent(rowHeight) }}
            ref={ref}
          >
            <div className={cls('weekday')}>
              <Grid
                cssHeight={toPercent(TOTAL_PERCENT_HEIGHT)}
                gridModels={gridModels}
                workweek={workweek}
                startDayOfWeek={startDayOfWeek}
                narrowWeekend={narrowWeekend}
                calendar={week}
                appContainer={appContainer}
                eventHeight={eventHeight}
                height={height}
              />
              <GridEvents
                name={name}
                cells={week}
                events={viewModels}
                height={height}
                narrowWeekend={narrowWeekend}
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
