import { h } from 'preact';

import {
  MOCK_MONTH_VIEW_BASE_DATE,
  mockMonthViewEventsFixed,
} from '@stories/mocks/mockMonthViewEvents';
import type { CalendarExampleStory } from '@stories/util/calendarExample';
import { CalendarExample } from '@stories/util/calendarExample';

export default { title: 'E2E/Month View' };

const Template: CalendarExampleStory = (args) => <CalendarExample {...args} />;
Template.args = {
  containerHeight: '100vh',
};

export const Empty = Template.bind({});
Empty.args = {
  ...Template.args,
  options: {
    defaultView: 'month',
  },
};

export const FixedEvents = Template.bind({});
FixedEvents.args = {
  ...Template.args,
  options: {
    defaultView: 'month',
    useFormPopup: true,
    useDetailPopup: true,
  },
  onInit: (cal) => {
    cal.setDate(MOCK_MONTH_VIEW_BASE_DATE);
    cal.createEvents(mockMonthViewEventsFixed);
    cal.on('beforeUpdateEvent', ({ event, changes }) => {
      cal.updateEvent(event.id, event.calendarId, changes);
    });
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Template.args,
  options: {
    defaultView: 'month',
    useFormPopup: true,
    useDetailPopup: true,
    isReadOnly: true,
  },
  onInit: FixedEvents.args.onInit,
};
