import {
  Action,
  ActionFunc,
  FlattenActions,
  InitStoreData,
  PayloadActions,
  StoreModule,
} from '@t/store';
import { deepCopy, forEach } from '@src/util/utils';
import { StateUpdater } from 'preact/hooks';

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
    const { name, actions } = module;

    if (module.state) {
      const state =
        typeof module.state === 'function' ? module.state(this.initStoreData) : module.state;
      this.state = { ...this.state, [name]: state };
    }
    if (actions) {
      forEach(actions, (action, actionName) => {
        this.setFlattenActionMap(`${name}/${actionName}`, action);
        this.setPayloadAction(name, actionName);
      });
    }
  }

  setPayloadAction(name: string, actionName: string) {
    if (!this.actions[name]) {
      this.actions[name] = {};
    }

    this.actions[name][actionName] = (payload?: any) => {
      const actionType = `${name}/${actionName}` as keyof FlattenActions;

      this.dispatch(actionType, payload);
    };
  }

  setFlattenActionMap(actionType: string, actionFn: ActionFunc) {
    this.flattenActionMap[actionType] = actionFn;
  }

  dispatch(actionType: keyof FlattenActions, payload?: any) {
    if (!Object.keys(this.flattenActionMap).includes(actionType)) {
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
