import { FunctionComponent, h } from 'preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import type EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { EventFormPopupParam } from '@t/store';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';
import { Story } from '@storybook/preact';

export default {
  component: EventFormPopup,
  title: 'Popup/EventFormPopup',
};

interface EventFormPopupStoryProps extends EventFormPopupParam {
  events?: EventModel[];
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

const calendarNames = [
  'My Calendar',
  'Company',
  'Family',
  'Friend',
  'Travel',
  'etc',
  'Birthdays',
  'National Holidays',
];
const calendarColors = [
  '#9e5fff',
  '#00a9ff',
  '#ff5583',
  '#03bd9e',
  '#bbdc00',
  '#9d9d9d',
  '#ffbb3b',
  '#ff4040',
];

const Template: Story<EventFormPopupStoryProps> = (args) => (
  <ProviderWrapper
    events={args.events}
    options={{
      calendars: calendarNames.map((name, index) => ({
        name,
        id: name,
        bgColor: calendarColors[index],
      })),
    }}
  >
    <PopupContainer>
      <EventFormPopup {...args} />
    </PopupContainer>
  </ProviderWrapper>
);

export const EventFormPopupWithCalendars = Template.bind({});
EventFormPopupWithCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
  events: createRandomEventModelsForMonth(40),
};
