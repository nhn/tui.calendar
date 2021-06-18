import { h, FunctionComponent } from 'preact';

import { StoreProvider } from '@src/components/provider/store';
import Store from '@src/store';
import { RouterContext, useCreateRouter } from '@src/components/hooks/router';
import ToolbarContainer from '@src/components/toolbar/toolbarContainer';
import ViewContainer from '@src/components/view/viewContainer';
import { ViewListMap } from '@t/option';
import { ThemeProvider } from '@src/components/provider/theme';
import Theme from '@src/theme';

type Props = {
  initialView: string;
  components: ViewListMap;
  store: Store;
};

// @TODO: Main component should be able to share the store and the theme to the other sub-calendars(Month, Week, Day, etc.)
const Main: FunctionComponent<Props> = ({ initialView, components, store }) => {
  const router = useCreateRouter({ initialView, components });
  const theme = new Theme();

  return (
    <ThemeProvider theme={theme}>
      <RouterContext.Provider value={router}>
        <ToolbarContainer />
        <StoreProvider store={store}>
          <ViewContainer />
        </StoreProvider>
      </RouterContext.Provider>
    </ThemeProvider>
  );
};

export default Main;
