import type TZDate from '@src/time/date';
import { capitalize } from '@src/utils/string';

import type { WeekOptions } from '@t/options';
import type { TemplateWeekDayName } from '@t/template';

export const DEFAULT_DAY_NAMES = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const getDayName = (dayIndex: number) => {
  return DEFAULT_DAY_NAMES[dayIndex];
};

export function getDayNames(
  days: TZDate[],
  weekDayNamesOption: Required<WeekOptions>['dayNames'] | []
) {
  return days.map<TemplateWeekDayName>((day) => {
    const dayIndex = day.getDay();
    const dayName =
      weekDayNamesOption.length > 0
        ? weekDayNamesOption[dayIndex]
        : capitalize(getDayName(dayIndex));

    return {
      date: day.getDate(),
      day: day.getDay(),
      dayName,
      isToday: true,
      renderDate: 'date',
      dateInstance: day,
    };
  });
}
