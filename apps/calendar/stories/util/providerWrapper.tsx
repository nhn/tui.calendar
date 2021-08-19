import { h, RenderableProps } from 'preact';

import { ThemeProvider } from '@src/components/provider/theme';
import Schedule from '@src/model/schedule';
import { initializeStore, StoreProvider } from '@src/store';
import Theme from '@src/theme';
import { cls } from '@src/util/cssHelper';

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
  events?: Schedule[];
};

export function ProviderWrapper({
  children,
  options: optionsUserInput = {},
  events = [],
}: RenderableProps<Props>) {
  const theme = new Theme();
  const store = initializeStore();
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
