import { h } from 'preact';

import { fireEvent, render as ptlRender } from '@testing-library/preact';
import { renderHook as ptlRenderHook } from '@testing-library/preact-hooks';
import { Callback } from '@testing-library/preact-hooks/lib/_types';
import { RenderHookOptions } from '@testing-library/preact-hooks/lib/renderHook';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { initThemeStore } from '@src/contexts/themeStore';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';

import { PropsWithChildren } from '@t/components/common';
import { CalendarStore, InternalStoreAPI } from '@t/store';
import { ThemeStore } from '@t/theme';

function render(
  component: Parameters<typeof ptlRender>[0],
  {
    eventBus = new EventBusImpl<any>(),
    store = initCalendarStore(),
    theme = initThemeStore(),
    ...options
  }: Parameters<typeof ptlRender>[1] &
    Partial<{
      eventBus: EventBus<any>;
      store: InternalStoreAPI<CalendarStore>;
      theme: InternalStoreAPI<ThemeStore>;
    }> = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <CalendarContainer theme={theme} eventBus={eventBus} store={store}>
      {children}
    </CalendarContainer>
  );

  return ptlRender(component, { wrapper: Wrapper, ...options });
}

function renderHook<P, R>(
  hook: Callback<P, R>,
  {
    eventBus = new EventBusImpl<any>(),
    store = initCalendarStore(),
    theme = initThemeStore(),
    ...options
  }: RenderHookOptions<P> &
    Partial<{
      eventBus: EventBus<any>;
      store: InternalStoreAPI<CalendarStore>;
      theme: InternalStoreAPI<ThemeStore>;
    }> = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <CalendarContainer theme={theme} eventBus={eventBus} store={store}>
      {children}
    </CalendarContainer>
  );

  return ptlRenderHook(hook, { wrapper: Wrapper, ...options });
}

export function dragAndDrop({
  element,
  initPosition,
  targetPosition,
  hold = false,
}: {
  element: HTMLElement;
  targetPosition: ClientMousePosition;
  initPosition?: ClientMousePosition;
  hold?: boolean;
}) {
  fireEvent.mouseDown(element, initPosition);
  fireEvent.mouseMove(document, targetPosition);
  fireEvent.mouseMove(document, targetPosition);
  if (!hold) {
    fireEvent.mouseUp(document);
  }
}

export * from '@testing-library/preact';
export { render, renderHook };
