import { h } from 'preact';
import { Story } from '@storybook/preact';
import DayNames, { DayNamesProps } from '@src/components/daygrid/dayNames';

export default { title: 'DayNames' };

const Template: Story<DayNamesProps> = (args) => <DayNames {...args} />;

export const oneDay = Template.bind({});

oneDay.args = {
  dayNames: [
    {
      name: 'Mon',
      dayIndex: 1,
    },
  ],
};

export const threeDays = Template.bind({});

threeDays.args = {
  dayNames: [
    {
      name: 'Mon',
      dayIndex: 1,
    },
    {
      name: 'Wed',
      dayIndex: 3,
    },
    {
      name: 'Fri',
      dayIndex: 5,
    },
  ],
};
