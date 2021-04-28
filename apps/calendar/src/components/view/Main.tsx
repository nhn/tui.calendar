import { h, FunctionComponent } from 'preact';

import StoreProvider from '@src/components/provider/storeProvider';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import { ViewListMap } from '@t/option';
import { RouterContext, useCreateRouter } from '@src/components/hooks/router';

type Props = {
  initialView: string;
  components: ViewListMap;
};

const store = new Store<CalendarState>({
  initStoreData: { options: {} },
  modules: [],
});

const Main: FunctionComponent<Props> = ({ initialView, components }) => {
  const router = useCreateRouter({ initialView, components });
  const ViewComponent = router.getCurrentComponent();
  const ToolbarComponent = router.getComponent('toolbar');

  return (
    <RouterContext.Provider value={router}>
      <ToolbarComponent />
      <StoreProvider store={store}>
        <ViewComponent />
      </StoreProvider>
    </RouterContext.Provider>
  );
};

export default Main;
