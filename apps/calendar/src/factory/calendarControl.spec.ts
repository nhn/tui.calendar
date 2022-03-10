import CalendarControl from '@src/factory/calendarControl';

describe('calendarControl', () => {
  class MockCalendar extends CalendarControl {
    protected getComponent() {
      return null;
    }
  }
  let mockCalendar: MockCalendar;
  const container = document.createElement('div');

  beforeEach(() => {
    mockCalendar = new MockCalendar(container);
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
