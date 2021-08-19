import { FunctionComponent, h } from 'preact';

import DayNames from '@src/components/daygrid/dayNames';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { WeekOption } from '@src/model';
import { useStore } from '@src/store';
import TZDate from '@src/time/date';
import { getGridInfo, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { getDayNames } from '@src/util/dayName';
import { getDayGridEvents } from '@src/util/gridHelper';
import { pick } from '@src/util/utils';

import type { DayGridEventType } from '@t/panel';
import { CalendarStore } from '@t/store';

const dayNameHeight = 42;
const selector = (state: CalendarStore) =>
  pick(state, 'template', 'option', 'calendar', 'weekViewLayout');

const Day: FunctionComponent = () => {
  const { template, calendar: calendarData, option, weekViewLayout } = useStore(selector);

  if (!template || !option || !calendarData || !weekViewLayout) {
    return null;
  }

  const {
    narrowWeekend,
    startDayOfWeek,
    workweek,
    hourStart,
    hourEnd,
  } = option.week as Required<WeekOption>;
  // @TODO: calculate based on today(need to calculate date when prev & next used)
  const cells = [new TZDate()];
  const dayNames = getDayNames(cells);
  const { gridInfo, gridColWidthMap } = getGridInfo(
    cells.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const dayGridEvents = getDayGridEvents(cells, calendarData, {
    narrowWeekend,
    hourStart,
    hourEnd,
  });
  const columnInfoList = cells.map(
    (cell) =>
      ({ start: toStartOfDay(cell), end: toEndOfDay(cell), unit: 'minute', slot: 30 } as ColumnInfo)
  );
  const allDayPanels = Object.entries(weekViewLayout.dayGridRows).map(([key, value]) => {
    const panelType = key as DayGridEventType;

    return (
      <Panel key={panelType} name={panelType} resizable>
        <DayGridEvents
          events={dayGridEvents[panelType]}
          cells={cells}
          type={panelType}
          height={value.height}
          options={option.week}
          gridInfo={gridInfo}
          gridColWidthMap={gridColWidthMap}
        />
      </Panel>
    );
  });

  return (
    <Layout>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          gridInfo={gridInfo}
          type="week"
        />
      </Panel>
      {allDayPanels}
      <Panel name="time" autoSize={1}>
        <TimeGrid events={dayGridEvents.time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Day;
