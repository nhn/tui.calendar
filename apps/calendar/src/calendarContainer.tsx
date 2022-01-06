import { FunctionComponent, h } from 'preact';

import { StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { FloatingLayerContainerProvider } from '@src/contexts/floatingLayerRef';
import { ThemeProvider } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/domNode';
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
}) => {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();

  return (
    <EventBusProvider value={eventBus}>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <FloatingLayerContainerProvider value={container}>
            {children}
            <div ref={containerRefCallback} className={cls('floating-layer')} />
          </FloatingLayerContainerProvider>
        </StoreProvider>
      </ThemeProvider>
    </EventBusProvider>
  );
};
