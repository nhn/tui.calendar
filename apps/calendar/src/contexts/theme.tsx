import { createContext, FunctionComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import Theme from '@src/theme';
import { isNil } from '@src/utils/type';

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);

  if (isNil(ctx)) {
    throw new Error('Theme is not found');
  }

  return ctx as Theme;
};

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
