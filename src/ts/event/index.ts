import CustomEvents from 'tui-code-snippet/customEvents/customEvents';

export class EventHandler<T extends string> extends CustomEvents {
  on(eventName: T, handler: Function, context?: object) {
    super.on(eventName as string, handler, context);

    return this;
  }

  once(eventName: T, handler: Function, context?: object) {
    super.once(eventName, handler, context);

    return this;
  }

  off(eventName: T) {
    super.off(eventName);

    return this;
  }

  fire(eventName: T, ...args: any[]) {
    super.fire(eventName, ...args);

    return this;
  }
}
