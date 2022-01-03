import { createContext, RefObject } from 'preact';
import { useContext } from 'preact/hooks';

import { isUndefined } from '@src/utils/type';

export const LayoutContainerRefContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const LayoutContainerRefProvider = LayoutContainerRefContext.Provider;

export const useLayoutContainerRef = () => {
  const ref = useContext(LayoutContainerRefContext);

  if (isUndefined(ref)) {
    throw new Error('LayoutContainerRefProvider is not found');
  }

  return ref;
};
