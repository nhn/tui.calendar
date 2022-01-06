import { FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import { StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { ThemeProvider } from '@src/contexts/theme';
import Theme from '@src/theme';
import { EventBus } from '@src/utils/eventBus';

import { CalendarStore, InternalStoreAPI } from '@t/store';

interface Props {
  theme: Theme;
  store: InternalStoreAPI<CalendarStore>;
  eventBus: EventBus<ExternalEventTypes>;
}

export const CalendarContainer: FunctionComponent<Props> = ({
  theme,
  store,
  eventBus,
  children,
}) => (
  <EventBusProvider value={eventBus}>
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        {children}
        <FloatingLayer />
      </StoreProvider>
    </ThemeProvider>
  </EventBusProvider>
);
