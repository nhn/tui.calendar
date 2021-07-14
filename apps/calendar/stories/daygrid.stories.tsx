import { h } from 'preact';

import { Cell } from '@src/components/daygrid/cell';
import DayGrid from '@src/components/daygrid/dayGrid';
import Grid from '@src/components/daygrid/grid';
import Panel from '@src/components/panel';
import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { range } from '@src/util/utils';

import { CalendarMonthOption } from '@t/store';

import { getWeekDates, getWeekendDates } from '@stories/util/mockCalendarDates';
import { ProviderWrapper } from '@stories/util/providerWrapper';

import { createRandomEvents } from './util/randomEvents';

export default { title: 'DayGrid' };

export const cell = () => {
  const date = new TZDate();

  return (
    <ProviderWrapper>
      <Cell date={date} dayIndex={date.getDay()} style={{ width: 100, height: 100 }} height={100} />
    </ProviderWrapper>
  );
};

export const week = () => {
  const calendar = getWeekDates();

  return (
    <ProviderWrapper>
      <Grid
        cssHeight={100}
        week={calendar}
        appContainer={{ current: document.createElement('div') }}
      />
    </ProviderWrapper>
  );
};

export const weekend = () => {
  const calendar = getWeekendDates();

  return (
    <ProviderWrapper>
      <Grid
        height={200}
        week={calendar}
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

  const options: CalendarMonthOption = {
    visibleWeeksCount: 3,
    workweek: false,
    narrowWeekend: true,
    startDayOfWeek: 0,
    isAlways6Week: true,
    daynames: [],
    moreLayerSize: { width: null, height: null },
    grid: {
      header: { height: 31 },
      footer: { height: 31 },
    },
    visibleScheduleCount: 6,
    scheduleFilter: () => true,
  };

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

export const randomEvents = () => {
  const calendar = getWeekDates();

  const options: CalendarMonthOption = {
    visibleWeeksCount: 1,
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
    visibleScheduleCount: 6,
    scheduleFilter: () => true,
  };

  const data = createRandomEvents('month', calendar[0], calendar[6], 10);
  const events = data.map((event: ScheduleData) => Schedule.create(event));

  return (
    <ProviderWrapper events={events}>
      <Panel name="weekday" height={400}>
        <DayGrid
          options={options}
          calendar={[calendar]}
          events={events}
          appContainer={{ current: document.createElement('div') }}
        />
      </Panel>
    </ProviderWrapper>
  );
};
