import { createContext, createElement, FunctionComponent } from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';

import { EqualityChecker, StateSelector, StateWithActions, StoreHooks, UseStore } from '@t/store';

export function createStoreContext<State extends StateWithActions>() {
  type StoreContextType = StoreHooks<State>;
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
    const storeCtx = useContext(StoreContext);

    if (!storeCtx?.useStore) {
      throw new Error('StoreProvider is not found');
    }

    // we cannot call `storeCtx.useStore` in condition because it violates the rules of hook.
    // `selector` type should be `StateSelector<State, StateSlice>`
    // but TS cannot infer the type of `selector` clearly.
    return storeCtx.useStore(selector as StateSelector<State, State>, equalityFn);
  };

  /**
   * For handling often occurring state changes (Transient updates)
   * See more: https://github.com/pmndrs/zustand/blob/master/readme.md#transient-updates-for-often-occuring-state-changes
   */
  const useInternalStore = () => {
    const storeCtx = useContext(StoreContext);

    if (!storeCtx) {
      throw new Error('StoreProvider is not found');
    }

    return useMemo(() => storeCtx.internalStore, [storeCtx]);
  };

  return {
    Provider,
    useStore,
    useInternalStore,
  };
}
