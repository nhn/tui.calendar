import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Panel } from '@src/components/panel';
import { ColumnInfo } from '@src/components/timeGrid/columnWithMouse';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { DEFAULT_WEEK_PANEL_TYPES } from '@src/constants/layout';
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
import {
  addDate,
  getGridInfo,
  isWeekend,
  toEndOfDay,
  toStartOfDay,
  WEEK_DAYS,
} from '@src/time/datetime';

import { WeekOption } from '@t/option';
import { AlldayEventCategory, Cells } from '@t/panel';

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

function useWeekViewState() {
  const template = useStore(templateSelector);
  const option = useStore(optionSelector);
  const calendar = useStore(calendarSelector);
  const { dayGridRows: gridRowLayout } = useStore(weekViewLayoutSelector);

  return useMemo(
    () => ({
      template,
      option,
      calendar,
      gridRowLayout,
    }),
    [calendar, gridRowLayout, option, template]
  );
}

export const Week: FunctionComponent = () => {
  const { template, option, calendar, gridRowLayout } = useWeekViewState();

  if (!template || !option || !calendar || !gridRowLayout) {
    return null;
  }

  const { useCreationPopup = false } = option;
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
  const gridRows = DEFAULT_WEEK_PANEL_TYPES.map((key) => {
    const rowType = key as AlldayEventCategory;

    return (
      <Panel name={rowType} key={rowType} resizable>
        {rowType === 'allday' ? (
          <AlldayGridRow
            category={rowType}
            events={dayGridEvents[rowType]}
            gridInfo={gridInfo}
            gridColWidthMap={gridColWidthMap}
            cells={cells}
            height={gridRowLayout[rowType].height}
            options={weekOptions}
            useCreationPopup={useCreationPopup}
          />
        ) : (
          <OtherGridRow
            category={rowType}
            events={dayGridEvents[rowType]}
            cells={cells}
            height={gridRowLayout[rowType].height}
            options={weekOptions}
            gridColWidthMap={gridColWidthMap}
          />
        )}
      </Panel>
    );
  });

  return (
    // @TODO: refactor Layout component
    <div className={cls('week-view')}>
      <Panel name="week-view-daynames" height={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
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
    </div>
  );
};
