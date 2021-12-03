import { FunctionComponent, h } from 'preact';

import { render, screen } from '@testing-library/preact';

import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

describe('event detail popup', () => {
  const event = EventModel.create({
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
  });
  const Wrapper: FunctionComponent = ({ children }) => {
    const store = initCalendarStore();

    return <StoreProvider store={store}>{children}</StoreProvider>;
  };

  beforeEach(() => {
    render(
      <Wrapper>
        <EventDetailPopup event={event} popupRect={{}} />
      </Wrapper>
    );
  });

  it('should display location when `event.location` is exists', () => {
    const locationElement = screen.getByText(event.location);

    expect(locationElement).not.toBeNull();
  });

  it('should display recurrence rule when `event.recurrenceRule` is exists', () => {
    const recurrenceRuleElement = screen.getByText(event.recurrenceRule);

    expect(recurrenceRuleElement).not.toBeNull();
  });

  it('should display attendees when `event.attendees` is exists', () => {
    const attendeesElement = screen.getByText(event.attendees.join(','));

    expect(attendeesElement).not.toBeNull();
  });

  it('should display state when `event.state` is exists', () => {
    const stateElement = screen.getByText(event.state);

    expect(stateElement).not.toBeNull();
  });

  it('should display calendar id when `event.calendarId` is exists', () => {
    const calendarIdElement = screen.getByText(event.calendarId);

    expect(calendarIdElement).not.toBeNull();
  });

  it('should display body when `event.body` is exists', () => {
    const bodyElement = screen.getByText(event.body);

    expect(bodyElement).not.toBeNull();
  });

  it('should display edit and delete buttons when event is not read only', () => {
    const editButton = screen.getByText('Edit');
    const deleteButton = screen.getByText('Delete');

    expect(editButton).not.toBeNull();
    expect(deleteButton).not.toBeNull();
  });
});
