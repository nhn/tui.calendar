import { h } from 'preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { initCalendarStore, StoreProvider, useDispatch } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { FloatingLayerProvider } from '@src/contexts/floatingLayer';
import EventModel from '@src/model/eventModel';
import { render, screen } from '@src/test/utils';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';

import type { PropsWithChildren } from '@t/components/common';

describe('event detail popup', () => {
  const mockCalendarId = 'calendarId';
  const mockCalendarName = 'mock calendar';

  const event = new EventModel({
    id: 'id',
    calendarId: mockCalendarId,
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
  });
  const Wrapper = ({ children }: PropsWithChildren) => {
    const { showDetailPopup } = useDispatch('popup');
    showDetailPopup(
      {
        event,
        eventRect: {
          width: 10,
          height: 10,
          left: 0,
          top: 0,
        },
      },
      false
    );

    return <FloatingLayerProvider>{children}</FloatingLayerProvider>;
  };

  beforeEach(() => {
    const eventBus = new EventBusImpl();
    const store = initCalendarStore({
      calendars: [
        {
          id: mockCalendarId,
          name: mockCalendarName,
        },
      ],
    });

    render(
      <EventBusProvider value={eventBus}>
        <StoreProvider store={store}>
          <Wrapper>
            <EventDetailPopup />
          </Wrapper>
        </StoreProvider>
      </EventBusProvider>
    );
  });

  it('should display location when `event.location` is exists', () => {
    const { location } = event;
    const locationText = screen.getByText(location).textContent;

    expect(locationText).toBe(location);
  });

  it('should display recurrence rule when `event.recurrenceRule` is exists', () => {
    const { recurrenceRule } = event;
    const recurrenceRuleText = screen.getByText(recurrenceRule).textContent;

    expect(recurrenceRuleText).toBe(recurrenceRule);
  });

  it('should display attendees when `event.attendees` is exists', () => {
    const { attendees } = event;
    const text = attendees.join(', ');
    const attendeesText = screen.getByText(text).textContent;

    expect(attendeesText).toBe(text);
  });

  it('should display state when `event.state` is exists', () => {
    const { state } = event;
    const stateText = screen.getByText(state).textContent;

    expect(stateText).toBe(state);
  });

  it('should display calendar name when `event.calendarId` and corresponding calendar is exists', () => {
    const calendarName = screen.getByText(mockCalendarName);

    expect(calendarName).toBeInTheDocument();
  });

  it('should display body when `event.body` is exists', () => {
    const { body } = event;
    const bodyText = screen.getByText(body).textContent;

    expect(bodyText).toBe(body);
  });

  it('should display edit and delete buttons when event is not read only', () => {
    const editButton = screen.getByText('Edit');
    const deleteButton = screen.getByText('Delete');

    expect(editButton).not.toBeNull();
    expect(deleteButton).not.toBeNull();
  });
});
