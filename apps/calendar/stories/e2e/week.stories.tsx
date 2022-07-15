import { h } from 'preact';

import { mockCalendars } from '@stories/mocks/mockCalendars';
import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';
import type { CalendarExampleStory } from '@stories/util/calendarExample';
import { CalendarExample } from '@stories/util/calendarExample';

export default { title: 'E2E/Week View' };

const Template: CalendarExampleStory = (args) => <CalendarExample {...args} />;
Template.args = {
  options: {
    defaultView: 'week',
    useFormPopup: true,
    useDetailPopup: true,
    week: {
      showNowIndicator: false,
    },
    calendars: mockCalendars,
  },
  containerHeight: '100vh',
  onInit: (cal) => {
    cal.createEvents(mockWeekViewEvents);
    cal.on('beforeUpdateEvent', ({ event, changes }) => {
      cal.updateEvent(event.id, event.calendarId, changes);
    });
  },
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  ...Template.args,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    isReadOnly: true,
  },
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

export const MultipleTimezones = Template.bind({});
MultipleTimezones.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    week: {
      showTimezoneCollapseButton: true,
    },
    theme: {
      week: {
        dayGridLeft: {
          width: '120px',
        },
        timeGridLeft: {
          width: '120px',
        },
      },
    },
    timezone: {
      zones: [
        {
          timezoneName: 'Asia/Karachi',
          displayLabel: '+05:00',
        },
        {
          timezoneName: 'US/Samoa',
          displayLabel: '-11:00',
        },
      ],
    },
  },
  onInit: (cal) => {
    cal.createEvents(mockWeekViewEvents);
    cal.on('beforeUpdateEvent', ({ event, changes }) => {
      cal.updateEvent(event.id, event.calendarId, changes);
    });
    cal.on('clickTimezonesCollapseBtn', (prevState) => {
      cal.setOptions({
        week: {
          timezonesCollapsed: !prevState,
        },
      });
    });
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
