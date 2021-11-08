import { FunctionComponent, h, RefObject } from 'preact';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import DayGridMonth from '@src/components/dayGridMonth/dayGridMonth';
import { usePanelContainer } from '@src/components/hooks/panelContainer';
import Panel from '@src/components/panel';
import { MONTH_DAY_NAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/theme';
import { MonthOption, TemplateMonthDayName } from '@src/model';
import { topLevelStateSelector } from '@src/selectors';
import { getGridInfo, getMonthCalendar, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { capitalizeDayName } from '@src/util/dayName';
import { getSize } from '@src/util/dom';
import { createMousePositionDataGrabber } from '@src/util/monthViewHelper';

import { CalendarStore } from '@t/store';

function getDayNames(option: CalendarStore['option']) {
  const { daynames, workweek } = option.month as Required<MonthOption>;
  const dayNames: TemplateMonthDayName[] = [];

  daynames.forEach((name, index) => {
    if (!workweek || (workweek && !isWeekend(index))) {
      dayNames.push({
        label: capitalizeDayName(name),
        day: index,
      });
    }
  });

  return dayNames;
}

function useContainerHeight(container: RefObject<HTMLDivElement>, dayNameHeight: number) {
  const [gridPanelHeight, setGridPanelHeight] = useState(0);

  useLayoutEffect(() => {
    if (container.current) {
      const { height } = getSize(container.current);

      setGridPanelHeight(height - dayNameHeight);
    }
  }, [container, dayNameHeight]);

  return gridPanelHeight;
}

const optionSelector = topLevelStateSelector('option');
export const Month: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const option = useStore(optionSelector);
  const theme = useTheme();

  const gridPanelHeight = useContainerHeight(containerRef, MONTH_DAY_NAME_HEIGHT);
  const panelContainer = usePanelContainer(containerRef, cls('month-daygrid'));

  if (!theme || !option) {
    return null;
  }

  const dayNames = getDayNames(option);
  const renderMonthDate = new Date(); // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const monthOptions = option.month as Required<MonthOption>;
  const calendar = getMonthCalendar(renderMonthDate, monthOptions);
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;
  const { gridInfo } = getGridInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek);

  const getMouseDataOnMonth = panelContainer
    ? createMousePositionDataGrabber(calendar, gridInfo, panelContainer)
    : () => null;

  return (
    // @TODO: change to layout component
    <div className={cls('month')} ref={containerRef}>
      <Panel name="month-daynames" height={MONTH_DAY_NAME_HEIGHT}>
        <GridHeader
          templateType="monthDayname"
          dayNames={dayNames}
          theme={theme.month.dayname}
          options={monthOptions}
          gridInfo={gridInfo}
          type="month"
        />
      </Panel>
      <Panel name="month-daygrid" height={gridPanelHeight}>
        <DayGridMonth
          options={monthOptions}
          calendar={calendar}
          appContainer={containerRef}
          shouldRenderDefaultPopup={option.useCreationPopup}
          getMousePositionData={getMouseDataOnMonth}
        />
      </Panel>
    </div>
  );
};
