import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { ColumnInfo } from '@src/components/timeGrid/columnWithMouse';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { WEEK_DAYNAME_BORDER, WEEK_DAYNAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { getDayGridEvents } from '@src/helpers/grid';
import {
  calendarSelector,
  optionsSelector,
  templateSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import TZDate from '@src/time/date';
import { getGridInfo, toEndOfDay, toStartOfDay } from '@src/time/datetime';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory } from '@t/panel';

function useDayViewState() {
  const template = useStore(templateSelector);
  const calendar = useStore(calendarSelector);
  const option = useStore(optionsSelector);
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

  const { useCreationPopup = false } = option;
  const weekOptions = option.week as Required<WeekOptions>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd } = weekOptions;
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
  const gridRows = Object.entries(weekViewLayout.dayGridRows).map(([key, value]) => {
    const rowType = key as AlldayEventCategory;

    return (
      <Panel key={rowType} name={rowType} resizable>
        {rowType === 'allday' ? (
          <AlldayGridRow
            category={rowType}
            events={dayGridEvents[rowType]}
            gridInfo={gridInfo}
            gridColWidthMap={gridColWidthMap}
            cells={cells}
            height={value.height}
            options={weekOptions}
            useCreationPopup={useCreationPopup}
          />
        ) : (
          <OtherGridRow
            category={rowType}
            events={dayGridEvents[rowType]}
            cells={cells}
            height={value.height}
            options={option.week}
            gridColWidthMap={gridColWidthMap}
          />
        )}
      </Panel>
    );
  });

  return (
    <Layout className={cls('day-view')}>
      <Panel name="day-view-daynames" initialHeight={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
        <GridHeader
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
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
