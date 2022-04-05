import { createContext, h } from 'preact';
import { useCallback, useContext } from 'preact/hooks';

import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';
import Theme from '@src/theme';
import { createCommonTheme } from '@src/theme/common';
import { createThemeDispatch } from '@src/theme/dispatch';
import { createMonthTheme } from '@src/theme/month';
import { createWeekTheme } from '@src/theme/week';
import { isNil } from '@src/utils/type';

import { PropsWithChildren } from '@t/components/common';
import { SetState } from '@t/store';

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);

  if (isNil(ctx)) {
    throw new Error('Theme is not found');
  }

  return ctx as Theme;
};

export function ThemeProvider({ theme, children }: PropsWithChildren<{ theme: Theme }>) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

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
  StoreProvider: ThemeProvider2,
  useInternalStore: useInternalThemeStore,
  useStore: useTheme2,
} = createStoreContext<ThemeStore>();
export { ThemeProvider2, useInternalThemeStore, useTheme2 };

export function useThemeDispatch(): ThemeDispatchers {
  return useTheme2(useCallback((state) => state.dispatch, []));
}
