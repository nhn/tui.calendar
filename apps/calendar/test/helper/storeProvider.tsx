import { FunctionComponent, h } from 'preact';

import { StoreProvider } from '@src/components/provider/store';
import Store from '@src/store';

export function getStoreWrapper(store: Store): FunctionComponent {
  return function wrapper({ children }) {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  };
}
