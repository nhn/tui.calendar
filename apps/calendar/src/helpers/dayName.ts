import TZDate from '@src/time/date';

import { TemplateWeekDayName } from '@t/template';

export const getDayName = (dayIndex: number) => {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayIndex];
};

export function capitalizeDayName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getDayNames(row: TZDate[]) {
  // @TODO: apply template daynames
  return row.map<TemplateWeekDayName>((day) => {
    const dayIndex = day.getDay();
    const dayName = capitalizeDayName(getDayName(dayIndex));

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
