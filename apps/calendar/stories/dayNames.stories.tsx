import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Story } from '@storybook/preact';

import DayNames from '@src/components/daygrid/dayNames';
import { DayNameItem } from '@t/components/daygrid/dayNames';

export default { title: 'DayNames' };

const Template: Story<{ dayNames: DayNameItem[] }> = (args) => (
  <ProviderWrapper>
    <DayNames dayNames={args.dayNames} />
  </ProviderWrapper>
);

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
