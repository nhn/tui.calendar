/**
 * Brought the `zustand/devtools` module
 * from: https://github.com/pmndrs/zustand/blob/833f57ed131e94f3ed48627d4cfbf09cb9c7df03/src/middleware/devtools.ts
 */
/* eslint-disable complexity */
import type {
  GetState,
  InternalStoreAPI,
  PartialStateCreator,
  SetState,
  StateWithActions,
} from '@t/store';

const DEVTOOLS = Symbol();

type DevtoolsType = {
  prefix: string;
  subscribe: (dispatch: any) => () => void;
  unsubscribe: () => void;
  send: (action: string, state: any) => void;
  init: (state: any) => void;
  error: (payload: any) => void;
};

export type NamedSet<T extends StateWithActions> = {
  <Key extends keyof T = keyof T>(
    partial: PartialStateCreator<T, Key>,
    replace?: boolean,
    name?: string
  ): void;
};

export type StoreApiWithDevtools<T extends StateWithActions> = InternalStoreAPI<T> & {
  setState: NamedSet<T>;
  devtools?: DevtoolsType;
};

export const devtools =
  <
    S extends StateWithActions,
    CustomSetState extends SetState<S>,
    CustomGetState extends GetState<S>,
    CustomStoreApi extends InternalStoreAPI<S>
  >(
    fn: (set: NamedSet<S>, get: CustomGetState, api: CustomStoreApi) => S,
    options?:
      | string
      | {
          name?: string;
          serialize?: {
            options:
              | boolean
              | {
                  date?: boolean;
                  regex?: boolean;
                  undefined?: boolean;
                  nan?: boolean;
                  infinity?: boolean;
                  error?: boolean;
                  symbol?: boolean;
                  map?: boolean;
                  set?: boolean;
                };
          };
        }
  ) =>
  (
    set: CustomSetState,
    get: CustomGetState,
    api: CustomStoreApi & StoreApiWithDevtools<S> & { dispatch?: unknown }
  ): S => {
    let extension;
    try {
      extension =
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ ||
        (window as any).top.__REDUX_DEVTOOLS_EXTENSION__;
      // eslint-disable-next-line no-empty
    } catch {}

    if (!extension) {
      // eslint-disable-next-line no-process-env
      if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn('Please install/enable Redux devtools extension');
      }
      delete api.devtools;

      return fn(set as any, get, api);
    }
    const namedSet: NamedSet<S> = (state, replace, name) => {
      set(state as any);
      if (!api.dispatch && api.devtools) {
        api.devtools.send(api.devtools.prefix + (name || 'action'), get());
      }
    };
    api.setState = namedSet;
    const initialState = fn(namedSet, get, api);
    if (!api.devtools) {
      const savedSetState = api.setState;
      api.setState = <K1 extends keyof S = keyof S>(
        state: PartialStateCreator<S, K1>,
        replace?: boolean
      ) => {
        const newState = api.getState();
        if ((state as unknown as S) !== newState) {
          savedSetState(state, replace);
          if (state !== (newState as any)[DEVTOOLS] && api.devtools) {
            api.devtools.send(`${api.devtools.prefix}setState`, api.getState());
          }
        }
      };
      options = typeof options === 'string' ? { name: options } : options;
      const connection = (api.devtools = extension.connect({ ...options }));
      connection.prefix = options?.name ? `${options.name} > ` : '';
      connection.subscribe((message: any) => {
        if (message.type === 'ACTION' && message.payload) {
          try {
            api.setState(JSON.parse(message.payload));
          } catch (e) {
            console.error('please dispatch a serializable value that JSON.parse() support\n', e);
          }
        } else if (message.type === 'DISPATCH' && message.state) {
          const jumpState =
            message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE';
          const newState = api.getState();
          (newState as any)[DEVTOOLS] = JSON.parse(message.state);

          if (!api.dispatch && !jumpState) {
            api.setState(newState as any);
          } else if (jumpState) {
            api.setState((newState as any)[DEVTOOLS]);
          } else {
            savedSetState(newState as any);
          }
        } else if (message.type === 'DISPATCH' && message.payload?.type === 'COMMIT') {
          connection.init(api.getState());
        } else if (message.type === 'DISPATCH' && message.payload?.type === 'IMPORT_STATE') {
          const actions = message.payload.nextLiftedState?.actionsById;
          const computedStates = message.payload.nextLiftedState?.computedStates || [];

          computedStates.forEach(({ state }: { state: PartialStateCreator<S> }, index: number) => {
            const action = actions[index] || 'No action found';

            if (index === 0) {
              connection.init(state);
            } else {
              savedSetState(state);
              connection.send(action, api.getState());
            }
          });
        }
      });
      connection.init(initialState);
    }

    return initialState;
  };
