import { h } from 'preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';

import { CalendarInfo } from '@t/option';
import { EventDetailPopupParam } from '@t/store';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Story } from '@storybook/preact';

export default {
  component: EventDetailPopup,
  title: 'Popup/EventDetailPopup',
};

interface EventDetailPopupStoryProps extends EventDetailPopupParam {
  calendars?: CalendarInfo[];
}

const Template: Story<EventDetailPopupStoryProps> = (args) => (
  <ProviderWrapper options={{ calendars: args.calendars }}>
    <EventDetailPopup {...args} />
  </ProviderWrapper>
);

export const EventDetailPopupWithCalendars = Template.bind({});
EventDetailPopupWithCalendars.args = {
  event: {
    id: 'id',
    name: 'name',
    bgColor: '#03bd9e',
  },
};
