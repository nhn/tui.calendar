import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { DEFAULT_WEEK_PANEL_TYPES } from '@src/constants/layout';
import { WEEK_DAYNAME_BORDER, WEEK_DAYNAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { createTimeGridData, getDayGridEvents } from '@src/helpers/grid';
import { getDisplayPanel } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useTimeGridScrollSync } from '@src/hooks/timeGrid/useTimeGridScrollSync';
import {
  calendarSelector,
  optionsSelector,
  viewSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import { getRowStyleInfo } from '@src/time/datetime';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory } from '@t/panel';

function useDayViewState() {
  const calendar = useStore(calendarSelector);
  const options = useStore(optionsSelector);
  const { dayGridRows: gridRowLayout } = useStore(weekViewLayoutSelector);
  const { renderDate } = useStore(viewSelector);

  return useMemo(
    () => ({
      calendarData: calendar,
      options,
      gridRowLayout,
      renderDate,
    }),
    [calendar, options, gridRowLayout, renderDate]
  );
}

export function Day() {
  const { calendarData, options, gridRowLayout, renderDate } = useDayViewState();
  const [timePanel, setTimePanelRef] = useDOMNode<HTMLDivElement>();

  const { eventView, taskView } = options;
  const weekOptions = options.week as Required<WeekOptions>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd } = weekOptions;
  const weekDates = useMemo(() => [renderDate], [renderDate]);
  const dayNames = getDayNames(weekDates);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    weekDates.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const dayGridEvents = getDayGridEvents(weekDates, calendarData, {
    narrowWeekend,
    hourStart,
    hourEnd,
  });
  const timeGridData = useMemo(
    () =>
      createTimeGridData(weekDates, {
        hourStart: weekOptions.hourStart,
        hourEnd: weekOptions.hourEnd,
      }),
    [weekDates, weekOptions.hourEnd, weekOptions.hourStart]
  );
  const displayPanel = getDisplayPanel(taskView, eventView);
  const gridRows = displayPanel
    .filter((panel) => DEFAULT_WEEK_PANEL_TYPES.includes(panel))
    .map((key) => {
      const rowType = key as AlldayEventCategory;

      return (
        <Panel key={rowType} name={rowType} resizable>
          {rowType === 'allday' ? (
            <AlldayGridRow
              events={dayGridEvents[rowType]}
              rowStyleInfo={rowStyleInfo}
              gridColWidthMap={cellWidthMap}
              weekDates={weekDates}
              height={gridRowLayout[rowType].height}
              options={weekOptions}
            />
          ) : (
            <OtherGridRow
              category={rowType}
              events={dayGridEvents[rowType]}
              weekDates={weekDates}
              height={gridRowLayout[rowType].height}
              options={options.week}
              gridColWidthMap={cellWidthMap}
            />
          )}
        </Panel>
      );
    });

  useTimeGridScrollSync(timePanel, timeGridData.rows.length);

  return (
    <Layout className={cls('day-view')} autoAdjustPanels={true}>
      <Panel name="day-view-daynames" initialHeight={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
        <GridHeader
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          rowStyleInfo={rowStyleInfo}
          type="week"
        />
      </Panel>
      {gridRows}
      <Panel name="time" autoSize={1} ref={setTimePanelRef}>
        <TimeGrid events={dayGridEvents.time} timeGridData={timeGridData} />
      </Panel>
    </Layout>
  );
}
