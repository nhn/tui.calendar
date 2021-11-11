import { h, RenderableProps } from 'preact';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { ThemeProvider } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import EventModel from '@src/model/eventModel';
import Theme from '@src/theme';

import { Options } from '@t/option';

const style = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 5,
  top: 5,
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
  store.debug();
  const { dispatch } = store.getState();

  dispatch.option.setOptions(optionsUserInput);
  dispatch.calendar.clearEvents();

  if (events.length) {
    dispatch.calendar.createEvents(events);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={cls('layout')} style={style}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </div>
    </ThemeProvider>
  );
}
