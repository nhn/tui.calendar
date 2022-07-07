import { Fragment, h } from 'preact';

import type { Story } from '@storybook/preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { useDispatch } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { ProviderWrapper } from '@stories/util/providerWrapper';

import type { PropsWithChildren } from '@t/components/common';
import type { EventDetailPopupParam } from '@t/store';

export default {
  component: EventDetailPopup,
  title: 'Popups/EventDetailPopup',
};

function Wrapper({ children, event, eventRect }: PropsWithChildren<EventDetailPopupParam>) {
  const { showDetailPopup } = useDispatch('popup');
  showDetailPopup(
    {
      event,
      eventRect,
    },
    false
  );

  return <Fragment>{children}</Fragment>;
}

const Template: Story<EventDetailPopupParam> = ({ event }) => (
  <ProviderWrapper>
    <Wrapper
      event={event}
      eventRect={{
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      }}
    >
      <EventDetailPopup />
      <EventFormPopup />
    </Wrapper>
  </ProviderWrapper>
);

export const EventDetailPopupWithCalendars = Template.bind({});
EventDetailPopupWithCalendars.args = {
  event: new EventModel({
    id: 'id',
    calendarId: 'calendar id',
    title: 'title',
    body: 'body',
    start: new TZDate(),
    end: new TZDate(),
    isAllday: false,
    location: 'location',
    attendees: ['attendee1', 'attendee2'],
    recurrenceRule: 'recurrence rule',
    isReadOnly: false,
    backgroundColor: '#03bd9e',
    state: 'Busy',
  }),
};
