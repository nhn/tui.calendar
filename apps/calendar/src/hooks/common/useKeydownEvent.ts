import { useEffect, useRef } from 'preact/hooks';

import type { KEY } from '@src/constants/keyboard';
import { isKeyPressed } from '@src/utils/keyboard';

export function useKeydownEvent(targetKey: KEY, handler: (event: KeyboardEvent) => void): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, targetKey)) {
        handlerRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [targetKey]);
}
