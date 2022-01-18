import { useEffect, useRef } from 'preact/hooks';

export function useKeydownEvent(targetKey: string, handler: (event: KeyboardEvent) => void): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handlerRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [targetKey]);
}
