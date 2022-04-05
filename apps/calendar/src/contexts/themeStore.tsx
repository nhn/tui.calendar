import { useCallback } from 'preact/hooks';

import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';
import { createCommonTheme } from '@src/theme/common';
import { createThemeDispatch } from '@src/theme/dispatch';
import { createMonthTheme } from '@src/theme/month';
import { createWeekTheme } from '@src/theme/week';

import { SetState } from '@t/store';
import { ThemeDispatchers, ThemeStore } from '@t/theme';

const themeStoreCreator = () => (set: SetState<ThemeStore>) => {
  return {
    ...createCommonTheme(),
    ...createWeekTheme(),
    ...createMonthTheme(),
    dispatch: {
      ...createThemeDispatch(set),
    },
  };
};

export const initThemeStore = () => createStore<ThemeStore>(themeStoreCreator());

const {
  StoreProvider: ThemeProvider,
  useInternalStore: useInternalThemeStore,
  useStore: useTheme,
} = createStoreContext<ThemeStore>();
export { ThemeProvider, useInternalThemeStore, useTheme };

export function useThemeDispatch(): ThemeDispatchers {
  return useTheme(useCallback((state) => state.dispatch, []));
}
