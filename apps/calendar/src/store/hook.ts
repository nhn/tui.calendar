import { useEffect, useLayoutEffect, useReducer, useRef } from 'preact/hooks';

import { createStore } from '@src/store/internal';
import { isUndefined } from '@src/util/utils';

import { EqualityChecker, StateSelector, StateWithActions, StoreCreator, UseStore } from '@t/store';

/**
 * Inspired by Zustand
 *
 * See more: https://github.com/pmndrs/zustand
 */

const isSSR = isUndefined(window) || !window.navigator;

const useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

export function createStoreHook<State extends StateWithActions>(
  storeCreator: StoreCreator<State>
): UseStore<State> {
  const internalStore = createStore(storeCreator);

  const useStore = <StateSlice>(
    selector: StateSelector<State, StateSlice> = internalStore.getState as StateSelector<
      State,
      StateSlice
    >,
    equalityFn: EqualityChecker<StateSlice> = Object.is
  ) => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0) as [never, () => void];

    const state = internalStore.getState();
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
          const nextState = internalStore.getState();
          const nextStateSlice = selectorRef.current(nextState);

          const shouldUpdateState = !equalityFnRef.current(
            currentSliceRef.current as StateSlice,
            nextStateSlice
          );
          if (shouldUpdateState) {
            stateRef.current = nextState;
            currentSliceRef.current = newStateSlice;

            forceUpdate();
          }
        } catch (e) {
          // This will be rarely happened, unless we don't pass the arguments to actions properly.
          // eslint-disable-next-line no-console
          console.error('[toastui-calendar] failed to update state', e.message);
          hasErrorRef.current = true;
          forceUpdate();
        }
      };

      const unsubscribe = internalStore.subscribe(listener);
      if (internalStore.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }

      return unsubscribe;
    }, []);

    return hasNewStateSlice ? (newStateSlice as StateSlice) : currentSliceRef.current;
  };

  Object.assign(useStore, internalStore);

  return useStore as UseStore<State>;
}
