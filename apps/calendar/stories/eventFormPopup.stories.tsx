import { FunctionComponent, h } from 'preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import TZDate from '@src/time/date';

import { CalendarInfo } from '@t/option';
import { EventFormPopupParam } from '@t/store';

import { calendars } from '@stories/util/mockCalendars';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Story } from '@storybook/preact';

export default {
  component: EventFormPopup,
  title: 'Popup/EventFormPopup',
};

interface EventFormPopupStoryProps extends EventFormPopupParam {
  calendars?: CalendarInfo[];
}

const PopupContainer: FunctionComponent = ({ children }) => (
  <div
    style={{
      zIndex: 1005,
      margin: '30px auto 0',
      width: 474,
      height: 272,
    }}
  >
    {children}
  </div>
);

const Template: Story<EventFormPopupStoryProps> = (args) => (
  <ProviderWrapper options={{ calendars: args.calendars }}>
    <PopupContainer>
      <EventFormPopup {...args} />
    </PopupContainer>
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
