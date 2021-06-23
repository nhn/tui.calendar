import { FunctionComponent, h } from 'preact';

import { ThemeContext } from '@src/components/hooks/theme';
import Theme from '@src/theme';

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
