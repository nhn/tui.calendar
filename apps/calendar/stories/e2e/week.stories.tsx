import { h } from 'preact';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';
import type { CalendarExampleStory } from '@stories/util/calendarExample';
import { CalendarExample } from '@stories/util/calendarExample';

export default { title: 'E2E/Week View' };

const Template: CalendarExampleStory = (args) => <CalendarExample {...args} />;
Template.args = {
  options: {
    defaultView: 'week',
    useCreationPopup: true,
    useDetailPopup: true,
  },
  containerHeight: '100vh',
  onInit: (cal) => {
    cal.createEvents(mockWeekViewEvents);
  },
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  ...Template.args,
};

export const DifferentPrimaryTimezone = Template.bind({});
DifferentPrimaryTimezone.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    timezone: {
      zones: [
        {
          timezoneName: 'Asia/Karachi',
        },
      ],
    },
  },
};

export const CustomTemplate = Template.bind({});
CustomTemplate.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    template: {
      alldayTitle() {
        // Insert <script> for DOM Purify Test
        return '<span><script></script>CUSTOM All Day</span>';
      },
      taskTitle() {
        return '<span>CUSTOM TASK</span>';
      },
    },
  },
};
