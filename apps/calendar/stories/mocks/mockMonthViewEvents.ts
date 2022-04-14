import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import type { EventModelData } from '@t/events';

const DAYS_OF_WEEK = 7;
const today = new TZDate();
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

export const mockMonthViewEvents: EventModelData[] = [
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
