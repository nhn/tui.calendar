import { h } from 'preact';

import type { RenderHookOptions } from '@testing-library/preact';
import {
  fireEvent,
  render as ptlRender,
  renderHook as ptlRenderHook,
} from '@testing-library/preact';
import { default as userEvent } from '@testing-library/user-event';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { initThemeStore } from '@src/contexts/themeStore';
import type { EventBus } from '@src/utils/eventBus';
import { EventBusImpl } from '@src/utils/eventBus';
import { isPresent } from '@src/utils/type';

import type { PropsWithChildren } from '@t/components/common';
import type { ClientMousePosition } from '@t/mouse';
import type { CalendarStore, InternalStoreAPI } from '@t/store';
import type { ThemeStore } from '@t/theme';
import type { FormattedTimeString } from '@t/time/datetime';

function render(
  component: Parameters<typeof ptlRender>[0],
  {
    eventBus = new EventBusImpl<Record<string, any>>(),
    store = initCalendarStore(),
    theme = initThemeStore(),
    ...options
  }: Parameters<typeof ptlRender>[1] &
    Partial<{
      eventBus: EventBus<Record<string, any>>;
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

function renderHook<R, P>(
  hook: (initialProp: P) => R,
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

  return ptlRenderHook<R, P>(hook, { wrapper: Wrapper, ...options });
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

export function hasDesiredStartTime(el: HTMLElement, startTimeStr: FormattedTimeString) {
  let node: HTMLElement | null = el;
  while (isPresent(node)) {
    if (node.textContent?.includes(startTimeStr)) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

export * from '@testing-library/preact';
export * from '@testing-library/user-event';
export { render, renderHook, userEvent };
