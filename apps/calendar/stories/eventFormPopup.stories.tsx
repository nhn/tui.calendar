import { h } from 'preact';

import { Story } from '@storybook/preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import TZDate from '@src/time/date';

import { calendars } from '@stories/util/mockCalendars';
import { ProviderWrapper } from '@stories/util/providerWrapper';

import { CalendarInfo } from '@t/options';
import { EventFormPopupParam } from '@t/store';

export default {
  component: EventFormPopup,
  title: 'Popups/EventFormPopup',
};

interface EventFormPopupStoryProps extends EventFormPopupParam {
  calendars?: CalendarInfo[];
}

const Template: Story<EventFormPopupStoryProps> = (args) => (
  <ProviderWrapper options={{ calendars: args.calendars }}>
    <EventFormPopup {...args} />
  </ProviderWrapper>
);

export const EventFormPopupWithCalendars = Template.bind({});
EventFormPopupWithCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
  calendars,
};

export const EventFormPopupWithoutCalendars = Template.bind({});
EventFormPopupWithoutCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
};
