import TZDate from '@src/time/date';
import { addDate, setTimeStrToDate } from '@src/time/datetime';

import type { MockedWeekViewEvents } from '@stories/mocks/types';

const today = new TZDate();
const yesterday = addDate(today, -1);
const tomorrow = addDate(today, 1);

export const mockDayViewEvents: MockedWeekViewEvents[] = [
  {
    id: '1',
    calendarId: 'cal1',
    title: 'yesterday ~ today',
    category: 'allday',
    isAllday: true,
    start: yesterday,
    end: today,
  },
  {
    id: '2',
    calendarId: 'cal1',
    title: 'today ~ today',
    category: 'allday',
    isAllday: true,
    start: today,
    end: today,
  },
  {
    id: '3',
    calendarId: 'cal1',
    title: 'today ~ tomorrow',
    category: 'allday',
    isAllday: true,
    start: today,
    end: tomorrow,
  },
  {
    id: '4',
    calendarId: 'cal1',
    title: 'long time',
    category: 'time',
    isAllday: false,
    start: setTimeStrToDate(yesterday, '10:00'),
    end: setTimeStrToDate(today, '06:00'),
  },
  {
    id: '5',
    calendarId: 'cal1',
    title: 'short time',
    category: 'time',
    isAllday: false,
    start: setTimeStrToDate(today, '04:00'),
    end: setTimeStrToDate(today, '06:00'),
  },
  {
    id: '6',
    calendarId: 'cal1',
    title: 'short + duration',
    category: 'time',
    isAllday: false,
    start: setTimeStrToDate(today, '04:00'),
    end: setTimeStrToDate(today, '06:00'),
    goingDuration: 60,
    comingDuration: 120,
  },
];
