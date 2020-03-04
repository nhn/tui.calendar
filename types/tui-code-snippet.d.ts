/* eslint-disable @typescript-eslint/no-explicit-any */
// type
declare module 'tui-code-snippet/type/isString' {
  export default function isString(obj: any): obj is string;
}

declare module 'tui-code-snippet/type/isUndefined' {
  export default function isUndefined(obj: any): obj is undefined;
}

declare module 'tui-code-snippet/type/isNull' {
  export default function isNull(obj: any): obj is null;
}

declare module 'tui-code-snippet/type/isBoolean' {
  export default function isBoolean(obj: any): obj is boolean;
}

declare module 'tui-code-snippet/type/isExisty' {
  export default function isExisty(obj: any): obj is boolean;
}

declare module 'tui-code-snippet/type/isFunction' {
  export default function isFunction(obj: any): obj is Function;
}

declare module 'tui-code-snippet/type/isNumber' {
  export default function isNumber(obj: any): obj is number;
}

declare module 'tui-code-snippet/type/isObject' {
  export default function isObject(obj: any): obj is object;
}

declare module 'tui-code-snippet/type/isArray' {
  export default function isArray(obj: any): obj is Array<any>;
}

// object
declare module 'tui-code-snippet/object/extend' {
  export default function extend<T>(obj: T, ...objects: T[]): T;
}

declare module 'tui-code-snippet/object/pick' {
  export default function pick(obj: any, ...paths: string[] | number[]): any;
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
