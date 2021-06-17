import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { WeekOption } from '@src/model';
import { getDayNames } from '@src/util/dayName';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/gridHelper';
import { addDate, isWeekend, toEndOfDay, toStartOfDay, WEEK_DAYS } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { range } from '@src/util/utils';

import type { Cells, DayGridEventType } from '@t/panel';
import { useTheme } from '@src/components/hooks/theme';

function getCells(renderDate: TZDate, { startDayOfWeek = 0, workweek }: WeekOption): Cells {
  const renderDay = renderDate.getDay();
  const now = toStartOfDay(renderDate);
  const prevWeekCount = startDayOfWeek - WEEK_DAYS;
  const cells = range(startDayOfWeek, WEEK_DAYS + startDayOfWeek).map((day) =>
    addDate(now, day - renderDay + (startDayOfWeek > renderDay ? prevWeekCount : 0))
  );

  if (workweek) {
    return cells.filter((date) => !isWeekend(date.getDay()));
  }

  return cells;
}

const DAY_NAME_HEIGHT = 42;

const Week: FunctionComponent = () => {
  const {
    state: { template, options, dataStore, grid },
  } = useStore();
  const theme = useTheme();

  if (!template || !theme || !options || !dataStore || !grid) {
    return null;
  }

  const { narrowWeekend } = options.week;
  // @TODO: calculate based on this week(need to calculate date when prev & next used)
  const renderWeekDate = new TZDate();
  const cells = getCells(renderWeekDate, options.week);
  const dayNames = getDayNames(cells);
  const dayGridEvents = getDayGridEvents(cells, dataStore, narrowWeekend);
  const columnInfoList = cells.map(
    (cell) =>
      ({ start: toStartOfDay(cell), end: toEndOfDay(cell), unit: 'minute', slot: 30 } as ColumnInfo)
  );
  const allDayPanels = Object.entries(grid).map(([key, value]) => {
    const panelType = key as DayGridEventType;

    return (
      <Panel key={panelType} name={panelType} resizable>
        <DayGridEvents
          events={dayGridEvents[panelType]}
          cells={cells}
          type={panelType}
          height={value.height}
          narrowWeekend={narrowWeekend}
        />
      </Panel>
    );
  });

  return (
    <Layout>
      <Panel name="week-daynames" height={DAY_NAME_HEIGHT}>
        <DayNames
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          options={options.week}
        />
      </Panel>
      {allDayPanels}
      <Panel name="time" autoSize={1}>
        <TimeGrid events={dayGridEvents.time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Week;
