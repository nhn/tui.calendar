import { ModuleKeys, PayloadActions } from '@t/store';

export function filterActions(actions: PayloadActions, name?: string) {
  return Object.keys(actions).reduce(
    (acc, ns) => (ns === name ? { ...acc, [ns]: actions[ns] } : acc),
    {}
  );
}

export function getState(state: Record<string, any>, names?: ModuleKeys | ModuleKeys[]) {
  if (!state) {
    throw new Error('You should pass store instance using useCreateStore.');
  }

  if (typeof names === 'string') {
    if (!Object.keys(state).includes(names)) {
      throw new Error(
        `It is not a registered ${names} module. Please register the module to be used when using 'useCreateStore'.`
      );
    }

    return state[names];
  }

  if (Array.isArray(names)) {
    return names.reduce(
      (acc, name) => ({
        ...acc,
        [name]: state[name],
      }),
      {}
    );
  }

  return state;
}

export function getActions(actions: PayloadActions, names?: ModuleKeys | ModuleKeys[]) {
  if (!actions) {
    throw new Error('You should pass store instance using useCreateStore.');
  }

  if (typeof names === 'string') {
    if (!Object.keys(actions).includes(names)) {
      return {};
    }

    return actions[names];
  }

  if (Array.isArray(names)) {
    return names.reduce(
      (acc, name) => ({
        ...acc,
        ...filterActions(actions, name),
      }),
      {}
    );
  }

  return actions;
}
