import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import type { MockedMonthViewEvents } from '@stories/mocks/types';

const DAYS_OF_WEEK = 7;

export function createMockMonthViewEvents(baseDate?: string): MockedMonthViewEvents[] {
  const today = baseDate ? new TZDate(baseDate) : new TZDate();
  const thisSunday = addDate(today, -today.getDay());
  const sundayDate = thisSunday.getDate();
  const sundayMonth = thisSunday.getMonth();
  const todayMonth = today.getMonth();
  const weekCount =
    sundayMonth !== todayMonth
      ? -1
      : Math.floor(
          sundayDate % DAYS_OF_WEEK ? sundayDate / DAYS_OF_WEEK : (sundayDate - 1) / DAYS_OF_WEEK
        );
  const firstSunday = addDate(thisSunday, -weekCount * DAYS_OF_WEEK);
  const firstTuesday = addDate(firstSunday, 2);
  const secondTuesday = addDate(firstTuesday, DAYS_OF_WEEK);
  const secondThursday = addDate(secondTuesday, 2);
  const thirdThursday = addDate(secondThursday, DAYS_OF_WEEK);
  const thirdSaturday = addDate(thirdThursday, 2);

  const mockMonthViewEvents = [
    {
      id: '0',
      calendarId: 'cal1',
      title: 'event1',
      start: firstSunday,
      end: secondTuesday,
    },
    {
      id: '1',
      calendarId: 'cal1',
      title: 'event2',
      start: secondTuesday,
      end: secondThursday,
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'event3',
      start: thirdThursday,
      end: thirdSaturday,
    },
  ];

  for (let i = 0; i < 10; i += 1) {
    mockMonthViewEvents.push({
      id: `${i}${i}`,
      calendarId: 'cal2',
      title: `event2-${i}`,
      start: secondTuesday,
      end: secondThursday,
    });
  }

  return mockMonthViewEvents;
}

export const mockMonthViewEvents = createMockMonthViewEvents();

// For E2E tests, set the base date in order to guarantee the same events are returned
export const MOCK_MONTH_VIEW_BASE_DATE = '2022-04-01';
export const mockMonthViewEventsFixed = createMockMonthViewEvents(MOCK_MONTH_VIEW_BASE_DATE);
