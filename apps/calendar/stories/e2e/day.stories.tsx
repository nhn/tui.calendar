import { h } from 'preact';

import { mockDayViewEvents } from '@stories/mocks/mockDayViewEvents';
import type { CalendarExampleStory } from '@stories/util/calendarExample';
import { CalendarExample } from '@stories/util/calendarExample';

export default { title: 'E2E/Day View' };

const Template: CalendarExampleStory = (args) => <CalendarExample {...args} />;
Template.args = {
  options: {
    defaultView: 'day',
    useCreationPopup: true,
    useDetailPopup: true,
  },
  containerHeight: '100vh',
};

export const DayViewWithFixedEvents = Template.bind({});
DayViewWithFixedEvents.args = {
  ...Template.args,
  onInit: (cal) => {
    cal.createEvents(mockDayViewEvents);
  },
};
