import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { WEEK_DAYNAME_BORDER, WEEK_DAYNAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getDayNames } from '@src/helpers/dayName';
import { getVisibleEventCollection } from '@src/helpers/events';
import { createTimeGridData, getDayGridEvents, getWeekDates } from '@src/helpers/grid';
import { getActivePanels } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useTimeGridScrollSync } from '@src/hooks/timeGrid/useTimeGridScrollSync';
import {
  calendarSelector,
  optionsSelector,
  viewSelector,
  weekViewLayoutSelector,
} from '@src/selectors';
import { getRowStyleInfo } from '@src/time/datetime';

import type { WeekOptions } from '@t/options';
import type { AlldayEventCategory } from '@t/panel';

function useWeekViewState() {
  const options = useStore(optionsSelector);
  const calendar = useStore(calendarSelector);
  const { dayGridRows: gridRowLayout, lastPanelType } = useStore(weekViewLayoutSelector);
  const { renderDate } = useStore(viewSelector);

  return useMemo(
    () => ({
      options,
      calendar,
      gridRowLayout,
      lastPanelType,
      renderDate,
    }),
    [calendar, gridRowLayout, lastPanelType, options, renderDate]
  );
}

export function Week() {
  const { options, calendar, gridRowLayout, lastPanelType, renderDate } = useWeekViewState();
  const [timePanel, setTimePanelRef] = useDOMNode<HTMLDivElement>();

  const weekOptions = options.week as Required<WeekOptions>;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd, eventView, taskView } =
    weekOptions;
  const weekDates = useMemo(() => getWeekDates(renderDate, weekOptions), [renderDate, weekOptions]);
  const dayNames = getDayNames(weekDates);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    weekDates.length,
    narrowWeekend,
    startDayOfWeek,
    workweek
  );
  const calendarData = useMemo(
    () => ({
      ...calendar,
      events: getVisibleEventCollection(calendar.events),
    }),
    [calendar]
  );
  const eventByPanel = useMemo(
    () =>
      getDayGridEvents(weekDates, calendarData, {
        narrowWeekend,
        hourStart,
        hourEnd,
      }),
    [calendarData, hourEnd, hourStart, narrowWeekend, weekDates]
  );
  const timeGridData = useMemo(
    () =>
      createTimeGridData(weekDates, {
        hourStart: weekOptions.hourStart,
        hourEnd: weekOptions.hourEnd,
      }),
    [weekDates, weekOptions.hourEnd, weekOptions.hourStart]
  );

  const activePanels = getActivePanels(taskView, eventView);
  const dayGridRows = activePanels.map((key) => {
    if (key === 'time') {
      return null;
    }

    const rowType = key as AlldayEventCategory;

    return (
      <Panel name={rowType} key={rowType} resizable={rowType !== lastPanelType}>
        {rowType === 'allday' ? (
          <AlldayGridRow
            events={eventByPanel[rowType]}
            rowStyleInfo={rowStyleInfo}
            gridColWidthMap={cellWidthMap}
            weekDates={weekDates}
            height={gridRowLayout[rowType]?.height}
            options={weekOptions}
          />
        ) : (
          <OtherGridRow
            category={rowType}
            events={eventByPanel[rowType]}
            weekDates={weekDates}
            height={gridRowLayout[rowType]?.height}
            options={weekOptions}
            gridColWidthMap={cellWidthMap}
          />
        )}
      </Panel>
    );
  });
  const hasTimePanel = useMemo(() => activePanels.includes('time'), [activePanels]);

  useTimeGridScrollSync(timePanel, timeGridData.rows.length);

  return (
    <Layout className={cls('week-view')} autoAdjustPanels={true}>
      <Panel name="week-view-daynames" initialHeight={WEEK_DAYNAME_HEIGHT + WEEK_DAYNAME_BORDER}>
        <GridHeader
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          options={weekOptions}
          rowStyleInfo={rowStyleInfo}
          type="week"
        />
      </Panel>
      {dayGridRows}
      {hasTimePanel ? (
        <Panel name="time" autoSize={1} ref={setTimePanelRef}>
          <TimeGrid events={eventByPanel.time} timeGridData={timeGridData} />
        </Panel>
      ) : null}
    </Layout>
  );
}
