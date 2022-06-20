import { h } from 'preact';

import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { GridRow } from '@src/components/dayGridMonth/gridRow';
import { Layout } from '@src/components/layout';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { getRowStyleInfo } from '@src/time/datetime';

import { getWeekDates } from '@stories/util/mockCalendarDates';
import { ProviderWrapper } from '@stories/util/providerWrapper';

import type { CalendarMonthOptions } from '@t/store';

export default { title: 'Components/DayGridMonth', component: DayGridMonth };

export const Cell = () => {
  const date = new TZDate();

  return (
    <ProviderWrapper>
      <Layout>
        <GridCell date={date} style={{ width: 100, height: 100 }} contentAreaHeight={100} />
      </Layout>
    </ProviderWrapper>
  );
};

export const Week = () => {
  const weekDates = getWeekDates();

  const { rowStyleInfo } = getRowStyleInfo(weekDates.length, false, 0, false);

  return (
    <ProviderWrapper>
      <Layout>
        <GridRow rowInfo={rowStyleInfo} contentAreaHeight={100} week={weekDates} />
      </Layout>
    </ProviderWrapper>
  );
};

export const Month = () => {
  const monthOptions: CalendarMonthOptions = {
    visibleWeeksCount: 3,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Weeks: true,
    dayNames: [],
    visibleEventCount: 6,
  };

  const dateMatrix = createDateMatrixOfMonth(new Date(), monthOptions);

  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    dateMatrix[0].length,
    monthOptions.narrowWeekend,
    monthOptions.startDayOfWeek,
    monthOptions.workweek
  );

  const rowInfo = rowStyleInfo.map((cellStyleInfo, index) => ({
    ...cellStyleInfo,
    date: dateMatrix[0][index],
  }));

  return (
    <ProviderWrapper>
      <Layout>
        <DayGridMonth dateMatrix={dateMatrix} rowInfo={rowInfo} cellWidthMap={cellWidthMap} />
      </Layout>
    </ProviderWrapper>
  );
};
