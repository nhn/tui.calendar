import type { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

export function useOnMouseDownOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (ev: MouseEvent) => void
) {
  useEffect(() => {
    const el = ref.current;

    const onMouseUpOutside = (ev: MouseEvent) => {
      if (!el || el.contains(ev.target as Node)) {
        return;
      }

      handler(ev);
    };

    if (el) {
      document.addEventListener('mousedown', onMouseUpOutside);
    }

    return () => {
      document.removeEventListener('mousedown', onMouseUpOutside);
    };
  });
}
