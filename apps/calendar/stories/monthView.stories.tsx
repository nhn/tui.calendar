import { h } from 'preact';

import { Story } from '@storybook/preact';

import { Month } from '@src/components/view/month';
import EventModel from '@src/model/eventModel';

import { mockMonthViewEvents } from '@stories/mocks/mockMonthViewEvents';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';

export default { title: 'Views/MonthView', component: Month };

function createMonthEvents(events: EventModelData[]) {
  return events.map((event) => EventModel.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <Month />
  </ProviderWrapper>
);

export const basic = Template.bind({});

export const narrowWeekend = Template.bind({});
narrowWeekend.args = {
  options: { month: { narrowWeekend: true } },
};

export const startDayOfWeek = Template.bind({});
startDayOfWeek.args = {
  options: { month: { startDayOfWeek: 3 } },
};

export const dayNames = Template.bind({});
dayNames.args = {
  options: {
    month: {
      daynames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  },
};

export const workweek = Template.bind({});
workweek.args = {
  options: { month: { workweek: true } },
};

export const twoWeeks = Template.bind({});
twoWeeks.args = {
  options: { month: { visibleWeeksCount: 2 } },
};

export const randomEvents = Template.bind({});
randomEvents.args = {
  options: { month: { narrowWeekend: true } },
  events: createRandomEventModelsForMonth(40),
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  options: { useCreationPopup: true, useDetailPopup: true },
  events: createMonthEvents(mockMonthViewEvents),
};
