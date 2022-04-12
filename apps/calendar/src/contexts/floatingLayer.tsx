import { createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import {
  EVENT_DETAIL_POPUP_SLOT_CLASS_NAME,
  EVENT_FORM_POPUP_SLOT_CLASS_NAME,
  SEE_MORE_POPUP_SLOT_CLASS_NAME,
} from '@src/constants/popup';
import { cls } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { isUndefined } from '@src/utils/type';

import type { PropsWithChildren } from '@t/components/common';

interface FloatingLayers {
  container: HTMLDivElement | null;
  seeMorePopupSlot: HTMLDivElement | null;
  formPopupSlot: HTMLDivElement | null;
  detailPopupSlot: HTMLDivElement | null;
}

type FloatingLayerType = keyof FloatingLayers;

const FloatingLayerContext = createContext<FloatingLayers | null>(null);

export function FloatingLayerProvider({ children }: PropsWithChildren) {
  const [containerRef, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const [seeMorePopupSlotRef, seeMorePopupSlotRefCallback] = useDOMNode<HTMLDivElement>();
  const [formPopupSlotRef, formPopupSlotRefCallback] = useDOMNode<HTMLDivElement>();
  const [detailPopupSlotRef, detailPopupSlotRefCallback] = useDOMNode<HTMLDivElement>();

  const floatingLayer = {
    container: containerRef,
    seeMorePopupSlot: seeMorePopupSlotRef,
    formPopupSlot: formPopupSlotRef,
    detailPopupSlot: detailPopupSlotRef,
  };

  return (
    <FloatingLayerContext.Provider value={floatingLayer}>
      {children}
      <div ref={containerRefCallback} className={cls('floating-layer')}>
        <div ref={seeMorePopupSlotRefCallback} className={SEE_MORE_POPUP_SLOT_CLASS_NAME} />
        <div ref={formPopupSlotRefCallback} className={EVENT_FORM_POPUP_SLOT_CLASS_NAME} />
        <div ref={detailPopupSlotRefCallback} className={EVENT_DETAIL_POPUP_SLOT_CLASS_NAME} />
      </div>
    </FloatingLayerContext.Provider>
  );
}

export const useFloatingLayer = (floatingLayerType: FloatingLayerType) => {
  const floatingLayers = useContext(FloatingLayerContext);

  if (isUndefined(floatingLayers)) {
    throw new Error('FloatingLayerProvider is not found');
  }

  return floatingLayers?.[floatingLayerType] ?? null;
};
