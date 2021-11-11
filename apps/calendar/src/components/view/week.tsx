import { FunctionComponent, h } from 'preact';

import range from 'tui-code-snippet/array/range';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { GridRow } from '@src/components/dayGridWeek/gridRow';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { ColumnInfo } from '@src/components/timeGrid/columnWithMouse';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { useStore } from '@src/contexts/calendarStore';
import { getDayNames } from '@src/helpers/dayName';
import { getDayGridEvents } from '@src/helpers/grid';
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

import { WeekOption } from '@t/option';
import { Cells, DayGridEventType } from '@t/panel';

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

export const Week: FunctionComponent = () => {
  const {
    template,
    option,
    calendar,
    weekViewLayout: { dayGridRows: gridRowLayout },
  } = useStore(weekViewStateSelector);

  if (!template || !option || !calendar || !gridRowLayout) {
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
  const gridRows = Object.entries(gridRowLayout).map(([key, value]) => {
    const rowType = key as DayGridEventType;

    return (
      <Panel name={rowType} key={rowType} resizable>
        <GridRow
          key={rowType}
          type={rowType}
          events={dayGridEvents[rowType]}
          gridInfo={gridInfo}
          gridColWidthMap={gridColWidthMap}
          cells={cells}
          height={value.height}
          options={weekOptions}
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
      {gridRows}
      <Panel name="time" autoSize={1}>
        <TimeGrid events={dayGridEvents.time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};
