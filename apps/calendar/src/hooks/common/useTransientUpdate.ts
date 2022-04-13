import { useEffect, useRef } from 'preact/hooks';

import { useInternalStore } from '@src/contexts/calendarStore';

import type { CalendarState } from '@t/store';

type Slice<S> = S extends (state: CalendarState) => infer T ? T : never;

// Transient Updates for better performance
// Reference: https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes
export function useTransientUpdate<
  Selector extends (state: CalendarState) => any,
  Subscriber extends (slice: Slice<Selector>) => void
>(selector: Selector, subscriber: Subscriber) {
  const store = useInternalStore();
  const selectorRef = useRef(selector);
  const subscriberRef = useRef(subscriber);

  useEffect(() => {
    selectorRef.current = selector;
    subscriberRef.current = subscriber;
  }, [selector, subscriber]);

  useEffect(
    () =>
      store.subscribe(
        (slice) => subscriberRef.current(slice as any),
        (state) => selectorRef.current(state)
      ),
    [selector, store]
  );
}
