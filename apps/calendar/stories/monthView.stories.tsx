import { h } from 'preact';

import type { Story } from '@storybook/preact';

import { Month } from '@src/components/view/month';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

export default { title: 'Views/MonthView', component: Month };

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
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
