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
        <GridCell date={date} style={{ width: 100, height: 100 }} height={100} />
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
        <GridRow rowInfo={rowStyleInfo} cssHeight={100} week={weekDates} />
      </Layout>
    </ProviderWrapper>
  );
};

export const Month = () => {
  const options: CalendarMonthOptions = {
    visibleWeeksCount: 3,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Week: true,
    daynames: [],
    moreLayerSize: { width: null, height: null },
    grid: {
      header: { height: 31 },
      footer: { height: 31 },
    },
    visibleEventCount: 6,
  };

  const dateMatrix = createDateMatrixOfMonth(new Date(), options);

  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(
    dateMatrix[0].length,
    options.narrowWeekend,
    options.startDayOfWeek,
    options.workweek
  );

  const rowInfo = rowStyleInfo.map((cellStyleInfo, index) => ({
    ...cellStyleInfo,
    date: dateMatrix[0][index],
  }));

  return (
    <ProviderWrapper>
      <Layout>
        <DayGridMonth
          options={options}
          dateMatrix={dateMatrix}
          rowInfo={rowInfo}
          cellWidthMap={cellWidthMap}
        />
      </Layout>
    </ProviderWrapper>
  );
};
