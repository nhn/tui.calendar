import { useEffect, useRef } from 'preact/hooks';

/**
 * Check the condition and call the callback if the condition is true.
 * callback is always referencing the latest value
 * so that it doesn't have to register all values in the callback as deps to useEffect.
 */
export function useWhen(callback: () => void, condition: boolean) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const invoke = () => callbackRef.current();

    if (condition) {
      invoke();
    }
  }, [condition]);
}
