import CustomEvents from 'tui-code-snippet/customEvents/customEvents';

export interface EventBus<
  EventTypes extends {
    [key: string]: AnyFunc;
  }
> {
  on<EventName extends keyof EventTypes>(
    eventName: EventName,
    handler: EventTypes[EventName]
  ): EventBus<EventTypes>;
  off<EventName extends keyof EventTypes>(eventName?: EventName): EventBus<EventTypes>;
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
  on<EventName extends keyof EventTypes>(eventName: EventName, callback: EventTypes[EventName]) {
    super.on(eventName as string, callback);

    return this;
  }

  off<EventName extends keyof EventTypes>(eventName?: EventName) {
    super.off(eventName as string);

    return this;
  }

  fire<EventName extends keyof EventTypes>(
    eventName: EventName,
    ...args: Parameters<EventTypes[EventName]>
  ) {
    super.fire(eventName as string, ...args);

    return this;
  }

  once<EventName extends keyof EventTypes>(eventName: EventName, callback: EventTypes[EventName]) {
    super.once(eventName as string, callback);

    return this;
  }
}
