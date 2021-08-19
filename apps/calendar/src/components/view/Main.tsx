import { FunctionComponent, h } from 'preact';

import { RouterContext, useCreateRouter } from '@src/components/hooks/router';
import { ThemeProvider } from '@src/components/provider/theme';
import ToolbarContainer from '@src/components/toolbar/toolbarContainer';
import ViewContainer from '@src/components/view/viewContainer';
import { StoreProvider } from '@src/store';
import Theme from '@src/theme';

import { ViewListMap } from '@t/option';
import { CalendarStore, InternalStoreAPI } from '@t/store';

type Props = {
  initialView: string;
  components: ViewListMap;
  store: InternalStoreAPI<CalendarStore>;
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
