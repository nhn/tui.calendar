import { CalendarStore } from '@t/store';

export function topLevelStateSelector<Group extends keyof CalendarStore>(
  group: Group
): (state: CalendarStore) => CalendarStore[Group] {
  return (state: CalendarStore) => state[group];
}

export const popupSelector = topLevelStateSelector('popup');
export const calendarSelector = topLevelStateSelector('calendar');
export const weekViewLayoutSelector = topLevelStateSelector('weekViewLayout');
export const templateSelector = topLevelStateSelector('template');
export const viewSelector = topLevelStateSelector('view');
export const optionSelector = topLevelStateSelector('option');
export const dndSelector = topLevelStateSelector('dnd');
