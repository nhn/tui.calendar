import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import type { EventBus } from '@src/utils/eventBus';

import type { ExternalEventTypes } from '@t/eventBus';

const EventBusContext = createContext<EventBus<ExternalEventTypes> | null>(null);

export const EventBusProvider = EventBusContext.Provider;

export const useEventBus = () => {
  const eventBus = useContext(EventBusContext);

  if (!eventBus) {
    throw new Error('useEventBus must be used within a EventBusProvider');
  }

  return eventBus;
};
