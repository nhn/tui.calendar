import { FunctionComponent, h } from 'preact';
import Theme from '@src/theme';
import { ThemeContext } from '@src/components/hooks/theme';

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
