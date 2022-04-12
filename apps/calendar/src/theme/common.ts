import type { DeepPartial } from 'ts-essentials';

import { DEFAULT_COMMON_THEME } from '@src/constants/theme';
import { mergeObject } from '@src/utils/object';

import type { CommonTheme, ThemeState } from '@t/theme';

export function createCommonTheme(commonTheme: DeepPartial<CommonTheme> = {}): {
  common: Required<ThemeState['common']>;
} {
  return {
    common: mergeObject(DEFAULT_COMMON_THEME, commonTheme),
  };
}
