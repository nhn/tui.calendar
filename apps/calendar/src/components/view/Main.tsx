import { h, FunctionComponent } from 'preact';

import Provider from '@src/components/provider';
import Store from '@src/store';
import { RouterContext, useCreateRouter } from '@src/components/hooks/router';
import ToolbarContainer from '@src/components/toolbar/toolbarContainer';
import ViewContainer from '@src/components/view/viewContainer';
import { ViewListMap } from '@t/option';

type Props = {
  initialView: string;
  components: ViewListMap;
  store: Store;
};

const Main: FunctionComponent<Props> = ({ initialView, components, store }) => {
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
