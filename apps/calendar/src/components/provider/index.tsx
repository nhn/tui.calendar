import { h, FunctionComponent } from 'preact';

import Store from '@src/store';
import { StoreContext, useCalendarState } from '@src/components/hooks/store';

import { CalendarState } from '@t/store';
interface Props {
  store: Store<CalendarState>;
}

const Provider: FunctionComponent<Props> = ({ children, store }) => {
  const state = useCalendarState(store);

  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
};

export default Provider;
