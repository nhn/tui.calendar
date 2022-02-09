import { ComponentProps, h } from 'preact';

import { StoryFn } from '@storybook/preact';
import range from 'tui-code-snippet/array/range';

import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { cls, toPercent } from '@src/helpers/css';
import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, addHours, toStartOfDay } from '@src/time/datetime';

import normalEvents from '@stories/data/events.json';
import { createEventModels } from '@stories/helper/event';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEvents } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';

export default { title: 'Components/TimeGrid', component: TimeGrid };

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

function getTimeGridData() {
  const now = new TZDate();
  const weekDates = getWeekDates(now, { startDayOfWeek: 0, workweek: false });
  return createTimeGridData(weekDates, { hourStart: 0, hourEnd: 24 });
}

type TimeGridProps = ComponentProps<typeof TimeGrid>;
const Template: StoryFn<TimeGridProps> = (args) => (
  <ProviderWrapper>
    <div className={cls('layout')} style={{ height: toPercent(100) }}>
      <TimeGrid {...args} />
    </div>
  </ProviderWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  events: getEvents(),
  timeGridData: getTimeGridData(),
};

export const RandomEvents = Template.bind({});
const getRandomEvents = () => {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);
  const data: EventModelData[] = createRandomEvents('week', start, end);
  return createEventModels(data);
};
RandomEvents.args = {
  events: getRandomEvents(),
  timeGridData: getTimeGridData(),
};

export const MultipleTimezones = Template.bind({});
MultipleTimezones.args = {
  events: getEvents(),
  timeGridData: getTimeGridData(),
  timezones: [
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
  ],
  timesWidth: 60,
};
MultipleTimezones.story = {
  name: 'Multiple timezones',
};
