import { h } from 'preact';
import { Story } from '@storybook/preact';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import DayView from '@src/components/view/dayView';
import { generateRandomScheduleViewModelsForMonth } from '@stories/util/randomEvents';

export default { title: 'DayView' };

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <DayView />
  </ProviderWrapper>
);

export const basic = Template.bind({});

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

export const randomEvents = Template.bind({});
randomEvents.args = {
  events: generateRandomScheduleViewModelsForMonth(40),
};
