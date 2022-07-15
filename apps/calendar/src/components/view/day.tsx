import { h } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { TimezoneLabels } from '@src/components/timeGrid/timezoneLabels';
import { WEEK_DAY_NAME_BORDER, WEEK_DAY_NAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { createTimeGridData, getWeekViewEvents } from '@src/helpers/grid';
import { getActivePanels } from '@src/helpers/view';
import { useCalendarData } from '@src/hooks/calendar/useCalendarData';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useTimeGridScrollSync } from '@src/hooks/timeGrid/useTimeGridScrollSync';
import { useTimezoneLabelsTop } from '@src/hooks/timeGrid/useTimezoneLabelsTop';
import {
  calendarSelector,
  optionsSelector,
  viewSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import { primaryTimezoneSelector } from '@src/selectors/timezone';
import type TZDate from '@src/time/date';
import { getRowStyleInfo, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { getTimezoneDifferenceFromLocal } from '@src/time/timezone';

import type { WeekOptions } from '@t/options';
import type { AlldayEventCategory } from '@t/panel';

function useDayViewState() {
  const calendar = useStore(calendarSelector);
  const options = useStore(optionsSelector);
  const { dayGridRows: gridRowLayout, lastPanelType } = useStore(weekViewLayoutSelector);
  const { renderDate } = useStore(viewSelector);

  return useMemo(
    () => ({
      calendar,
      options,
      gridRowLayout,
      lastPanelType,
      renderDate,
    }),
    [calendar, options, gridRowLayout, lastPanelType, renderDate]
  );
}

export function Day() {
  const { calendar, options, gridRowLayout, lastPanelType, renderDate } = useDayViewState();

  const primaryTimezoneName = useStore(primaryTimezoneSelector);

  const gridHeaderMarginLeft = useTheme(useCallback((theme) => theme.week.dayGridLeft.width, []));
  const [timePanel, setTimePanelRef] = useDOMNode<HTMLDivElement>();

  const weekOptions = options.week as Required<WeekOptions>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd, eventView, taskView } =
    weekOptions;
  const days = useMemo(() => [renderDate], [renderDate]);
  const dayNames = getDayNames(days, options.week?.dayNames ?? []);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    days.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const dayGridEvents = useMemo(() => {
    const adjustByTimezoneOffset = (tzDate: TZDate, type: 'start' | 'end') => {
      if (primaryTimezoneName === 'Local') {
        return tzDate;
      }

      const offsetDiff = Math.abs(getTimezoneDifferenceFromLocal(primaryTimezoneName, tzDate));
      tzDate.addMinutes(type === 'start' ? -offsetDiff : offsetDiff);

      return tzDate;
    };

    return getWeekViewEvents(days, calendarData, {
      narrowWeekend,
      hourStart,
      hourEnd,
      weekStartDate: adjustByTimezoneOffset(toStartOfDay(days[0]), 'start'),
      weekEndDate: adjustByTimezoneOffset(toEndOfDay(days[0]), 'end'),
    });
  }, [calendarData, days, hourEnd, hourStart, narrowWeekend, primaryTimezoneName]);
  const timeGridData = useMemo(
    () =>
      createTimeGridData(days, {
        hourStart,
        hourEnd,
        narrowWeekend,
      }),
    [days, hourEnd, hourStart, narrowWeekend]
  );
  const activePanels = getActivePanels(taskView, eventView);
  const gridRows = activePanels.map((key) => {
    if (key === 'time') {
      return null;
    }

    const rowType = key as AlldayEventCategory;

    return (
      <Panel key={rowType} name={rowType} resizable={rowType !== lastPanelType}>
        {rowType === 'allday' ? (
          <AlldayGridRow
            events={dayGridEvents[rowType]}
            rowStyleInfo={rowStyleInfo}
            gridColWidthMap={cellWidthMap}
            weekDates={days}
            height={gridRowLayout[rowType]?.height}
            options={weekOptions}
          />
        ) : (
          <OtherGridRow
            category={rowType}
            events={dayGridEvents[rowType]}
            weekDates={days}
            height={gridRowLayout[rowType]?.height}
            options={weekOptions}
            gridColWidthMap={cellWidthMap}
          />
        )}
      </Panel>
    );
  });

  useTimeGridScrollSync(timePanel, timeGridData.rows.length);

  const stickyTop = useTimezoneLabelsTop(timePanel);

  return (
    <Layout className={cls('day-view')} autoAdjustPanels={true}>
      <Panel name="day-view-day-names" initialHeight={WEEK_DAY_NAME_HEIGHT + WEEK_DAY_NAME_BORDER}>
        <GridHeader
          type="week"
          dayNames={dayNames}
          marginLeft={gridHeaderMarginLeft}
          rowStyleInfo={rowStyleInfo}
        />
      </Panel>
      {gridRows}
      {activePanels.includes('time') ? (
        <Panel name="time" autoSize={1} ref={setTimePanelRef}>
          <TimeGrid events={dayGridEvents.time} timeGridData={timeGridData} />
          <TimezoneLabels top={stickyTop} />
        </Panel>
      ) : null}
    </Layout>
  );
}
