import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { Layout } from '@src/components/layout';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { capitalizeDayName } from '@src/helpers/dayName';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import { optionsSelector, viewSelector } from '@src/selectors';
import { monthThemeSelector } from '@src/selectors/theme';
import { getRowStyleInfo, isWeekend } from '@src/time/datetime';

import { MonthOptions } from '@t/options';
import { CalendarStore } from '@t/store';
import { TemplateMonthDayName } from '@t/template';
import { CellInfo } from '@t/time/datetime';

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

export function Month() {
  const options = useStore(optionsSelector);
  const { renderDate } = useStore(viewSelector);
  const { dayname: daynameTheme } = useTheme(monthThemeSelector);

  const dayNames = getDayNames(options);
  const monthOptions = options.month as Required<MonthOptions>;
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;

  const dateMatrix = useMemo(
    () => createDateMatrixOfMonth(renderDate, monthOptions),
    [monthOptions, renderDate]
  );
  const { rowStyleInfo, cellWidthMap } = useMemo(
    () => getRowStyleInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek),
    [dayNames.length, narrowWeekend, startDayOfWeek, workweek]
  );
  const rowInfo: CellInfo[] = rowStyleInfo.map((cellStyleInfo, index) => ({
    ...cellStyleInfo,
    date: dateMatrix[0][index],
  }));

  return (
    <Layout className={cls('month')}>
      <GridHeader
        templateType="monthDayname"
        dayNames={dayNames}
        theme={daynameTheme}
        options={monthOptions}
        rowStyleInfo={rowStyleInfo}
        type="month"
      />
      <DayGridMonth
        options={monthOptions}
        dateMatrix={dateMatrix}
        rowInfo={rowInfo}
        cellWidthMap={cellWidthMap}
      />
    </Layout>
  );
}
