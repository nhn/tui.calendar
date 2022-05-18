import type TZDate from '@src/time/date';
import { capitalize } from '@src/utils/keyboard';

import type { TemplateWeekDayName } from '@t/template';

export const getDayName = (dayIndex: number) => {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayIndex];
};

export function getDayNames(row: TZDate[]) {
  // @TODO: apply template daynames
  return row.map<TemplateWeekDayName>((day) => {
    const dayIndex = day.getDay();
    const dayName = capitalize(getDayName(dayIndex));

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
