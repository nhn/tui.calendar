import { h } from 'preact';
import { Story } from '@storybook/preact';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import WeekView from '@src/components/view/weekView';
import {
  generateRandomEvents,
  generateRandomScheduleViewModelsForMonth,
} from '@stories/util/randomEvents';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';
import Schedule from '@src/model/schedule';

export default { title: 'WeekView' };

function generateTimeGridEvents() {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);

  return generateRandomEvents('week', start, end).map((event) => Schedule.create(event));
}

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <WeekView />
  </ProviderWrapper>
);

export const basic = Template.bind({});

export const randomEvents = Template.bind({});
randomEvents.args = {
  events: [...generateRandomScheduleViewModelsForMonth(40), ...generateTimeGridEvents()],
};
