import { CalendarData } from '@src/model';

export const calendars: CalendarData[] = [];

function addCalendar(calendar: CalendarData) {
  calendars.push(calendar);
}

function opacity(color: string) {
  return `${color}90`;
}

function initialize() {
  let id = 0;

  id += 1;
  addCalendar({
    id: String(id),
    name: 'My Calendar',
    color: '#ffffff',
    bgColor: opacity('#9e5fff'),
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'Company',
    color: '#ffffff',
    bgColor: opacity('#00a9ff'),
    dragBgColor: '#00a9ff',
    borderColor: '#00a9ff'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'Family',
    color: '#ffffff',
    bgColor: opacity('#ff5583'),
    dragBgColor: '#ff5583',
    borderColor: '#ff5583'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'Friend',
    color: '#ffffff',
    bgColor: opacity('#03bd9e'),
    dragBgColor: '#03bd9e',
    borderColor: '#03bd9e'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'Travel',
    color: '#ffffff',
    bgColor: opacity('#bbdc00'),
    dragBgColor: '#bbdc00',
    borderColor: '#bbdc00'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'etc',
    color: '#ffffff',
    bgColor: opacity('#9d9d9d'),
    dragBgColor: '#9d9d9d',
    borderColor: '#9d9d9d'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'Birthdays',
    color: '#ffffff',
    bgColor: opacity('#ffbb3b'),
    dragBgColor: '#ffbb3b',
    borderColor: '#ffbb3b'
  });

  id += 1;
  addCalendar({
    id: String(id),
    name: 'National Holidays',
    color: '#ffffff',
    bgColor: opacity('#ff4040'),
    dragBgColor: '#ff4040',
    borderColor: '#ff4040'
  });
}

initialize();
