import type {
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

  const setState: SetState<State> = (partialStateCreator) => {
    const nextState = partialStateCreator(state);

    if (nextState !== state) {
      const previousState = state;
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState: GetState<State> = () => state;

  const subscribe: Subscribe<State> = <StateSlice>(
    listener: StateListener<State> | StateSliceListener<StateSlice>,
    selector?: StateSelector<State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ) => {
    let _listener = listener;

    if (selector) {
      let currentSlice: StateSlice = selector(state);
      const _equalityFn = equalityFn ?? Object.is;
      _listener = () => {
        const nextSlice = selector(state);
        if (!_equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          currentSlice = nextSlice;
          (listener as StateSliceListener<StateSlice>)(currentSlice, previousSlice);
        }
      };
    }

    listeners.add(_listener as StateListener<State>);

    // eslint-disable-next-line dot-notation
    return () => listeners.delete(_listener as StateListener<State>);
  };

  const clearListeners = () => listeners.clear();

  const internal = { setState, getState, subscribe, clearListeners };
  state = storeCreator(setState, getState, internal);

  return internal;
}
