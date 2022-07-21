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

export const DaylightSavingTimeTransition = Template.bind({});
DaylightSavingTimeTransition.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    timezone: {
      zones: [
        {
          timezoneName: 'America/Los_Angeles',
        },
      ],
    },
  },
  onInit: (cal) => {
    cal.setDate('2022-11-07T00:00:00Z');
    cal.createEvents([
      {
        id: 'forward',
        title: 'Forward Transition',
        category: 'time',
        start: '2022-03-13T09:00:00Z',
        end: '2022-03-13T10:00:00Z',
      },
      {
        id: 'fallback',
        title: 'Fallback Transition',
        category: 'time',
        start: '2022-11-06T08:00:00Z',
        end: '2022-11-06T09:00:00Z',
      },
    ]);
    cal.on('afterRenderEvent', console.log);
  },
};

export const DaylightSavingTimeTransitionSouthern = Template.bind({});
DaylightSavingTimeTransitionSouthern.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    timezone: {
      zones: [
        {
          timezoneName: 'Pacific/Auckland',
        },
      ],
    },
  },
  onInit: (cal) => {
    cal.setDate('2022-04-03T00:00:00Z');
    cal.createEvents([
      {
        id: 'forward',
        title: 'Forward Transition',
        category: 'time',
        start: '2022-09-25T01:00:00+12:00',
        end: '2022-09-25T03:00:00+13:00',
      },
      {
        id: 'fallback',
        title: 'Fallback Transition',
        category: 'time',
        start: '2022-04-02T12:00:00Z',
        end: '2022-04-02T14:00:00Z',
      },
    ]);
    cal.on('afterRenderEvent', console.log);
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

export const DuplicateEvents = Template.bind({});
DuplicateEvents.args = {
  ...Template.args,
  options: {
    ...Template.args.options,
    week: {
      ...Template.args.options?.week,
      collapseDuplicateEvents: {
        getDuplicateEvents: (targetEvent, events) =>
          events
            .filter((event) => event.id === targetEvent.id)
            .sort((a, b) => (a.calendarId > b.calendarId ? 1 : -1)),
        getMainEvent: (events) => events[events.length - 1],
      },
    },
    useDetailPopup: false,
  },
};
