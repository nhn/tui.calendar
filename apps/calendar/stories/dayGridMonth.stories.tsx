import { h } from 'preact';

import range from 'tui-code-snippet/array/range';

import DayGridMonth from '@src/components/dayGridMonth/dayGridMonth';
import { GridCell } from '@src/components/dayGridMonth/gridCell';
import GridRow from '@src/components/dayGridMonth/gridRow';
import { Panel } from '@src/components/panel';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { getWeekDates, getWeekendDates } from '@stories/util/mockCalendarDates';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEvents } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';
import { CalendarMonthOptions } from '@t/store';

export default { title: 'DayGridMonth' };

export const cell = () => {
  const date = new TZDate();

  return (
    <ProviderWrapper>
      <GridCell
        date={date}
        dayIndex={date.getDay()}
        style={{ width: 100, height: 100 }}
        height={100}
      />
    </ProviderWrapper>
  );
};

export const week = () => {
  const calendar = getWeekDates();

  return (
    <ProviderWrapper>
      <GridRow
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
      <GridRow
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

  const options: CalendarMonthOptions = {
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
    visibleEventCount: 6,
    eventFilter: () => true,
  };

  return (
    <ProviderWrapper>
      <DayGridMonth
        options={options}
        calendar={calendar}
        appContainer={{ current: document.createElement('div') }}
      />
    </ProviderWrapper>
  );
};

export const randomEvents = () => {
  const calendar = getWeekDates();

  const options: CalendarMonthOptions = {
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
    visibleEventCount: 6,
    eventFilter: () => true,
  };

  const data = createRandomEvents('month', calendar[0], calendar[6], 10);
  const events = data.map((event: EventModelData) => EventModel.create(event));

  return (
    <ProviderWrapper events={events}>
      <Panel name="weekday" height={400}>
        <DayGridMonth
          options={options}
          calendar={[calendar]}
          events={events}
          appContainer={{ current: document.createElement('div') }}
        />
      </Panel>
    </ProviderWrapper>
  );
};
