import { Ref, RefObject } from 'preact';
import { useMemo, useRef } from 'preact/hooks';

export function useMergedRef<T>(...refs: Ref<T>[]): RefObject<T> {
  const stableRef = useRef<T | null>(null);

  return useMemo(
    () => ({
      get current() {
        return stableRef.current;
      },
      set current(el) {
        stableRef.current = el;
        refs.forEach((ref) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(el);
            } else {
              ref.current = el;
            }
          }
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
