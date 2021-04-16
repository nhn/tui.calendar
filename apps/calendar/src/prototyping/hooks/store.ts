import { createContext } from 'preact';
import { useContext, useReducer } from 'preact/hooks';

import { Modules } from '@src/prototyping/modules';
import {
  InitStoreData,
  CalendarAction,
  CalendarState,
  ValueOf,
  GetStateType,
} from '@t/prototyping';

type ModuleKeys = keyof CalendarState;

export type ActionFn<S> = (state: S, payload: any, rootState?: RootStore) => S;

export type ActionParam = {
  type: string;
  payload?: any;
};

type StateObject<T> = ((initStoreData?: InitStoreData) => T) | T;

export type RootStore = {
  state: CalendarState;
  actions: Record<string, ActionFn<ValueOf<CalendarState>>>;
};

function getNamespace(actionName: string) {
  return actionName.split('/')[0];
}

function filterActions(actions: Record<ModuleKeys, (payload?: any) => void>, namespace?: string) {
  const namespaces = Object.keys(actions) as ModuleKeys[];

  return namespaces.reduce<Record<string, (payload?: any) => void>>(
    (acc, ns) => (ns === namespace ? { ...acc, [ns]: actions[ns] } : acc),
    {}
  );
}

export const Store = createContext<StoreContext>({
  state: {} as StateMap,
  actions: {},
});

export function getState<T extends ValueOf<CalendarState>>(
  state: StateObject<T>,
  initStoreData?: InitStoreData
): T {
  if (typeof state === 'function') {
    return state(initStoreData ?? { options: {} });
  }

  if (typeof state === 'object') {
    return state;
  }

  throw new Error('The type of state must be a function or an object.');
}

function getNamespaceActionName<NS extends string, A extends string>(namespace: NS, actionName: A) {
  return `${namespace}/${actionName}` as `${NS}/${A}`;
}

type StateMapper<S extends keyof CalendarState> = CalendarState[S];
type ActionMapper<A extends keyof CalendarAction> = CalendarAction[A];

type StateType<NS> = NS extends keyof CalendarState ? StateMapper<NS> : never;
type ActionType<NS> = NS extends keyof CalendarAction ? ActionMapper<NS> : never;

type StateMap = {
  [key in keyof CalendarState]: StateType<key>;
};

type RootActionsMap<T extends string> = {
  [key in `${T}/${string}`]: ActionFn<StateType<T>>;
};

type ModuleMap = {
  [key in keyof Modules]: ModuleDefineType<Modules[key]['state'], CalendarAction[key]>;
};

type ModuleDefineType<S, A> = {
  namespace: string;
  state: S;
  actions: A;
};

function getActions<T>(actions: ActionType<T>, namespace: string) {
  return Object.keys(actions).reduce<RootActionsMap<typeof namespace>>((acc, actionName) => {
    return {
      ...acc,
      [getNamespaceActionName(namespace, actionName)]: actions[actionName as keyof ActionType<T>],
    };
  }, {});
}

function makeRootStore(modules: ModuleMap) {
  const moduleKeys = Object.keys(modules) as (keyof Modules)[];

  return moduleKeys.reduce<RootStore>(
    (acc, key) => {
      const { namespace, actions, state } = modules[key];

      return {
        state: { ...acc.state, [namespace]: getState<GetStateType<typeof state>>(state) },
        actions: {
          ...acc.actions,
          ...getActions(actions as ActionType<typeof namespace>, namespace),
        },
      };
    },
    { state: {} as CalendarState, actions: {} }
  );
}

function makeReducer(rootStore: RootStore) {
  return (state: CalendarState, action: ActionParam) => {
    const { type, payload } = action;
    const ns = getNamespace(type) as keyof CalendarState;
    const nextState = rootStore.actions[type](state[ns], payload, rootStore);

    return { ...state, [ns]: nextState };
  };
}

function makeActions(modules: Modules, dispatch: (action: ActionParam) => void) {
  return (Object.keys(modules) as ModuleKeys[]).reduce((acc, moduleName) => {
    const { namespace, actions } = modules[moduleName];

    return {
      ...acc,
      [namespace]: Object.keys(actions).reduce((accel, actionName) => {
        return {
          ...accel,
          [actionName]: (payload: any) =>
            dispatch({ type: getNamespaceActionName(namespace, actionName), payload }),
        };
      }, {}),
    };
  }, {});
}

type StoreContext = {
  state: CalendarState;
  actions: Record<string, (payload?: any) => void>;
};

export function useCreateStore(modules: Modules): StoreContext {
  const rootStore = makeRootStore(modules);

  const [state, dispatch] = useReducer(makeReducer(rootStore), rootStore.state);

  const actions = makeActions(modules, dispatch);

  return {
    state,
    actions,
  };
}

type PayloadActionFn<A> = {
  [key in keyof A]: A[key] extends (state: any, payload: infer P) => infer R
    ? undefined extends P
      ? () => R
      : (payload: P) => R
    : never;
};

type ModulePayloadActionMap = {
  [key in keyof CalendarAction]: PayloadActionFn<CalendarAction[key]>;
};

export function useStore(): { state: CalendarState; actions: ModulePayloadActionMap };
export function useStore(
  namesace: ModuleKeys[]
): { state: Partial<CalendarState>; actions: Partial<ModulePayloadActionMap> };
export function useStore<T extends ModuleKeys>(
  namespace: T
): { state: StateType<T>; actions: PayloadActionFn<ActionType<T>> };
export function useStore<T>(
  namespaces?: ModuleKeys | ModuleKeys[]
):
  | { state: CalendarState; actions: ModulePayloadActionMap }
  | { state: Partial<CalendarState>; actions: Partial<ModulePayloadActionMap> }
  | { state: StateType<T>; actions: PayloadActionFn<ActionType<T>> } {
  const { state: rootState, actions: rootActions } = useContext(Store);

  if (typeof namespaces === 'string') {
    return {
      state: rootState[namespaces],
      actions: { ...filterActions(rootActions, namespaces)[namespaces] },
    } as { state: StateType<T>; actions: PayloadActionFn<ActionType<T>> };
  }

  if (Array.isArray(namespaces)) {
    return namespaces.reduce<{
      state: Partial<CalendarState>;
      actions: Partial<ModulePayloadActionMap>;
    }>(
      (acc, namespace) => {
        return {
          state: { ...acc.state, [namespace]: rootState[namespace] },
          actions: { ...acc.actions, ...filterActions(rootActions, namespace) },
        };
      },
      { state: {}, actions: {} }
    );
  }

  return {
    state: rootState,
    actions: rootActions,
  };
}
