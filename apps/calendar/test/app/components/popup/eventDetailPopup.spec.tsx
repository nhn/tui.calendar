import { h } from 'preact';

import { render, screen } from '@testing-library/preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { initCalendarStore, StoreProvider, useDispatch } from '@src/contexts/calendarStore';
import { FloatingLayerProvider } from '@src/contexts/floatingLayer';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { PropsWithChildren } from '@t/components/common';

describe('event detail popup', () => {
  const event = EventModel.create({
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
    bgColor: '#03bd9e',
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
    const store = initCalendarStore();

    render(
      <StoreProvider store={store}>
        <Wrapper>
          <EventDetailPopup />
        </Wrapper>
      </StoreProvider>
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
    const text = attendees.join(',');
    const attendeesText = screen.getByText(text).textContent;

    expect(attendeesText).toBe(text);
  });

  it('should display state when `event.state` is exists', () => {
    const { state } = event;
    const stateText = screen.getByText(state).textContent;

    expect(stateText).toBe(state);
  });

  it('should display calendar id when `event.calendarId` is exists', () => {
    const { calendarId } = event;
    const calendarIdText = screen.getByText(calendarId).textContent;

    expect(calendarIdText).toBe(calendarId);
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
