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

// collection
declare module 'tui-code-snippet/collection/forEach' {
  export default function forEach(
    obj: object | Record<string, any>,
    iteratee: Function,
    context?: any
  ): void;
}

declare module 'tui-code-snippet/collection/forEachOwnProperties' {
  export default function forEachOwnProperties<T>(
    obj: object,
    iteratee: (value: T, key: string, obj: object) => boolean | void,
    context?: any
  ): void;
}

declare module 'tui-code-snippet/collection/forEachArray' {
  export default function forEachArray(arr: any[], iteratee: Function, context?: any): void;
}

declare module 'tui-code-snippet/collection/pluck' {
  export default function pluck(arr: any[], property: string): any[];
}

declare module 'tui-code-snippet/collection/toArray' {
  export default function toArray<T>(arrayLike: any): T[];
}

// array
declare module 'tui-code-snippet/array/range' {
  export default function range(start: number, stop?: number, step?: number): number[];
}

declare module 'tui-code-snippet/array/inArray' {
  export default function inArray(searchElement: any, array: any[], startIndex?: number): number;
}

// domEvent
declare module 'tui-code-snippet/domEvent/getMouseButton' {
  export default function getMouseButton(event: MouseEvent): number;
}

declare module 'tui-code-snippet/domEvent/getMousePosition' {
  export default function getMousePosition(
    event: MouseEvent,
    relativeElement?: HTMLElement | null
  ): number[];
}

declare module 'tui-code-snippet/domEvent/getTarget' {
  export default function getTarget(event: Event): HTMLElement;
}

// domUtil
declare module 'tui-code-snippet/domUtil/toggleClass' {
  export default function toggleClass(element: HTMLElement, ...classes: string[]): void;
}

declare module 'tui-code-snippet/domUtil/addClass' {
  export default function addClass(element: HTMLElement, ...classes: string[]): void;
}

declare module 'tui-code-snippet/domUtil/removeClass' {
  export default function removeClass(element: HTMLElement, ...classes: string[]): void;
}

// browser
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

// customEvents
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
