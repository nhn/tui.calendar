import { h, FunctionComponent } from 'preact';
import Store from '@src/store';
import { StoreProvider } from '@src/components/provider/store';

export function getStoreWrapper(store: Store): FunctionComponent {
  return function wrapper({ children }) {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  };
}
