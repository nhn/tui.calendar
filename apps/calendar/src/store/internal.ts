import { isFunction } from '@src/util/utils';

import {
  ClearListeners,
  EqualityChecker,
  GetState,
  InternalStoreAPI,
  SetState,
  StateListener,
  StateSelector,
  StateSliceListener,
  StateWithActions,
  StoreCreator,
  Subscribe,
} from '@t/store';

export function createStore<State extends StateWithActions>(
  storeCreator: StoreCreator<State>
): InternalStoreAPI<State> {
  let state: State;
  const listeners = new Set<StateListener<State>>();

  const setState: SetState<State> = (partial) => {
    const nextState = isFunction(partial) ? partial(state) : partial;

    if (nextState !== state) {
      const previousState = state;
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState: GetState<State> = () => state;

  const subscribeWithSelector = <StateSlice>(
    listener: StateSliceListener<StateSlice>,
    selector: StateSelector<State, StateSlice> = getState as StateSelector<State, StateSlice>,
    equalityFn: EqualityChecker<StateSlice> = Object.is
  ) => {
    let currentSlice: StateSlice = selector(state);

    const listenerWithSelector = () => {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        currentSlice = nextSlice;
        listener(currentSlice, previousSlice);
      }
    };

    listeners.add(listenerWithSelector);

    // @TODO: delete this comment after playwright branch is merged.
    // eslint-disable-next-line dot-notation
    return () => listeners.delete(listenerWithSelector);
  };

  const subscribe: Subscribe<State> = <StateSlice>(
    listener: StateListener<State> | StateSliceListener<StateSlice>,
    selector?: StateSelector<State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(
        listener as StateSliceListener<StateSlice>,
        selector,
        equalityFn
      );
    }

    listeners.add(listener as StateListener<State>);

    // eslint-disable-next-line dot-notation
    return () => listeners.delete(listener as StateListener<State>);
  };

  const clearListeners: ClearListeners = () => listeners.clear();

  const internal = { setState, getState, subscribe, clearListeners };
  state = storeCreator(setState);

  return internal;
}
