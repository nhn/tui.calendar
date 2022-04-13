import { createContext, createElement } from 'preact';
import { useContext, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'preact/hooks';

import { isNil, isUndefined } from '@src/utils/type';

import type { PropsWithChildren } from '@t/components/common';
import type { EqualityChecker, InternalStoreAPI, StateSelector, StateWithActions } from '@t/store';

/**
 * Inspired by Zustand
 *
 * See more: https://github.com/pmndrs/zustand
 */

const isSSR = isUndefined(window) || !window.navigator;
const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

export function createStoreContext<State extends StateWithActions>() {
  const StoreContext = createContext<InternalStoreAPI<State> | null>(null);

  function StoreProvider({
    children,
    store,
  }: PropsWithChildren<{ store: InternalStoreAPI<State> }>) {
    return createElement(StoreContext.Provider, { value: store, children });
  }

  const useStore = <StateSlice>(
    selector: StateSelector<State, StateSlice>,
    equalityFn: EqualityChecker<StateSlice> = Object.is
  ) => {
    const storeCtx = useContext(StoreContext);

    if (isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    }

    // a little trick to invoke re-render to notify hook consumers(usually components)
    const [, notify] = useReducer((notifyCount) => notifyCount + 1, 0) as [never, () => void];

    const state = storeCtx.getState();
    const stateRef = useRef(state);
    const selectorRef = useRef(selector);
    const equalityFnRef = useRef(equalityFn);
    const hasErrorRef = useRef(false);
    // `null` can be a valid state slice.
    const currentSliceRef = useRef<StateSlice | undefined>();

    if (isUndefined(currentSliceRef.current)) {
      currentSliceRef.current = selector(state);
    }

    let newStateSlice: StateSlice | undefined;
    let hasNewStateSlice = false;

    const shouldGetNewSlice =
      stateRef.current !== state ||
      selectorRef.current !== selector ||
      equalityFnRef.current !== equalityFn ||
      hasErrorRef.current;
    if (shouldGetNewSlice) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }

    useIsomorphicLayoutEffect(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice as StateSlice;
      }

      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      hasErrorRef.current = false;
    });

    // NOTE: There is edge case that state is changed before subscription
    const stateBeforeSubscriptionRef = useRef(state);
    useIsomorphicLayoutEffect(() => {
      const listener = () => {
        try {
          const nextState = storeCtx.getState();
          const nextStateSlice = selectorRef.current(nextState);

          const shouldUpdateState = !equalityFnRef.current(
            currentSliceRef.current as StateSlice,
            nextStateSlice
          );
          if (shouldUpdateState) {
            stateRef.current = nextState;
            currentSliceRef.current = newStateSlice;

            notify();
          }
        } catch (e: unknown) {
          // This will be rarely happened, unless we don't pass the arguments to actions properly.
          // eslint-disable-next-line no-console
          console.error('[toastui-calendar] failed to update state', (e as Error)?.message);
          hasErrorRef.current = true;
          notify();
        }
      };

      const unsubscribe = storeCtx.subscribe(listener);
      if (storeCtx.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }

      return unsubscribe;
    }, []);

    return hasNewStateSlice ? (newStateSlice as StateSlice) : currentSliceRef.current;
  };

  /**
   * For handling often occurring state changes (Transient updates)
   * See more: https://github.com/pmndrs/zustand/blob/master/readme.md#transient-updates-for-often-occuring-state-changes
   */
  const useInternalStore = () => {
    const storeCtx = useContext(StoreContext);

    if (isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    }

    return useMemo(() => storeCtx, [storeCtx]);
  };

  return {
    StoreProvider,
    useStore,
    useInternalStore,
  };
}
