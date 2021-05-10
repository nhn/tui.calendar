import { h, FunctionComponent } from 'preact';

import Provider from '@src/components/provider';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import { ViewListMap } from '@t/option';
import { RouterContext, useCreateRouter } from '@src/components/hooks/router';
import ToolbarContainer from '@src/components/toolbar/toolbarContainer';
import ViewContainer from '@src/components/view/viewContainer';
import { layerPopup } from '@src/modules/layerPopup';
import template from '@src/modules/template';
import theme from '@src/modules/theme';

type Props = {
  initialView: string;
  components: ViewListMap;
};

const store = new Store<CalendarState>({
  initStoreData: { options: {} },
  modules: [template, theme, layerPopup],
});

const Main: FunctionComponent<Props> = ({ initialView, components }) => {
  const router = useCreateRouter({ initialView, components });

  return (
    <RouterContext.Provider value={router}>
      <ToolbarContainer />
      <Provider store={store}>
        <ViewContainer />
      </Provider>
    </RouterContext.Provider>
  );
};

export default Main;
