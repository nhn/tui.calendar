import { Ref, useCallback, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';

// @TODO: merge 'usePanel' hooks after apply layout component to month component
export function usePanelContainer(containerRef: Ref<HTMLDivElement>, selector: string) {
  const [panel, setPanel] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const panelContainer: HTMLElement | null = containerRef.current.querySelector(
        `${cls('.panel')}${selector}`
      );

      if (panelContainer) {
        setPanel(panelContainer);
      }
    }
  }, [containerRef, selector]);

  return panel;
}

export function usePanel(selector: string) {
  const [panel, setPanel] = useState<HTMLElement | null>(null);

  const containerRefCallback = useCallback(
    (ref: HTMLElement) => {
      if (ref) {
        const panelContainer: HTMLElement | null = ref.querySelector(`${selector}`);

        if (panelContainer) {
          setPanel(panelContainer);
        }
      }
    },
    [selector]
  );

  return { panel, containerRefCallback };
}
