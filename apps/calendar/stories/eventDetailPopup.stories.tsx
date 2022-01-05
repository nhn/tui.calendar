import { h } from 'preact';

import { Story } from '@storybook/preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { ProviderWrapper } from '@stories/util/providerWrapper';

import { EventDetailPopupParam } from '@t/store';

export default {
  component: EventDetailPopup,
  title: 'Popups/EventDetailPopup',
};

const Template: Story<EventDetailPopupParam> = () => (
  <ProviderWrapper>
    <EventDetailPopup />
  </ProviderWrapper>
);

export const EventDetailPopupWithCalendars = Template.bind({});
EventDetailPopupWithCalendars.args = {
  event: EventModel.create({
    id: 'id',
    calendarId: 'calendar id',
    title: 'title',
    body: 'body',
    start: new TZDate(),
    end: new TZDate(),
    isAllDay: false,
    location: 'location',
    attendees: ['attendee1', 'attendee2'],
    recurrenceRule: 'recurrence rule',
    isReadOnly: false,
    bgColor: '#03bd9e',
    state: 'Busy',
  }),
};
