import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { isUndefined } from '@src/utils/type';

const LayoutContainerContext = createContext<HTMLDivElement | null>(null);

export const LayoutContainerProvider = LayoutContainerContext.Provider;

export const useLayoutContainer = () => {
  const ref = useContext(LayoutContainerContext);

  if (isUndefined(ref)) {
    throw new Error('LayoutContainerProvider is not found');
  }

  return ref;
};
