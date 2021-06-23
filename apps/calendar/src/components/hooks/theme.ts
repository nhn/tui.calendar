import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import Theme from '@src/theme';
import { isNil } from '@src/util/utils';

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);

  if (isNil(ctx)) {
    throw new Error('Theme is not found');
  }

  return ctx as Theme;
};
