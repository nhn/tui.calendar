import { theme, template, options } from '@src/modules';
import Store from '@src/store/store';
import { Options } from './option';

type InitStoreData = {
  options: Options;
};

type ActionParam = {
  type: string;
  payload?: any;
};

interface Action {
  [key: string]: ActionFunc;
}

type ActionFunc = (state: any, payload: any, store: Store) => any;

type StateFunc = (initStoreData: InitStoreData) => any;
type State = Record<string, any> | StateFunc;

interface StoreModule {
  name: string;
  state: State;
  actions?: Action;
}

type GetStateType<T> = T extends (...args: any) => infer R ? R : T;

interface PayloadActionsType {
  [key: string]: (payload: any) => any;
}

type ModuleKeys = keyof ModuleMap;

type PayloadActions = Record<string, Record<string, (payload: any) => void>>;

type PayloadModuleActions<A> = {
  [N in keyof A]: A[N] extends (...args: any) => any
    ? undefined extends Parameters<A[N]>[1]
      ? () => void
      : (payload: Parameters<A[N]>[1]) => void
    : never;
};

type Reducer<S> = (state: S, action: (action: ActionParam) => void) => S;

declare global {
  interface ModuleMap {
    options: typeof options;
    template: typeof template;
    theme: typeof theme;
  }
}

type CalendarState = {
  [key in keyof ModuleMap]: 'state' extends keyof ModuleMap[key]
    ? GetStateType<ModuleMap[key]['state']>
    : never;
};

type CalendarActions = {
  [key in keyof ModuleMap]: 'actions' extends keyof ModuleMap[key] ? ModuleMap[key]['actions'] : {};
};

type ModulePayloadActionMap = {
  [key in keyof CalendarActions]: PayloadModuleActions<CalendarActions[key]>;
};
