import { TZDate } from '@toast-ui/calendar';

import { addDate, addHours, subtractDate } from './utils';

const today = new TZDate();

export const events = [
  {
    id: '1',
    calendarId: '0',
    title: 'TOAST UI Calendar Study',
    category: 'time',
    start: today,
    end: addHours(today, 3),
  },
  {
    id: '2',
    calendarId: '0',
    title: 'Practice',
    category: 'milestone',
    start: addDate(today, 1),
    end: addDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '3',
    calendarId: '0',
    title: 'FE Workshop',
    category: 'allday',
    start: subtractDate(today, 2),
    end: subtractDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '4',
    calendarId: '0',
    title: 'Report',
    category: 'time',
    start: today,
    end: addHours(today, 1),
  },
];
