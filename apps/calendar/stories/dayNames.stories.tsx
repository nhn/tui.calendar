import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Story } from '@storybook/preact';

import DayNames from '@src/components/daygrid/dayNames';
import { DayNameItem } from '@t/components/daygrid/dayNames';

export default { title: 'DayNames' };

interface DayNamesStory {
  dayNames: DayNameItem[];
  marginLeft?: number;
}

const Template: Story<DayNamesStory> = ({ dayNames, marginLeft }) => (
  <ProviderWrapper>
    <DayNames dayNames={dayNames} marginLeft={marginLeft} />
  </ProviderWrapper>
);

const oneDayName = [
  {
    name: 'Mon',
    dayIndex: 1,
  },
];

const threeDayNames = [
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
];

export const oneDay = Template.bind({});
oneDay.args = {
  dayNames: oneDayName,
};

export const threeDays = Template.bind({});
threeDays.args = {
  dayNames: threeDayNames,
};

export const oneDayWithMargin = Template.bind({});
oneDayWithMargin.args = {
  dayNames: oneDayName,
  marginLeft: 60,
};

export const threeDaysWithMargin = Template.bind({});
threeDaysWithMargin.args = {
  dayNames: threeDayNames,
  marginLeft: 60,
};
