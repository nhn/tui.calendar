import type TZDate from '@src/time/date';

import type { EventObject } from '@t/events';

export type MockedWeekViewEvents = Required<
  Pick<EventObject, 'id' | 'calendarId' | 'title' | 'category' | 'isAllday'>
> & {
  start: TZDate;
  end: TZDate;
};

export type MockedMonthViewEvents = Omit<MockedWeekViewEvents, 'isAllday' | 'category'>;
