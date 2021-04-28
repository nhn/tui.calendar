import { h, FunctionComponent } from 'preact';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import { StoreContext, useCreateStore } from '@src/components/hooks/store';

interface Props {
  store: Store<CalendarState>;
}

const StoreProvider: FunctionComponent<Props> = ({ children, store }) => {
  const state = useCreateStore(store);

  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
