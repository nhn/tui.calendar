import { FunctionComponent, h } from 'preact';

import { StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { FloatingLayerContainerProvider } from '@src/contexts/floatingLayerRef';
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
        <FloatingLayerContainerProvider>{children}</FloatingLayerContainerProvider>
      </StoreProvider>
    </ThemeProvider>
  </EventBusProvider>
);
