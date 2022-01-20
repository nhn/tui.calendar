import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import { cls } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/domNode';
import { isUndefined } from '@src/utils/type';

import { PropsWithChildren } from '@t/components/common';

const FloatingLayerContainerContext = createContext<HTMLDivElement | null>(null);

export function FloatingLayerContainerProvider({ children }: PropsWithChildren) {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();

  return (
    <FloatingLayerContainerContext.Provider value={container}>
      {children}
      <div ref={containerRefCallback} className={cls('floating-layer')}>
        <div className={cls('see-more-events-popup-slot')} />
        <div className={cls('event-form-popup-slot')} />
        <div className={cls('event-detail-popup-slot')} />
      </div>
    </FloatingLayerContainerContext.Provider>
  );
}

export const useFloatingLayerContainer = () => {
  const ref = useContext(FloatingLayerContainerContext);

  if (isUndefined(ref)) {
    throw new Error('FloatingLayerContainerProvider is not found');
  }

  return ref;
};
