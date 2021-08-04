import { createContext, createElement, FunctionComponent } from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';

import {
  EqualityChecker,
  StateSelector,
  StateWithActions,
  StoreCreatorHook,
  UseStore,
} from '@t/store';

export function createStoreContext<State extends StateWithActions>() {
  type StoreContextType = ReturnType<StoreCreatorHook<State>>;
  const StoreContext = createContext<StoreContextType | null>(null);

  const Provider: FunctionComponent<{
    storeCreator: () => StoreContextType;
  }> = ({ storeCreator, children }) => {
    const storeRef = useRef<StoreContextType>();

    if (!storeRef.current) {
      storeRef.current = storeCreator();
    }

    return createElement(StoreContext.Provider, { value: storeRef.current, children });
  };

  const useStore: UseStore<State> = <StateSlice>(
    selector?: StateSelector<State, StateSlice>,
    equalityFn: EqualityChecker<State> = Object.is
  ) => {
    const useProviderStore = useContext(StoreContext);

    if (!useProviderStore?.useStore) {
      throw new Error('StoreProvider is not found');
    }

    // we cannot call `useProviderStore.useStore` in condition because it violates the rules of hook.
    // `selector` type should be `StateSelector<State, StateSlice>`
    // but TS cannot infer the type of `selector` clearly.
    return useProviderStore.useStore(selector as StateSelector<State, State>, equalityFn);
  };

  const useStoreInternal = () => {
    const useProviderStore = useContext(StoreContext);

    if (!useProviderStore) {
      throw new Error('StoreProvider is not found');
    }

    return useMemo(() => useProviderStore.storeInternal, [useProviderStore]);
  };

  return {
    Provider,
    useStore,
    useStoreInternal,
  };
}
