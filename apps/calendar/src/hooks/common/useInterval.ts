import { useEffect, useRef } from 'preact/hooks';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => savedCallback.current();
    const intervalDelay = delay ?? -1;

    if (intervalDelay > 0) {
      const id = setInterval(tick, intervalDelay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
