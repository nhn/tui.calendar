import produce from 'immer';

import { SetState } from '@t/store';

export function createThemeDispatch(set: SetState<ThemeStore>): ThemeDispatchers {
  return {
    setCommonTheme: (commonTheme: CommonTheme) => {
      set(
        produce((state) => {
          state.common = commonTheme;
        })
      );
    },
    setWeekTheme: (weekTheme: WeekTheme) => {
      set(
        produce((state) => {
          state.week = weekTheme;
        })
      );
    },
    setMonthTheme: (monthTheme: MonthTheme) => {
      set(
        produce((state) => {
          state.month = monthTheme;
        })
      );
    },
  };
}
