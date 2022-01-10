import { useCallback, useEffect, useRef } from 'preact/hooks';

import { useEventBus } from '@src/contexts/eventBus';

export function useCustomEvent<EventName extends keyof ExternalEventTypes>(
  eventName: keyof ExternalEventTypes,
  handler: ExternalEventTypes[EventName],
  fireOnce = false
): (...args: Parameters<ExternalEventTypes[EventName]>) => void {
  const eventBus = useEventBus();
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const customEventHandler = handlerRef.current;

    eventBus[fireOnce ? 'once' : 'on'](eventName, customEventHandler);

    return () => eventBus.off(eventName);
  }, [eventName, eventBus, fireOnce]);

  return useCallback(
    (...args: Parameters<typeof handler>) => {
      eventBus.fire(eventName, ...args);
    },
    [eventName, eventBus]
  );
}
