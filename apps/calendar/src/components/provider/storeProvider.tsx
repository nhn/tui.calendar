import { h, FunctionComponent } from 'preact';
import Store from '@src/store/store';
import { CalendarState } from '@t/store';
import { StoreContext, useCreateStore } from '@src/components/hooks/store';

interface Props {
  store: Store<CalendarState>;
}

const StoreProvider: FunctionComponent<Props> = (props) => {
  const { children, store } = props;
  const state = useCreateStore(store);

  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
