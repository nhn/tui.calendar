import { TemplateWeekDay } from '@src/model';

import type { Cells } from '@t/panel';

export const getDayName = (dayIndex: number) => {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayIndex];
};

export function capitalizeDayName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getDayNames(cells: Cells) {
  // @TODO: apply template daynames
  return cells.map<TemplateWeekDay>((day) => {
    const dayIndex = day.getDay();
    const dayName = capitalizeDayName(getDayName(dayIndex));

    return {
      date: day.getDate(),
      day: day.getDay(),
      dayName,
      isToday: true,
      renderDate: 'date',
    };
  });
}
