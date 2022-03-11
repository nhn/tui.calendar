import { h } from 'preact';

import { screen } from '@testing-library/preact';

import { useStore } from '@src/contexts/calendarStore';
import CalendarControl from '@src/factory/calendarControl';

describe('calendarControl', () => {
  function MockComponent() {
    const events = useStore((state) => state.calendar.events.toArray());

    return events.length > 0 ? (
      <div>
        {events.map((event) => (
          <div key={event.id}>event</div>
        ))}
      </div>
    ) : (
      <div>There is no events</div>
    );
  }

  class MockCalendar extends CalendarControl {
    protected getComponent() {
      return <MockComponent />;
    }
  }
  let mockCalendar: MockCalendar;
  const container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach(() => {
    mockCalendar = new MockCalendar(container);
    mockCalendar.render();
  });

  describe('changeView/getViewName', () => {
    it('should return current view name', () => {
      // Given

      // When

      // Then
      expect(mockCalendar.getViewName()).toBe('month'); // Initial view is 'month'
    });

    it('should change current view to week', () => {
      // Given

      // When
      mockCalendar.changeView('week');

      // Then
      expect(mockCalendar.getViewName()).toBe('week');
    });

    it('should change current view to day', () => {
      // Given

      // When
      mockCalendar.changeView('day');

      // Then
      expect(mockCalendar.getViewName()).toBe('day');
    });
  });

  describe('clear', () => {
    beforeEach(() => {
      mockCalendar.createEvents([
        {
          id: '1',
          calendarId: '1',
          title: 'my event',
          category: 'time',
          dueDateClass: '',
          start: '2018-01-18T22:30:00+09:00',
          end: '2018-01-19T02:30:00+09:00',
        },
      ]);
      mockCalendar.render();
    });

    it('should render 1 event', () => {
      // Given
      const eventElement = screen.getByText('event');

      // When

      // Then
      expect(eventElement).not.toBeNull();
    });

    it('should clear events', () => {
      // Given

      // When
      mockCalendar.clear();
      mockCalendar.render();
      const eventElement = screen.queryByText('event');
      const noEventElement = screen.queryByText('There is no events');

      // Then
      expect(eventElement).toBeNull();
      expect(noEventElement).not.toBeNull();
    });
  });
});
