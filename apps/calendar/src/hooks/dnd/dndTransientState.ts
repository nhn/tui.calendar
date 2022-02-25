import { useEffect, useRef } from 'preact/hooks';

import { useInternalStore } from '@src/contexts/calendarStore';

import { CalendarState } from '@t/store';

type DndStateSubscriber = (dndState: CalendarState['dnd']) => void;

// Transient Updates for better performance
// Reference: https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes
export function useDndTransientState(subscriber: DndStateSubscriber) {
  const store = useInternalStore();
  const subscriberRef = useRef(subscriber);

  useEffect(() => {
    subscriberRef.current = subscriber;
  }, [subscriber]);

  useEffect(
    () =>
      store.subscribe(
        (state: CalendarState['dnd']) => subscriberRef.current(state),
        (state) => state.dnd
      ),
    [store]
  );
}
