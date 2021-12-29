import { h } from 'preact';

import { Story } from '@storybook/preact';

import FloatingLayer from '@src/components/floatingLayer';
import { Week } from '@src/components/view/week';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { addDate, Day } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth, createRandomEvents } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';

export default { title: 'Views/WeekView', component: Week };

function createTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return createRandomEvents('week', start, end).map((event) => EventModel.create(event));
}

function createWeekEvents() {
  const today = new TZDate();
  const sunday = addDate(today, -today.getDay());
  const tuesday = addDate(sunday, 2);
  const thursday = addDate(sunday, 4);
  const saturday = addDate(sunday, 6);
  const events: EventModelData[] = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'event1',
      category: 'allday',
      isAllDay: true,
      start: sunday,
      end: tuesday,
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'event2',
      category: 'allday',
      isAllDay: true,
      start: tuesday,
      end: thursday,
    },
    {
      id: '3',
      calendarId: 'cal1',
      title: 'event3',
      category: 'allday',
      isAllDay: true,
      start: thursday,
      end: saturday,
    },
  ];

  return events.map((event) => EventModel.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <Week />
    <FloatingLayer />
  </ProviderWrapper>
);

export const basic = Template.bind({});

export const MondayStart = Template.bind({});
MondayStart.args = {
  options: {
    week: {
      startDayOfWeek: Day.MON,
    },
  },
};

export const WorkWeek = Template.bind({});
WorkWeek.args = {
  options: {
    week: {
      workweek: true,
    },
  },
};

export const RandomEvents = Template.bind({});
RandomEvents.args = {
  events: [...createRandomEventModelsForMonth(40), ...createTimeGridEvents()],
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  options: {
    useCreationPopup: true,
  },
  events: createWeekEvents(),
};
