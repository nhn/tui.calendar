import { h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import TZDate from '@src/time/date';
import { addDate, addHours, toStartOfDay } from '@src/time/datetime';

import { EventModelData } from '@t/events';

import normalEvents from '@stories/data/events.json';
import { createEventModels } from '@stories/helper/event';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEvents } from '@stories/util/randomEvents';

export default { title: 'TimeGrid' };

function toThisWeek(date: TZDate) {
  const today = toStartOfDay(new TZDate());
  const adjustForWeekStart = today.getDay();
  const day = date.getDay();

  date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - adjustForWeekStart);

  return addDate(date, day);
}

function getNormalEvents() {
  return normalEvents.map((event) => {
    const start = toThisWeek(new TZDate(event.start));
    const end = toThisWeek(new TZDate(event.end));

    return {
      ...event,
      start,
      end,
    };
  });
}

function getEvents() {
  const start = toStartOfDay(new TZDate());
  const adjustForWeekStart = start.getDay();
  const disabledAMEvents: EventModelData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: eventStart,
      end: addHours(eventStart, 9),
      bgColor: 'rgba(100, 100, 100, .3)',
    };
  });
  const disabledPMEvents: EventModelData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: addHours(eventStart, 18),
      end: addHours(eventStart, 24),
      bgColor: 'rgba(100, 100, 100, .3)',
    };
  });
  const disabledLunchEvents: EventModelData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: addHours(eventStart, 12),
      end: addHours(eventStart, 13),
      bgColor: 'rgba(23, 255, 100, .3)',
    };
  });
  const data: EventModelData[] = disabledAMEvents.concat(
    disabledPMEvents,
    disabledLunchEvents,
    getNormalEvents()
  );

  return createEventModels(data);
}

export const basic = () => {
  const events = getEvents();

  return (
    <ProviderWrapper>
      <TimeGrid events={events} />
    </ProviderWrapper>
  );
};

export const randomEvents = () => {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);
  const data: EventModelData[] = createRandomEvents('week', start, end);
  const eventModels = createEventModels(data);

  return (
    <ProviderWrapper>
      <TimeGrid events={eventModels} />
    </ProviderWrapper>
  );
};

export const multipleTimezones = () => {
  const timezones = [
    {
      displayLabel: 'Local Time',
      tooltip: 'Local',
    },
    {
      timezoneOffset: 420,
      displayLabel: 'GMT-08:00',
      tooltip: 'Los Angeles',
    },
    {
      timezoneOffset: -180,
      displayLabel: 'GMT+3',
      tooltip: 'Moscow Standard Time',
    },
  ];

  const eventModels = getEvents();

  return (
    <ProviderWrapper>
      <TimeGrid timezones={timezones} timesWidth={60} events={eventModels} />
    </ProviderWrapper>
  );
};
multipleTimezones.story = {
  name: 'Multiple timezones',
};
