import { ViewListMap } from '@t/option';
import { createContext, ComponentType } from 'preact';
import { useContext, useState } from 'preact/hooks';

type Props = {
  initialView: string;
  components: ViewListMap;
};

type Router = {
  viewName: string;
  components: ViewListMap;
  getComponent: (rounterKey: string) => ComponentType;
  getCurrentComponent: () => ComponentType;
  goto: (viewName: string) => void;
};

export const RouterContext = createContext<Router | null>(null);

export function useCreateRouter({ initialView, components }: Props): Router {
  const [viewName, setViewName] = useState(initialView);
  const getComponent = (routerKey: string) => {
    if (!components[routerKey]) {
      throw new TypeError(`The routerKey '${routerKey}' is not valid.`);
    }

    return components[routerKey].component;
  };
  const getCurrentComponent = () => components[viewName].component;
  const goto = (newViewName: string) => setViewName(newViewName);

  return {
    viewName,
    components,
    getComponent,
    getCurrentComponent,
    goto,
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
