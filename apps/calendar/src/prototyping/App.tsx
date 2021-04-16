import { h, FunctionComponent } from 'preact';

import { ViewListMap } from '@t/prototyping';
import { modules } from '@src/prototyping/modules';

import { Router, useCreateRouter } from '@src/prototyping/hooks/router';
import { Store, useCreateStore } from '@src/prototyping/hooks/store';

export type AppProps = {
  initialView: string;
  components: ViewListMap;
};

const App: FunctionComponent<AppProps> = ({ initialView, components }) => {
  const router = useCreateRouter({ initialView, components });
  const store = useCreateStore(modules);
  const ViewComponent = router.getCurrentComponent();
  const ToolbarComponent = router.getComponent('toolbar');

  return (
    <Router.Provider value={router}>
      <ToolbarComponent />
      <Store.Provider value={store}>
        <ViewComponent />
      </Store.Provider>
    </Router.Provider>
  );
};

export default App;
