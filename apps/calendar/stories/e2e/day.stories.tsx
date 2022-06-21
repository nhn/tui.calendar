import { h } from 'preact';

import { mockDayViewEvents } from '@stories/mocks/mockDayViewEvents';
import type { CalendarExampleStory } from '@stories/util/calendarExample';
import { CalendarExample } from '@stories/util/calendarExample';

export default { title: 'E2E/Day View' };

const Template: CalendarExampleStory = (args) => <CalendarExample {...args} />;
Template.args = {
  options: {
    defaultView: 'day',
    useFormPopup: true,
    useDetailPopup: true,
    week: {
      showNowIndicator: false,
    },
  },
  containerHeight: '100vh',
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  ...Template.args,
  onInit: (cal) => {
    cal.createEvents(mockDayViewEvents);
    cal.on('beforeUpdateEvent', ({ event, changes }) => {
      cal.updateEvent(event.id, event.calendarId, changes);
    });
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    isReadOnly: true,
  },
  onInit: FixedEvents.args.onInit,
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
};
