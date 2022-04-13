import CustomEvents from 'tui-code-snippet/customEvents/customEvents';

import type { AnyFunc } from '@t/eventBus';

export interface EventBus<
  EventTypes extends {
    [key: string]: AnyFunc;
  }
> {
  on<EventName extends keyof EventTypes>(
    eventName: EventName,
    handler: EventTypes[EventName]
  ): EventBus<EventTypes>;
  off<EventName extends keyof EventTypes>(
    eventName?: EventName,
    handler?: EventTypes[EventName]
  ): EventBus<EventTypes>;
  once<EventName extends keyof EventTypes>(
    eventName: EventName,
    handler: EventTypes[EventName]
  ): EventBus<EventTypes>;
  fire<EventName extends keyof EventTypes>(
    eventName: EventName,
    ...args: Parameters<EventTypes[EventName]>
  ): EventBus<EventTypes>;
}

export class EventBusImpl<
    EventTypes extends {
      [key: string]: AnyFunc;
    }
  >
  extends CustomEvents
  implements EventBus<EventTypes>
{
  on<EventName extends keyof EventTypes>(eventName: EventName, handler: EventTypes[EventName]) {
    super.on(eventName as string, handler);

    return this;
  }

  off<EventName extends keyof EventTypes>(eventName?: EventName, handler?: EventTypes[EventName]) {
    super.off(eventName as string, handler);

    return this;
  }

  fire<EventName extends keyof EventTypes>(
    eventName: EventName,
    ...args: Parameters<EventTypes[EventName]>
  ) {
    super.fire(eventName as string, ...args);

    return this;
  }

  once<EventName extends keyof EventTypes>(eventName: EventName, handler: EventTypes[EventName]) {
    super.once(eventName as string, handler);

    return this;
  }
}
