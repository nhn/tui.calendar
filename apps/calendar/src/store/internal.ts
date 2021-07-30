import { isFunction } from '@src/util/utils';

/**
 * Inspired by Zustand
 *
 * See more: https://github.com/pmndrs/zustand
 */

export type StateWithActions = Record<string, any>;

type PartialState<State extends StateWithActions, Key extends keyof State = keyof State> =
  | Pick<State, Key>
  | State;

type PartialStateFn<State extends StateWithActions, Key extends keyof State = keyof State> = (
  state: State
) => Pick<State, Key> | State;

export type StateSelector<State extends StateWithActions, SelectedState> = (
  state: State
) => SelectedState;

export type EqualityChecker<State> = (state: State, newState: State) => boolean;

type StateListener<State> = (state: State, previousState: State) => void;

type StateSliceListener<StateSlice> = (slice: StateSlice, previousSlice: StateSlice) => void;

type SetState<State extends StateWithActions> = <Key extends keyof State>(
  partial: PartialState<State, Key> | PartialStateFn<State, Key>
) => void;

type GetState<State extends StateWithActions> = () => State;

type Unsubscribe = () => void;

interface Subscribe<State extends StateWithActions> {
  (listener: StateListener<State>): Unsubscribe;

  <StateSlice>(
    listener: StateSliceListener<StateSlice>,
    selector?: StateSelector<State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ): Unsubscribe;
}

type ClearListeners = () => void;

export interface InternalStoreAPI<State extends StateWithActions> {
  setState: SetState<State>;
  getState: GetState<State>;
  subscribe: Subscribe<State>;
  clearListeners: ClearListeners;
}

export type StoreCreator<State extends StateWithActions> = (set: SetState<State>) => State;

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
