import produce from 'immer';

import { mergeObject } from '@src/utils/object';

import { SetState } from '@t/store';
import { ThemeDispatchers, ThemeStore } from '@t/theme';

export function createThemeDispatch(set: SetState<ThemeStore>): ThemeDispatchers {
  return {
    setCommonTheme: (commonTheme) => {
      set(
        produce((state) => {
          state.common = mergeObject(state.common, commonTheme);
        })
      );
    },
    setWeekTheme: (weekTheme) => {
      set(
        produce((state) => {
          state.week = mergeObject(state.week, weekTheme);
        })
      );
    },
    setMonthTheme: (monthTheme) => {
      set(
        produce((state) => {
          state.month = mergeObject(state.month, monthTheme);
        })
      );
    },
  };
}
