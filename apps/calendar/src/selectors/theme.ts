import { topLevelStateSelector } from '@src/selectors';

import type { ThemeState } from '@t/theme';

/**
 * Selectors for the theme state.
 * Use selectors with `useTheme` hooks only.
 */
export const commonThemeSelector = topLevelStateSelector<ThemeState, 'common'>('common');
export const weekThemeSelector = topLevelStateSelector<ThemeState, 'week'>('week');
export const monthThemeSelector = topLevelStateSelector<ThemeState, 'month'>('month');

export const weekDayGridLeftSelector = (theme: ThemeState) => theme.week.dayGridLeft;
export const weekTimeGridLeftSelector = (theme: ThemeState) => theme.week.timeGridLeft;

export const monthMoreViewSelector = (theme: ThemeState) => theme.month.moreView;
export const monthGridCellSelector = (theme: ThemeState) => theme.month.gridCell;
