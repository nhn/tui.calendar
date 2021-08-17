import { StateUpdater } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/store/calendar';
import { createStoreContext } from '@src/store/context';
import { createStoreHook } from '@src/store/hook';
import { createOptionDispatchers, createOptionSlice } from '@src/store/options';
import { createPopupDispatchers, createPopupSlice } from '@src/store/popup';
import { createTemplateSlice } from '@src/store/template';
import {
  createWeekViewLayoutDispatchers,
  createWeekViewLayoutSlice,
} from '@src/store/weekViewLayout';
import { deepCopy, forEach, includes } from '@src/util/utils';

import {
  Action,
  ActionFunc,
  CalendarStore,
  FlattenActions,
  InitStoreData,
  PayloadActions,
  StoreCreator,
  StoreModule,
} from '@t/store';

interface StoreProps {
  modules: StoreModule[];
  initStoreData: InitStoreData;
}

class Store<State extends Record<string, any> = any> {
  state = {} as State;

  initStoreData!: InitStoreData;

  flattenActionMap: Action = {};

  actions: PayloadActions = {};

  stateUpdater: StateUpdater<State> | null = null;

  constructor({ modules, initStoreData }: StoreProps) {
    this.initStoreData = deepCopy(initStoreData);

    modules.forEach((module) => this.setModule(module));
  }

  setStateUpdater(stateUpdater: StateUpdater<State>) {
    this.stateUpdater = stateUpdater;
  }

  setState(state: State) {
    this.state = state;
  }

  setModule(module: StoreModule) {
    const { name, actions = {} } = module;

    if (module.state) {
      const state =
        typeof module.state === 'function' ? module.state(this.initStoreData) : module.state;
      this.state = { ...this.state, [name]: state };
    }

    if (!this.actions[name]) {
      this.actions[name] = {};
    }

    forEach(actions, (action, actionName) => {
      this.setFlattenActionMap(`${name}/${actionName}`, action);
      this.setPayloadAction(name, actionName);
    });
  }

  setPayloadAction(name: string, actionName: string) {
    this.actions[name][actionName] = (payload?: any) => {
      const actionType = `${name}/${actionName}` as keyof FlattenActions;

      this.dispatch(actionType, payload);
    };
  }

  setFlattenActionMap(actionType: string, actionFn: ActionFunc) {
    this.flattenActionMap[actionType] = actionFn;
  }

  dispatch(actionType: keyof FlattenActions, payload?: any) {
    if (!includes(Object.keys(this.flattenActionMap), actionType)) {
      throw new TypeError(`Action type '${actionType}' is not valid.`);
    }

    const [name] = actionType.split('/');
    const nextState = this.flattenActionMap[actionType](this.state[name], payload, this);

    if (!this.state[name]) {
      throw new Error(`The ${name} does not exist.`);
    }

    this.state = { ...this.state, [name]: nextState };

    if (this.stateUpdater) {
      this.stateUpdater(this.state);
    }
  }
}

export default Store;

const storeCreator: StoreCreator<CalendarStore> = (set) => {
  return {
    ...createOptionSlice(),
    ...createTemplateSlice(),
    ...createPopupSlice(),
    ...createWeekViewLayoutSlice(),
    ...createCalendarSlice(),
    dispatch: {
      option: createOptionDispatchers(set),
      popup: createPopupDispatchers(set),
      weekViewLayout: createWeekViewLayoutDispatchers(set),
      calendar: createCalendarDispatchers(set),
    },
  };
};

export const initializeStore = () => createStoreContext(() => createStoreHook(storeCreator));
