import { h, RenderableProps } from 'preact';

import { StoreProvider } from '@src/components/provider/store';
import { ThemeProvider } from '@src/components/provider/theme';
import Schedule from '@src/model/schedule';
import { calendarData, grid, layerPopup, options, template } from '@src/modules';
import Store from '@src/store';
import Theme from '@src/theme';
import { cls } from '@src/util/cssHelper';

import { Options } from '@t/option';
import { CalendarState } from '@t/store';

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
  const store = createStore(optionsUserInput);
  store.dispatch('calendarData/clearSchedules');

  if (events.length) {
    store.dispatch('calendarData/createSchedules', events);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={cls('layout')} style={style}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </div>
    </ThemeProvider>
  );
}

export function createStore(optionsUseInput: Options) {
  return new Store<CalendarState>({
    initStoreData: { options: optionsUseInput },
    modules: [template, options, calendarData, layerPopup, grid],
  });
}
