import { ComponentType, createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { ViewListMap } from '@t/option';

type Props = {
  initialView: string;
  components: ViewListMap;
};

export interface Router {
  viewName: string;
  components: ViewListMap;
  getComponent: (routerKey: string) => ComponentType;
  getCurrentComponent: () => ComponentType;
  go: (viewName: string) => void;
}

export const RouterContext = createContext<Router | null>(null);

export function useCreateRouter({ initialView, components }: Props): Router {
  const [viewName, setViewName] = useState(initialView);
  const getComponent = (routerKey: string) => {
    if (!components[routerKey]) {
      throw new TypeError(`The routerKey '${routerKey}' is not registered.`);
    }

    return components[routerKey].component;
  };
  const getCurrentComponent = () => components[viewName].component;
  const go = (newViewName: string) => setViewName(newViewName);

  return {
    viewName,
    components,
    getComponent,
    getCurrentComponent,
    go,
  };
}

export function useRouter() {
  const router = useContext(RouterContext);

  if (!router) {
    throw new TypeError(
      'There is no value provided in RouterContext. Create a value with useCreateRouter.'
    );
  }

  return router;
}
