import { createContext } from 'preact';
import Theme from '@src/theme';
import { useContext } from 'preact/hooks';

// eslint-disable-next-line no-undefined
export const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);

  if (typeof ctx === 'undefined') {
    throw new Error('Theme is not found');
  }

  return ctx as Theme;
};
