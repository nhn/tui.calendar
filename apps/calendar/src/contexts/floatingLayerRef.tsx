import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { isUndefined } from '@src/utils/type';

export const FloatingLayerContainerContext = createContext<HTMLDivElement | null>(null);

export const FloatingLayerContainerProvider = FloatingLayerContainerContext.Provider;

export const useFloatingLayerContainer = () => {
  const ref = useContext(FloatingLayerContainerContext);

  if (isUndefined(ref)) {
    throw new Error('FloatingLayerContainerProvider is not found');
  }

  return ref;
};
