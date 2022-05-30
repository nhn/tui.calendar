import { h } from 'preact';

import type { Story } from '@storybook/preact';

import { GridHeader } from '@src/components/dayGridCommon/gridHeader';
import { getRowStyleInfo } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';

import type { TemplateMonthDayName } from '@t/template';

export default { title: 'Components/GridHeader', component: GridHeader };

interface DayNamesStory {
  dayNames: TemplateMonthDayName[];
  marginLeft?: string;
}

const Template: Story<DayNamesStory> = ({ dayNames, marginLeft }) => {
  const { rowStyleInfo } = getRowStyleInfo(dayNames.length, true, 0, true);

  return (
    <ProviderWrapper>
      <GridHeader
        type="month"
        dayNames={dayNames}
        marginLeft={marginLeft}
        rowStyleInfo={rowStyleInfo}
      />
    </ProviderWrapper>
  );
};

const oneDayName = [
  {
    label: 'Mon',
    day: 1,
  },
];

const threeDayNames = [
  {
    label: 'Mon',
    day: 1,
  },
  {
    label: 'Wed',
    day: 3,
  },
  {
    label: 'Fri',
    day: 5,
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
  marginLeft: '60px',
};

export const threeDaysWithMargin = Template.bind({});
threeDaysWithMargin.args = {
  dayNames: threeDayNames,
  marginLeft: '60px',
};
