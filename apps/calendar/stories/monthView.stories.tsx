import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import MonthView from '@src/components/view/monthView';
import { Story } from '@storybook/preact';

export default { title: 'MonthView' };

const Template: Story = (args) => (
  <ProviderWrapper options={args.options}>
    <MonthView />
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
