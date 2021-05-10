import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Cell } from '@src/components/daygrid/cell';
import Grid from '@src/components/daygrid/grid';
import { range } from '@src/util/utils';
import { toStartOfDay } from '@src/time/datetime';
import TZDate from '@src/time/date';
import DayGrid from '@src/components/daygrid/dayGrid';
import { CalendarMonthOption } from '@t/store';

export default { title: 'DayGrid' };

export const cell = () => {
  const date = new Date();

  return (
    <ProviderWrapper>
      <Cell date={date} dayIndex={date.getDay()} style={{ width: 100, height: 100 }} />
    </ProviderWrapper>
  );
};

export const week = () => {
  const date = new Date();

  const dayIndex = date.getDay();
  const start = date.getDate() - dayIndex;
  const end = start + 6;
  const startDate = toStartOfDay(date.setDate(start));
  const endDate = toStartOfDay(date.setDate(end));
  const days = (Number(endDate) - Number(startDate)) / (24 * 1000 * 60 * 60) + 1;
  const calendar = range(days).map((index) => new TZDate(startDate).addDate(index));

  return (
    <ProviderWrapper>
      <Grid
        height={100}
        calendar={calendar}
        appContainer={{ current: document.createElement('div') }}
      />
    </ProviderWrapper>
  );
};

export const weekend = () => {
  const date = new Date();

  const dayIndex = date.getDay();
  const start = date.getDate() - dayIndex;
  const saturday = start + 6;
  const sunday = saturday + 1;
  const calendar = [new TZDate(date.setDate(saturday)), new TZDate(date.setDate(sunday))];

  return (
    <ProviderWrapper>
      <Grid
        height={200}
        calendar={calendar}
        appContainer={{ current: document.createElement('div') }}
      />
    </ProviderWrapper>
  );
};

export const daygrid = () => {
  const date = new Date();

  const dayIndex = date.getDay();
  const start = date.getDate() - dayIndex;
  const saturday = start + 6;
  const sunday = saturday + 1;
  const WEEKDAYS = 7;

  const calendar = range(3).map((index) => [
    new TZDate(date.setDate(saturday + WEEKDAYS * index)),
    new TZDate(date.setDate(sunday + WEEKDAYS * index)),
  ]);

  const options = {
    visibleWeeksCount: 3,
    workweek: false,
    narrowWeekend: true,
    startDayOfWeek: 0,
    isAlways6Week: true,
  } as CalendarMonthOption;

  return (
    <ProviderWrapper>
      <DayGrid
        options={options}
        calendar={calendar}
        appContainer={{ current: document.createElement('div') }}
      />
    </ProviderWrapper>
  );
};
