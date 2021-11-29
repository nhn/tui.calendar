import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { GridRow } from '@src/components/dayGridWeek/gridRow';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { ColumnInfo } from '@src/components/timeGrid/columnWithMouse';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { WEEK_DAYNAME_BORDER, WEEK_DAYNAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { getDayGridEvents } from '@src/helpers/grid';
import {
  calendarSelector,
  optionSelector,
  templateSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import TZDate from '@src/time/date';
import { getGridInfo, toEndOfDay, toStartOfDay } from '@src/time/datetime';

import { WeekOption } from '@t/option';
import { AlldayEventCategory } from '@t/panel';

function useDayViewState() {
  const template = useStore(templateSelector);
  const calendar = useStore(calendarSelector);
  const option = useStore(optionSelector);
  const weekViewLayout = useStore(weekViewLayoutSelector);

  return useMemo(
    () => ({
      template,
      calendarData: calendar,
      option,
      weekViewLayout,
    }),
    [calendar, option, template, weekViewLayout]
  );
}

export const Day: FunctionComponent = () => {
  const { template, calendarData, option, weekViewLayout } = useDayViewState();

  if (!template || !option || !calendarData || !weekViewLayout) {
    return null;
  }

  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd } =
    option.week as Required<WeekOption>;
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
    const panelType = key as AlldayEventCategory;

    return (
      <Panel key={panelType} name={panelType} resizable>
        <GridRow
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
    <Layout classNames={[cls('day-view')]}>
      <Panel name="day-view-daynames" height={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
        <GridHeader
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
