/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'tui-code-snippet/type/isUndefined' {
  export default function isUndefined(value: unknown): value is undefined;
}

declare module 'tui-code-snippet/type/isObject' {
  export default function isObject(value: unknown): value is object;
}

declare module 'tui-code-snippet/type/isString' {
  export default function isString(value: unknown): value is string;
}

declare module 'tui-code-snippet/type/isNumber' {
  export default function isNumber(value: unknown): value is number;
}

declare module 'tui-code-snippet/type/isBoolean' {
  export default function isBoolean(value: unknown): value is boolean;
}

declare module 'tui-code-snippet/collection/pluck' {
  export default function pluck<T, K extends keyof T>(arr: T[], property: K): T[K][];
}

declare module 'tui-code-snippet/array/range' {
  export default function range(start: number, stop?: number, step?: number): number[];
}

declare module 'tui-code-snippet/domEvent/getMousePosition' {
  export default function getMousePosition(
    event: MouseEvent,
    relativeElement?: HTMLElement | null
  ): [number, number];
}

declare module 'tui-code-snippet/domEvent/getTarget' {
  export default function getTarget(event: Event): HTMLElement;
}

declare module 'tui-code-snippet/domUtil/addClass' {
  export default function addClass(element: Element, ...classes: string[]): void;
}

declare module 'tui-code-snippet/domUtil/removeClass' {
  export default function removeClass(element: Element, ...classes: string[]): void;
}

declare module 'tui-code-snippet/browser/browser' {
  interface Browser {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
    msie: boolean;
    edge: boolean;
    others: boolean;
    version: number;
  }

  const browser: Browser;
  export default browser;
}

declare module 'tui-code-snippet/customEvents/customEvents' {
  export default class CustomEvents {
    public static mixin(func: Function): void;

    public on(eventName: string, handler: Function, context?: object): void;

    public once(eventName: string, handler: Function, context?: object): void;

    public off(eventName?: string, handler?: Function): void;

    public fire(eventName: string, ...args: any[]): void;

    public invoke(eventName: string, ...args: any[]): boolean;
  }
}

declare module 'tui-code-snippet/request/sendHostname' {
  export default function sendHostname(appName: string, trackingId: string): void;
}
