import { h, createContext, FunctionComponent } from 'preact';
import Theme from '@src/theme';
import { useContext } from 'preact/hooks';

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (typeof ctx === 'undefined') {
    throw new Error('ThemeProvider is not found');
  }

  return ctx;
};

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
