export function createWeekTheme(): { week: ThemeState['week'] } {
  return {
    week: {
      dayname: {
        borderLeft: 'none',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: 'inherit',
      },
      weekend: {
        backgroundColor: 'inherit',
      },
      today: {
        color: 'inherit',
        backgroundColor: 'rgba(81, 92, 230, 0.05)',
      },
      pastDay: {
        color: '#bbb',
      },
      panelResizer: {
        border: '1px solid #e5e5e5',
      },
      dayGrid: {
        borderRight: '1px solid #e5e5e5',
        backgroundColor: 'inherit',
      },
      dayGridLeft: {
        borderRight: '1px solid #e5e5e5',
        backgroundColor: 'inherit',
      },
      timeGrid: {
        borderRight: '1px solid #e5e5e5',
      },
      timeGridLeft: {
        backgroundColor: 'inherit',
        borderRight: '1px solid #e5e5e5',
      },
      timeGridLeftAdditionalTimezone: {
        backgroundColor: 'white',
      },
      timeGridHalfHour: {
        borderBottom: '1px solid #e5e5e5',
      },
      currentTime: {
        color: '#515ce6',
      },
      currentTimeLinePast: {
        border: '1px dashed #515ce6',
      },
      currentTimeLineBullet: {
        backgroundColor: '#515ce6',
      },
      currentTimeLineToday: {
        border: '1px solid #515ce6',
      },
      currentTimeLineFuture: {
        border: 'none',
      },
      pastTime: {
        color: '#bbb',
      },
      futureTime: {
        color: '#333',
      },
      gridSelection: {
        color: '#515ce6',
      },
    },
  };
}
