import { h, RenderableProps } from 'preact';
import Provider from '@src/components/provider';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import template from '@src/modules/template';
import theme from '@src/modules/theme';
import layerPopup from '@src/modules/layerPopup';
import { cls } from '@src/util/cssHelper';
import options from '@src/modules/options';
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
};

export function ProviderWrapper({
  children,
  options: optionsUseInput = {},
}: RenderableProps<Props>) {
  const store = createStore(optionsUseInput);

  return (
    <div className={cls('layout')} style={style}>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}

function createStore(optionsUseInput: Options) {
  return new Store<CalendarState>({
    initStoreData: { options: optionsUseInput },
    modules: [template, theme, options, layerPopup],
  });
}
