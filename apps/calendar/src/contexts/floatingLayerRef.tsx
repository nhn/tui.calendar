import { createContext, FunctionComponent, h } from 'preact';
import { useContext } from 'preact/hooks';

import { cls } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/domNode';
import { isUndefined } from '@src/utils/type';

const FloatingLayerContainerContext = createContext<HTMLDivElement | null>(null);

export const FloatingLayerContainerProvider: FunctionComponent = ({ children }) => {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();

  return (
    <FloatingLayerContainerContext.Provider value={container}>
      {children}
      <div ref={containerRefCallback} className={cls('floating-layer')} />
    </FloatingLayerContainerContext.Provider>
  );
};

export const useFloatingLayerContainer = () => {
  const ref = useContext(FloatingLayerContainerContext);

  if (isUndefined(ref)) {
    throw new Error('FloatingLayerContainerProvider is not found');
  }

  return ref;
};
