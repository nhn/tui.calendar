import { h } from 'preact';

import { act, fireEvent, render as ptlRender } from '@testing-library/preact';
import { renderHook as ptlRenderHook } from '@testing-library/preact-hooks';
import { Callback } from '@testing-library/preact-hooks/lib/_types';
import { RenderHookOptions } from '@testing-library/preact-hooks/lib/renderHook';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import Theme from '@src/theme';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';

import { PropsWithChildren } from '@t/components/common';
import { CalendarStore, InternalStoreAPI } from '@t/store';

function render(
  component: Parameters<typeof ptlRender>[0],
  {
    eventBus = new EventBusImpl<any>(),
    store = initCalendarStore(),
    theme = new Theme(),
    ...options
  }: Parameters<typeof ptlRender>[1] &
    Partial<{
      eventBus: EventBus<any>;
      store: InternalStoreAPI<CalendarStore>;
      theme: Theme;
    }>
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
    theme = new Theme(),
    ...options
  }: RenderHookOptions<P> &
    Partial<{
      eventBus: EventBus<any>;
      store: InternalStoreAPI<CalendarStore>;
      theme: Theme;
    }>
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <CalendarContainer theme={theme} eventBus={eventBus} store={store}>
      {children}
    </CalendarContainer>
  );

  return ptlRenderHook(hook, { wrapper: Wrapper, ...options });
}

export function dragAndDrop(
  element: HTMLElement,
  targetPosition: ClientMousePosition,
  hold = false
) {
  act(() => {
    fireEvent.mouseDown(element);
  });

  act(() => {
    fireEvent.mouseMove(document, {
      clientX: targetPosition.clientX + 3,
      clientY: targetPosition.clientY + 3,
    });
  });

  act(() => {
    fireEvent.mouseMove(document, {
      clientX: targetPosition.clientX,
      clientY: targetPosition.clientY,
    });
  });

  if (!hold) {
    act(() => {
      fireEvent.mouseUp(document);
    });
  }
}

export * from '@testing-library/preact';
export { render, renderHook };
