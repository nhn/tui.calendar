import type { DeepPartial } from 'ts-essentials';

import { DEFAULT_WEEK_THEME } from '@src/constants/theme';
import { mergeObject } from '@src/utils/object';

import type { ThemeState, WeekTheme } from '@t/theme';

export function createWeekTheme(weekTheme: DeepPartial<WeekTheme> = {}): {
  week: Required<ThemeState>['week'];
} {
  return {
    week: mergeObject(DEFAULT_WEEK_THEME, weekTheme),
  };
}
