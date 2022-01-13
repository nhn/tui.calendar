import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import Theme from '@src/theme';
import { isNil } from '@src/utils/type';

import { PropsWithChildren } from '@t/components/common';

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
