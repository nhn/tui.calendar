import { CalendarState, CalendarStore } from '@t/store';

export function topLevelStateSelector<Group extends Exclude<keyof CalendarStore, 'dispatch'>>(
  group: Group
): (state: CalendarState) => CalendarState[Group] {
  return (state: CalendarState) => state[group];
}

export const popupSelector = topLevelStateSelector('popup');
export const calendarSelector = topLevelStateSelector('calendar');
export const weekViewLayoutSelector = topLevelStateSelector('weekViewLayout');
export const templateSelector = topLevelStateSelector('template');
export const viewSelector = topLevelStateSelector('view');
export const optionsSelector = topLevelStateSelector('options');
export const dndSelector = topLevelStateSelector('dnd');
