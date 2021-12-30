import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { Layout } from '@src/components/layout';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { capitalizeDayName } from '@src/helpers/dayName';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import { optionsSelector } from '@src/selectors';
import { getGridInfo, isWeekend } from '@src/time/datetime';

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

export const Month: FunctionComponent = () => {
  const options = useStore(optionsSelector);
  const theme = useTheme();

  const dayNames = getDayNames(options);
  const { useCreationPopup } = options;
  const monthOptions = options.month as Required<MonthOptions>;
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;

  const dateMatrix = useMemo(
    // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
    () => createDateMatrixOfMonth(new Date(), monthOptions),
    [monthOptions]
  );
  const { gridInfo } = useMemo(
    () => getGridInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek),
    [dayNames.length, narrowWeekend, startDayOfWeek, workweek]
  );

  return (
    <Layout className={cls('month')}>
      <GridHeader
        templateType="monthDayname"
        dayNames={dayNames}
        theme={theme.month.dayname}
        options={monthOptions}
        gridInfo={gridInfo}
        type="month"
      />
      <DayGridMonth
        options={monthOptions}
        dateMatrix={dateMatrix}
        gridInfo={gridInfo}
        useCreationPopup={useCreationPopup}
      />
    </Layout>
  );
};
