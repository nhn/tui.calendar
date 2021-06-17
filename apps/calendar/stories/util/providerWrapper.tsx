import { h, RenderableProps } from 'preact';
import Provider from '@src/components/provider';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import { cls } from '@src/util/cssHelper';
import { Options } from '@t/option';
import { template, layerPopup, options, dataStore, grid } from '@src/modules';
import Schedule from '@src/model/schedule';
import Theme from '@src/theme';
import { ThemeProvider } from '@src/components/provider/theme';

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
  store.dispatch('dataStore/clearSchedules', { events });

  if (events.length) {
    store.dispatch('dataStore/createSchedules', { events });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={cls('layout')} style={style}>
        <Provider store={store}>{children}</Provider>
      </div>
    </ThemeProvider>
  );
}

export function createStore(optionsUseInput: Options) {
  return new Store<CalendarState>({
    initStoreData: { options: optionsUseInput },
    modules: [template, options, dataStore, layerPopup, grid],
  });
}
