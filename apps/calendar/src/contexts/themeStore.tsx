import { useCallback } from 'preact/hooks';

import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';
import { createCommonTheme } from '@src/theme/common';
import { createThemeDispatch } from '@src/theme/dispatch';
import { createMonthTheme } from '@src/theme/month';
import { createWeekTheme } from '@src/theme/week';

import { Options } from '@t/options';
import { SetState } from '@t/store';
import { ThemeDispatchers, ThemeStore } from '@t/theme';

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
