import { h } from 'preact';

import DayView from '@src/components/view/dayView';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth, createRandomEvents } from '@stories/util/randomEvents';
import { Story } from '@storybook/preact';

export default { title: 'DayView' };

function createTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return createRandomEvents('week', start, end).map((event) => Schedule.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <DayView />
  </ProviderWrapper>
);

export const basic = Template.bind({});

export const randomEvents = Template.bind({});
randomEvents.args = {
  events: [...createRandomEventModelsForMonth(40), ...createTimeGridEvents()],
};
