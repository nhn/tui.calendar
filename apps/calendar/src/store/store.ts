import {
  Action,
  ActionFunc,
  InitStoreData,
  ModuleKeys,
  PayloadActions,
  StoreModule,
} from '@t/store';
import { deepCopy, forEach } from '@src/util/utils';
import { StateUpdater } from 'preact/hooks';
import { filterActions } from '@src/util/storeHelper';

interface StoreProps {
  modules: StoreModule[];
  initStoreData: InitStoreData;
}

class Store<S extends Record<string, any> = any> {
  state = {} as S;

  initStoreData!: InitStoreData;

  flattenActionMap: Action = {};

  payloadActions: PayloadActions = {};

  stateUpdater: StateUpdater<S> | null = null;

  constructor({ modules, initStoreData }: StoreProps) {
    this.initStoreData = deepCopy(initStoreData);

    modules.forEach((module) => this.setModule(module));
  }

  setStateUpdater(stateUpdater: StateUpdater<S>) {
    this.stateUpdater = stateUpdater;
  }

  getState() {
    return this.state;
  }

  setState(state: S) {
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
    if (!this.payloadActions[name]) {
      this.payloadActions[name] = {};
    }

    this.payloadActions[name][actionName] = (payload?: any) => {
      this.dispatch(`${name}/${actionName}`, payload);
    };
  }

  setFlattenActionMap(actionType: string, actionFn: ActionFunc) {
    this.flattenActionMap[actionType] = actionFn;
  }

  dispatch(actionType: string, payload?: any) {
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

  getValue(names?: ModuleKeys | ModuleKeys[]) {
    if (typeof names === 'string') {
      if (!Object.keys(this.state).includes(names)) {
        throw new Error(
          `It is not a registered ${names} module. Please register the module to be used when using 'useCreateStore'.`
        );
      }

      return {
        state: this.state[names],
        actions: this.payloadActions[names],
      };
    }

    if (Array.isArray(names)) {
      return names.reduce(
        (acc, name) => ({
          state: { ...acc.state, [name]: this.state[name] },
          actions: { ...acc.actions, ...filterActions(this.payloadActions, name) },
        }),
        { state: {}, actions: {} }
      );
    }

    return { state: this.state, actions: this.payloadActions };
  }
}

export default Store;
