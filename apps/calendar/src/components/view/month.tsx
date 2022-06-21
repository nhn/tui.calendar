import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { Layout } from '@src/components/layout';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import { optionsSelector, viewSelector } from '@src/selectors';
import { getRowStyleInfo, isWeekend } from '@src/time/datetime';
import { capitalize } from '@src/utils/string';

import type { MonthOptions } from '@t/options';
import type { CalendarStore } from '@t/store';
import type { CellInfo } from '@t/time/datetime';

function getMonthDayNames(options: CalendarStore['options']) {
  const { dayNames, startDayOfWeek, workweek } = options.month as Required<MonthOptions>;
  const dayIndices = [...Array(7)].map((_, i) => (startDayOfWeek + i) % 7);
  const monthDayNames = dayIndices.map((i) => ({
    day: i,
    label: capitalize(dayNames[i]),
  }));

  return monthDayNames.filter((dayNameInfo) => (workweek ? !isWeekend(dayNameInfo.day) : true));
}

export function Month() {
  const options = useStore(optionsSelector);
  const { renderDate } = useStore(viewSelector);

  const dayNames = getMonthDayNames(options);
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
        type="month"
        dayNames={dayNames}
        options={monthOptions}
        rowStyleInfo={rowStyleInfo}
      />
      <DayGridMonth dateMatrix={dateMatrix} rowInfo={rowInfo} cellWidthMap={cellWidthMap} />
    </Layout>
  );
}
