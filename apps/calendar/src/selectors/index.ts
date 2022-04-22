import type { CalendarState } from '@t/store';
import type { ThemeState } from '@t/theme';

export function topLevelStateSelector<State, Group extends keyof State>(
  group: Group
): (state: State) => State[Group] {
  return (state: State) => state[group];
}

export const popupSelector = topLevelStateSelector<CalendarState, 'popup'>('popup');
export const calendarSelector = topLevelStateSelector<CalendarState, 'calendar'>('calendar');
export const weekViewLayoutSelector = topLevelStateSelector<CalendarState, 'weekViewLayout'>(
  'weekViewLayout'
);
export const templateSelector = topLevelStateSelector<CalendarState, 'template'>('template');
export const viewSelector = topLevelStateSelector<CalendarState, 'view'>('view');
export const optionsSelector = topLevelStateSelector<CalendarState, 'options'>('options');
export const dndSelector = topLevelStateSelector<CalendarState, 'dnd'>('dnd');
export const timezoneSelector = topLevelStateSelector<CalendarState, 'timezone'>('timezone');

export const commonThemeSelector = topLevelStateSelector<ThemeState, 'common'>('common');
export const weekThemeSelector = topLevelStateSelector<ThemeState, 'week'>('week');
export const monthThemeSelector = topLevelStateSelector<ThemeState, 'month'>('month');
