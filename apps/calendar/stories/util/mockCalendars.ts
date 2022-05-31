import type { CalendarInfo } from '@t/options';

export const calendars: CalendarInfo[] = [];

function addCalendar(calendar: CalendarInfo) {
  calendars.push(calendar);
}

const generateCalendarId = (function () {
  let id = 0;

  return function () {
    id = id + 1;

    return id;
  };
})();

function initialize() {
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

  calendarNames.forEach((name, idx) => {
    const color = calendarColors[idx];
    addCalendar({
      id: String(generateCalendarId()),
      name,
      color: '#000',
      backgroundColor: color,
      borderColor: color,
      dragBackgroundColor: color,
    });
  });
}

initialize();
