import { FunctionComponent, h, RefObject } from 'preact';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import DayGridMonth from '@src/components/dayGridMonth/dayGridMonth';
import { Panel } from '@src/components/panel';
import { MONTH_DAY_NAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { capitalizeDayName } from '@src/helpers/dayName';
import { getDateMatrixByMonth } from '@src/helpers/grid';
import { optionsSelector } from '@src/selectors';
import { getGridInfo, getMonthCalendar, isWeekend } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';

import { MonthOptions } from '@t/options';
import { CalendarStore } from '@t/store';
import { TemplateMonthDayName } from '@t/template';

function getDayNames(options: CalendarStore['options']) {
  const { daynames, workweek } = options.month as Required<MonthOptions>;
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

export const Month: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const options = useStore(optionsSelector);
  const theme = useTheme();

  const gridPanelHeight = useContainerHeight(containerRef, MONTH_DAY_NAME_HEIGHT);

  const dayNames = getDayNames(options);
  const monthOptions = options.month as Required<MonthOptions>;
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;

  const dateMatrix = useMemo(
    // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
    () => getDateMatrixByMonth(new Date(), monthOptions),
    [monthOptions]
  );
  const { gridInfo } = useMemo(
    () => getGridInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek),
    [dayNames.length, narrowWeekend, startDayOfWeek, workweek]
  );

  return (
    // @TODO: change to layout component
    <div className={cls('month')} ref={containerRef}>
      <Panel name="month-daynames" initialHeight={MONTH_DAY_NAME_HEIGHT}>
        <GridHeader
          templateType="monthDayname"
          dayNames={dayNames}
          theme={theme.month.dayname}
          options={monthOptions}
          gridInfo={gridInfo}
          type="month"
        />
      </Panel>
      <Panel name="month-daygrid" initialHeight={gridPanelHeight}>
        <DayGridMonth
          options={monthOptions}
          dateMatrix={dateMatrix}
          gridInfo={gridInfo}
          appContainer={containerRef}
        />
      </Panel>
    </div>
  );
};
