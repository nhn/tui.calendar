import { useCallback } from 'preact/hooks';

import { commonThemeSelector, monthThemeSelector, weekThemeSelector } from '@src/selectors/theme';
import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';
import { createCommonTheme } from '@src/theme/common';
import { createThemeDispatch } from '@src/theme/dispatch';
import { createMonthTheme } from '@src/theme/month';
import { createWeekTheme } from '@src/theme/week';

import type { Options } from '@t/options';
import type { SetState } from '@t/store';
import type {
  CommonTheme,
  MonthTheme,
  ThemeDispatchers,
  ThemeState,
  ThemeStore,
  WeekTheme,
} from '@t/theme';

const themeStoreCreator =
  (themeOptions: Options['theme'] = {}) =>
  (set: SetState<ThemeStore>) => {
    return {
      ...createCommonTheme(themeOptions?.common),
      ...createWeekTheme(themeOptions?.week),
      ...createMonthTheme(themeOptions?.month),
      dispatch: {
        ...createThemeDispatch(set),
      },
    };
  };

export const initThemeStore = (themeOptions: Options['theme'] = {}) =>
  createStore<ThemeStore>(themeStoreCreator(themeOptions));

const {
  StoreProvider: ThemeProvider,
  useInternalStore: useInternalThemeStore,
  useStore: useTheme,
} = createStoreContext<ThemeStore>();
export { ThemeProvider, useInternalThemeStore, useTheme };

export function useThemeDispatch(): ThemeDispatchers {
  return useTheme(useCallback((state) => state.dispatch, []));
}

export function useCommonTheme(): CommonTheme {
  return useTheme(commonThemeSelector);
}

export function useWeekTheme(): WeekTheme {
  return useTheme(weekThemeSelector);
}

export function useMonthTheme(): MonthTheme {
  return useTheme(monthThemeSelector);
}

export function useAllTheme(): ThemeState {
  return useTheme(
    useCallback(
      ({ common, week, month }) => ({
        common,
        week,
        month,
      }),
      []
    )
  );
}
