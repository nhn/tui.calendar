import { Fragment, FunctionComponent, h } from 'preact';

import { Story } from '@storybook/preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { useDispatch } from '@src/contexts/calendarStore';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';

import { calendars as mockCalendars } from '@stories/util/mockCalendars';
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

const Wrapper: FunctionComponent<EventFormPopupParam> = ({
  children,
  title,
  location,
  start,
  end,
  isAllday,
  isPrivate,
  isCreationPopup,
}) => {
  const { show } = useDispatch('popup');
  show({
    type: PopupType.form,
    param: {
      isCreationPopup,
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
    },
  });

  return <Fragment>{children}</Fragment>;
};

const Template: Story<EventFormPopupStoryProps> = ({
  calendars,
  title,
  location,
  start,
  end,
  isAllday = false,
  isPrivate = false,
}) => (
  <ProviderWrapper options={{ calendars }}>
    <Wrapper
      title={title}
      location={location}
      start={start}
      end={end}
      isAllday={isAllday}
      isPrivate={isPrivate}
      isCreationPopup={true}
    >
      <EventFormPopup />
    </Wrapper>
  </ProviderWrapper>
);

export const EventFormPopupWithCalendars = Template.bind({});
EventFormPopupWithCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
  calendars: mockCalendars,
};

export const EventFormPopupWithoutCalendars = Template.bind({});
EventFormPopupWithoutCalendars.args = {
  start: new TZDate(),
  end: new TZDate(),
};
