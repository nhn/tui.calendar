import { h } from 'preact';

import { useStore } from '@src/contexts/calendarStore';
import CalendarControl from '@src/factory/calendarControl';
import { act, screen } from '@src/test/utils';

function cleanup() {
  document.body.innerHTML = '';
}

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

describe('changeView/getViewName', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    mockCalendar = new MockCalendar(container);
    act(() => {
      mockCalendar.render();
    });
  });

  afterEach(() => {
    cleanup();
  });

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

// @TODO: Add more test cases for multiple events
describe('createEvents', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    mockCalendar = new MockCalendar(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render 1 event', () => {
    // Given
    act(() => {
      mockCalendar.render();
    });
    act(() => {
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
    });

    // When

    // Then
    expect(screen.queryByText('event')).toBeInTheDocument();
  });
});

describe('clear', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    mockCalendar = new MockCalendar(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should clear events', () => {
    // Given
    act(() => {
      mockCalendar.render();
    });
    act(() => {
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
    });
    expect(screen.queryByText('event')).toBeInTheDocument();

    // When
    act(() => {
      mockCalendar.clear();
    });

    // Then
    expect(screen.queryByText('There is no events')).toBeInTheDocument();
  });

  describe('destroy', () => {
    it('should remove all calendar properties', () => {
      // Given
      const properties = Object.keys(mockCalendar) as (keyof MockCalendar)[];

      // When
      mockCalendar.destroy();

      // Then
      expect(container.innerHTML).toMatchInlineSnapshot(`""`);
      properties.forEach((property) => {
        expect(mockCalendar[property]).toBeUndefined();
      });
    });
  });
});
