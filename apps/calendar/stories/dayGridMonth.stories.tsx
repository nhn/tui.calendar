import { h } from 'preact';

import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { GridCell } from '@src/components/dayGridMonth/gridCell';
import { GridRow } from '@src/components/dayGridMonth/gridRow';
import { Layout } from '@src/components/layout';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { getGridInfo } from '@src/time/datetime';

import { getWeekDates } from '@stories/util/mockCalendarDates';
import { ProviderWrapper } from '@stories/util/providerWrapper';

import { CalendarMonthOptions } from '@t/store';

export default { title: 'Components/DayGridMonth', component: DayGridMonth };

export const Cell = () => {
  const date = new TZDate();

  return (
    <ProviderWrapper>
      <Layout>
        <GridCell
          date={date}
          dayIndex={date.getDay()}
          style={{ width: 100, height: 100 }}
          height={100}
        />
      </Layout>
    </ProviderWrapper>
  );
};

export const Week = () => {
  const weekDates = getWeekDates();

  const { gridInfo } = getGridInfo(weekDates.length, false, 0, false);

  return (
    <ProviderWrapper>
      <Layout>
        <GridRow gridInfo={gridInfo} cssHeight={100} week={weekDates} />
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
    eventFilter: () => true,
  };

  const dateMatrix = createDateMatrixOfMonth(new Date(), options);

  const { gridInfo } = getGridInfo(
    dateMatrix[0].length,
    options.narrowWeekend,
    options.startDayOfWeek,
    options.workweek
  );

  return (
    <ProviderWrapper>
      <Layout>
        <DayGridMonth options={options} dateMatrix={dateMatrix} gridInfo={gridInfo} />
      </Layout>
    </ProviderWrapper>
  );
};
