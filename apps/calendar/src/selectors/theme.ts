import { ThemeState, ThemeStore } from '@t/theme';

export function topLevelStateSelector<Group extends Exclude<keyof ThemeStore, 'dispatch'>>(
  group: Group
): (state: ThemeState) => Required<ThemeState>[Group] {
  return (state: ThemeState) => (state as Required<ThemeState>)[group];
}

export const commonThemeSelector = topLevelStateSelector('common');
export const weekThemeSelector = topLevelStateSelector('week');
export const monthThemeSelector = topLevelStateSelector('month');
