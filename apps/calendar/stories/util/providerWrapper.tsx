import type { RenderableProps } from 'preact';
import { h } from 'preact';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { initThemeStore } from '@src/contexts/themeStore';
import type EventModel from '@src/model/eventModel';
import { EventBusImpl } from '@src/utils/eventBus';

import type { Options } from '@t/options';

const rootContainerStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
};

type Props = {
  options?: Options;
  events?: EventModel[];
};

export function ProviderWrapper({
  children,
  options: optionsUserInput = {},
  events = [],
}: RenderableProps<Props>) {
  const theme = initThemeStore();
  const store = initCalendarStore(optionsUserInput);
  const eventBus = new EventBusImpl();
  const { dispatch } = store.getState();

  dispatch.options.setOptions(optionsUserInput);
  dispatch.calendar.clearEvents();

  if (events.length) {
    dispatch.calendar.createEvents(events);
  }

  return (
    <CalendarContainer theme={theme} store={store} eventBus={eventBus}>
      <div style={rootContainerStyle}>{children}</div>
    </CalendarContainer>
  );
}
