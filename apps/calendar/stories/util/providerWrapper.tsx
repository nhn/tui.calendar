import { h, RenderableProps } from 'preact';

import { CalendarContainer } from '@src/calendarContainer';
import { initCalendarStore } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import Theme from '@src/theme';

import { Options } from '@t/options';

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
  const theme = new Theme();
  const store = initCalendarStore(optionsUserInput);
  const { dispatch } = store.getState();

  dispatch.options.setOptions(optionsUserInput);
  dispatch.calendar.clearEvents();

  if (events.length) {
    dispatch.calendar.createEvents(events);
  }

  return (
    <CalendarContainer theme={theme} store={store}>
      <div style={rootContainerStyle}>{children}</div>
    </CalendarContainer>
  );
}
