import { h } from 'preact';

import WeekView from '@src/components/view/weekView';
import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { addDate, Day } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth, createRandomEvents } from '@stories/util/randomEvents';
import { Story } from '@storybook/preact';

export default { title: 'WeekView' };

function createTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return createRandomEvents('week', start, end).map((event) => Schedule.create(event));
}

function createWeekEvents() {
  const today = new TZDate();
  const sunday = addDate(new TZDate(), -today.getDay());
  const tuesday = addDate(sunday, 2);
  const thursday = addDate(sunday, 4);
  const saturday = addDate(sunday, 6);
  const events: ScheduleData[] = [
    {
      title: 'event1',
      start: sunday,
      end: tuesday,
    },
    {
      title: 'event2',
      start: tuesday,
      end: thursday,
    },
    {
      title: 'event3',
      start: thursday,
      end: saturday,
    },
  ];

  return events.map((event) => Schedule.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <WeekView />
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
  events: createWeekEvents(),
};
