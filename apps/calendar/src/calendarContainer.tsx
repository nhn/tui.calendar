import { FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import { StoreProvider } from '@src/contexts/calendarStore';
import { ThemeProvider } from '@src/contexts/theme';
import Theme from '@src/theme';

import { CalendarStore, InternalStoreAPI } from '@t/store';

interface Props {
  theme: Theme;
  store: InternalStoreAPI<CalendarStore>;
}

export const CalendarContainer: FunctionComponent<Props> = ({ theme, store, children }) => (
  <ThemeProvider theme={theme}>
    <StoreProvider store={store}>
      {children}
      <FloatingLayer />
    </StoreProvider>
  </ThemeProvider>
);
