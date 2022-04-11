import { h } from 'preact';

import { StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { FloatingLayerProvider } from '@src/contexts/floatingLayer';
import { ThemeProvider } from '@src/contexts/themeStore';
import type { EventBus } from '@src/utils/eventBus';

import type { PropsWithChildren } from '@t/components/common';
import type { ExternalEventTypes } from '@t/eventBus';
import type { CalendarStore, InternalStoreAPI } from '@t/store';
import type { ThemeStore } from '@t/theme';

interface Props {
  theme: InternalStoreAPI<ThemeStore>;
  store: InternalStoreAPI<CalendarStore>;
  eventBus: EventBus<ExternalEventTypes>;
}

export function CalendarContainer({ theme, store, eventBus, children }: PropsWithChildren<Props>) {
  return (
    <EventBusProvider value={eventBus}>
      <ThemeProvider store={theme}>
        <StoreProvider store={store}>
          <FloatingLayerProvider>{children}</FloatingLayerProvider>
        </StoreProvider>
      </ThemeProvider>
    </EventBusProvider>
  );
}
