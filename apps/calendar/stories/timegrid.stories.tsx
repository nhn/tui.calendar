import type { ComponentProps } from 'preact';
import { h } from 'preact';

import type { StoryFn } from '@storybook/preact';

import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { cls, toPercent } from '@src/helpers/css';
import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, toStartOfDay } from '@src/time/datetime';

import normalEvents from '@stories/data/events.json';
import { createEventModels } from '@stories/helper/event';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEvents } from '@stories/util/randomEvents';

import type { EventObject } from '@t/events';

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
  // const start = toStartOfDay(new TZDate());
  // const adjustForWeekStart = start.getDay();
  // const disabledAMEvents: EventObject[] = range(0, 7).map((date) => {
  //   const eventStart = addDate(start, date - adjustForWeekStart);
  //
  //   return {
  //     category: 'background',
  //     start: eventStart,
  //     end: addHours(eventStart, 9),
  //     backgroundColor: 'rgba(100, 100, 100, .3)',
  //   };
  // });
  // const disabledPMEvents: EventObject[] = range(0, 7).map((date) => {
  //   const eventStart = addDate(start, date - adjustForWeekStart);
  //
  //   return {
  //     category: 'background',
  //     start: addHours(eventStart, 18),
  //     end: addHours(eventStart, 24),
  //     backgroundColor: 'rgba(100, 100, 100, .3)',
  //   };
  // });
  // const disabledLunchEvents: EventObject[] = range(0, 7).map((date) => {
  //   const eventStart = addDate(start, date - adjustForWeekStart);
  //
  //   return {
  //     category: 'background',
  //     start: addHours(eventStart, 12),
  //     end: addHours(eventStart, 13),
  //     backgroundColor: 'rgba(23, 255, 100, .3)',
  //   };
  // });
  // const data: EventObject[] = disabledAMEvents.concat(
  //   disabledPMEvents,
  //   disabledLunchEvents,
  //   getNormalEvents()
  // );

  return createEventModels(getNormalEvents());
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
  const data: EventObject[] = createRandomEvents('week', start, end);
  return createEventModels(data);
};
RandomEvents.args = {
  events: getRandomEvents(),
  timeGridData: getTimeGridData(),
};
