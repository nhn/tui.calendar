import { h } from 'preact';
import { useCallback, useLayoutEffect, useMemo, useState } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { TimezoneLabels } from '@src/components/timeGrid/timezoneLabels';
import { WEEK_DAYNAME_BORDER, WEEK_DAYNAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { createTimeGridData, getDayGridEvents } from '@src/helpers/grid';
import { getActivePanels } from '@src/helpers/view';
import { useCalendarData } from '@src/hooks/calendar/useCalendarData';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useTimeGridScrollSync } from '@src/hooks/timeGrid/useTimeGridScrollSync';
import {
  calendarSelector,
  optionsSelector,
  viewSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import { getRowStyleInfo } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import type { WeekOptions } from '@t/options';
import type { AlldayEventCategory } from '@t/panel';
import type { CalendarState } from '@t/store';

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

function timegridHeightSelector(state: CalendarState) {
  // TODO: change `dayGridRows` to `panels`
  return state.weekViewLayout?.dayGridRows?.time?.height;
}

export function Day() {
  const { calendar, options, gridRowLayout, lastPanelType, renderDate } = useDayViewState();
  const timeGridPanelHeight = useStore(timegridHeightSelector);
  const gridHeaderMarginLeft = useTheme(useCallback((theme) => theme.week.dayGridLeft.width, []));

  const [stickyTop, setStickyTop] = useState<number | null>(null);
  const [timePanel, setTimePanelRef] = useDOMNode<HTMLDivElement>();

  const weekOptions = options.week as Required<WeekOptions>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd, eventView, taskView } =
    weekOptions;
  const days = useMemo(() => [renderDate], [renderDate]);
  const dayNames = getDayNames(days);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    days.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const dayGridEvents = getDayGridEvents(days, calendarData, {
    narrowWeekend,
    hourStart,
    hourEnd,
  });
  const timeGridData = useMemo(
    () =>
      createTimeGridData(days, {
        hourStart: weekOptions.hourStart,
        hourEnd: weekOptions.hourEnd,
      }),
    [days, weekOptions.hourEnd, weekOptions.hourStart]
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

  useLayoutEffect(() => {
    const updateStickyTop = () => {
      if (timePanel) {
        setStickyTop(timePanel.offsetTop);
      }
    };

    if (isPresent(timeGridPanelHeight)) {
      updateStickyTop();
    }
  }, [timeGridPanelHeight, timePanel]);

  return (
    <Layout className={cls('day-view')} autoAdjustPanels={true}>
      <Panel name="day-view-daynames" initialHeight={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
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
