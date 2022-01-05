import { FunctionComponent, h } from 'preact';

import { StoreProvider } from '@src/contexts/calendarStore';
import { FloatingLayerContainerProvider } from '@src/contexts/floatingLayerRef';
import { ThemeProvider } from '@src/contexts/theme';
import { useDOMNode } from '@src/hooks/common/domNode';
import Theme from '@src/theme';

import { CalendarStore, InternalStoreAPI } from '@t/store';

interface Props {
  theme: Theme;
  store: InternalStoreAPI<CalendarStore>;
}

export const CalendarContainer: FunctionComponent<Props> = ({ theme, store, children }) => {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <FloatingLayerContainerProvider value={container}>
          {children}
          <div ref={containerRefCallback} />
        </FloatingLayerContainerProvider>
      </StoreProvider>
    </ThemeProvider>
  );
};
