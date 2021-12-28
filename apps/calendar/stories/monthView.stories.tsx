import { h } from 'preact';

import { Story } from '@storybook/preact';

import { Month } from '@src/components/view/month';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

import { EventModelData } from '@t/events';

export default { title: 'MonthView' };

function createMonthEvents() {
  const DAYS_OF_WEEK = 7;
  const today = new TZDate();
  const thisSunday = addDate(today, -today.getDay());
  const sundayDate = thisSunday.getDate();
  const sundayMonth = thisSunday.getMonth();
  const todayMonth = today.getMonth();
  const weekCount =
    sundayMonth !== todayMonth
      ? -1
      : Math.floor(
          sundayDate % DAYS_OF_WEEK ? sundayDate / DAYS_OF_WEEK : (sundayDate - 1) / DAYS_OF_WEEK
        );
  const firstSunday = addDate(thisSunday, -weekCount * DAYS_OF_WEEK);
  const firstTuesday = addDate(firstSunday, 2);
  const secondTuesday = addDate(firstTuesday, DAYS_OF_WEEK);
  const secondThursday = addDate(secondTuesday, 2);
  const thirdThursday = addDate(secondThursday, DAYS_OF_WEEK);
  const thirdSaturday = addDate(thirdThursday, 2);
  const events: EventModelData[] = [
    {
      title: 'event1',
      start: firstSunday,
      end: secondTuesday,
      id: '0',
    },
    {
      title: 'event2',
      start: secondTuesday,
      end: secondThursday,
      id: '1',
    },
    {
      title: 'event3',
      start: thirdThursday,
      end: thirdSaturday,
      id: '2',
    },
  ];

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
  events: createMonthEvents(),
};
