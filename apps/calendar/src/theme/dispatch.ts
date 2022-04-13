import produce from 'immer';

import { mergeObject } from '@src/utils/object';

import type { SetState } from '@t/store';
import type { ThemeDispatchers, ThemeState, ThemeStore } from '@t/theme';

export function createThemeDispatch(set: SetState<ThemeStore>): ThemeDispatchers {
  return {
    setTheme: (theme) => {
      set(
        produce((state: ThemeState) => {
          state.common = mergeObject(state.common, theme.common);
          state.week = mergeObject(state.week, theme.week);
          state.month = mergeObject(state.month, theme.month);
        })
      );
    },
    setCommonTheme: (commonTheme) => {
      set(
        produce((state: ThemeState) => {
          state.common = mergeObject(state.common, commonTheme);
        })
      );
    },
    setWeekTheme: (weekTheme) => {
      set(
        produce((state: ThemeState) => {
          state.week = mergeObject(state.week, weekTheme);
        })
      );
    },
    setMonthTheme: (monthTheme) => {
      set(
        produce((state: ThemeState) => {
          state.month = mergeObject(state.month, monthTheme);
        })
      );
    },
  };
}
