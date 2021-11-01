import { FunctionComponent, h } from 'preact';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { useStore } from '@src/contexts/calendarStore';
import { WeekOption } from '@src/model';
import { weekViewStateSelector } from '@src/selectors';
import TZDate from '@src/time/date';
import {
  addDate,
  getGridInfo,
  isWeekend,
  toEndOfDay,
  toStartOfDay,
  WEEK_DAYS,
} from '@src/time/datetime';
import { getDayNames } from '@src/util/dayName';
import { getDayGridEvents } from '@src/util/gridHelper';
import { range } from '@src/util/utils';

import type { Cells, DayGridEventType } from '@t/panel';

function getCells(renderDate: TZDate, { startDayOfWeek = 0, workweek }: WeekOption): Cells {
  const renderDay = renderDate.getDay();
  const now = toStartOfDay(renderDate);
  const nowDay = now.getDay();
  const prevWeekCount = startDayOfWeek - WEEK_DAYS;

  return range(startDayOfWeek, WEEK_DAYS + startDayOfWeek).reduce<Cells>((acc, day) => {
    const date = addDate(now, day - nowDay + (startDayOfWeek > renderDay ? prevWeekCount : 0));
    if (workweek && isWeekend(date.getDay())) {
      return acc;
    }
    acc.push(date);

    return acc;
  }, []);
}

const dayNameHeight = 42;

const Week: FunctionComponent = () => {
  const {
    template,
    option,
    calendar,
    weekViewLayout: { dayGridRows },
  } = useStore(weekViewStateSelector);

  if (!template || !option || !calendar || !dayGridRows) {
    return null;
  }

  const weekOptions = option.week as Required<WeekOption>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd } = weekOptions;
  // @TODO: calculate based on today(need to calculate date when prev & next used)
  const renderWeekDate = new TZDate();
  const cells = getCells(renderWeekDate, weekOptions);
  const dayNames = getDayNames(cells);
  const { gridInfo, gridColWidthMap } = getGridInfo(
    cells.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const dayGridEvents = getDayGridEvents(cells, calendar, {
    narrowWeekend,
    hourStart,
    hourEnd,
  });
  const columnInfoList = cells.map(
    (cell) =>
      ({ start: toStartOfDay(cell), end: toEndOfDay(cell), unit: 'minute', slot: 30 } as ColumnInfo)
  );
  const allDayPanels = Object.entries(dayGridRows).map(([key, value]) => {
    const panelType = key as DayGridEventType;

    return (
      <Panel key={panelType} name={panelType} resizable>
        <DayGridEvents
          events={dayGridEvents[panelType]}
          cells={cells}
          type={panelType}
          height={value.height}
          options={weekOptions}
          gridInfo={gridInfo}
          gridColWidthMap={gridColWidthMap}
        />
      </Panel>
    );
  });

  return (
    <Layout>
      <Panel name="week-daynames" height={dayNameHeight}>
        <GridHeader
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          options={weekOptions}
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

export default Week;
