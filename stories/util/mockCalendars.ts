import { CalendarData } from '@src/model';

export const calendars: CalendarData[] = [];

function addCalendar(calendar: CalendarData) {
  calendars.push(calendar);
}

const generateCalendarId = (function() {
  let id = 0;

  return function() {
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
    'National Holidays'
  ];
  const calendarColors = [
    '#9e5fff',
    '#00a9ff',
    '#ff5583',
    '#03bd9e',
    '#bbdc00',
    '#9d9d9d',
    '#ffbb3b',
    '#ff4040'
  ];

  calendarNames.forEach(function(name, idx) {
    const color = calendarColors[idx];
    addCalendar({
      id: String(generateCalendarId()),
      name,
      color: '#000',
      bgColor: `${color}33`,
      borderColor: color,
      dragBgColor: color
    });
  });
}

initialize();
