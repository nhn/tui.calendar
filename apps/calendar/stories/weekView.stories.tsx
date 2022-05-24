import { h } from 'preact';

import type { Story } from '@storybook/preact';

import { Week } from '@src/components/view/week';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { addDate, Day } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth, createRandomEvents } from '@stories/util/randomEvents';

export default { title: 'Views/WeekView', component: Week };

function createTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return createRandomEvents('week', start, end).map((event) => new EventModel(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <Week />
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
