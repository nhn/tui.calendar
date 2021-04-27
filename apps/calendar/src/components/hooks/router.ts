import { ViewListMap } from '@t/option';
import { createContext, ComponentType } from 'preact';
import { useCallback, useContext, useState } from 'preact/hooks';

type Props = {
  initialView: string;
  components: ViewListMap;
};

type RouterContext = {
  viewName: string;
  components: ViewListMap;
  getComponent: (rounterKey: string) => ComponentType;
  getCurrentComponent: () => ComponentType;
  goto: (viewName: string) => void;
};

export const Router = createContext<RouterContext>({
  viewName: '',
} as RouterContext);

export function useCreateRouter({ initialView, components }: Props): RouterContext {
  const [viewName, setViewName] = useState(initialView);
  const getComponent = useCallback((routerKey: string) => components[routerKey].component, [
    components,
  ]);
  const getCurrentComponent = useCallback(() => components[viewName].component, [
    components,
    viewName,
  ]);
  const goto = useCallback((newViewName: string) => setViewName(newViewName), []);

  return {
    viewName,
    components,
    getComponent,
    getCurrentComponent,
    goto,
  };
}

export function useRouter() {
  return useContext(Router);
}
