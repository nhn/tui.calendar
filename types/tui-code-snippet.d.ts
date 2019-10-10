/* eslint-disable @typescript-eslint/no-explicit-any */
// type
declare module 'tui-code-snippet/type/isString' {
  export default function isString(obj: any): obj is string;
}

declare module 'tui-code-snippet/type/isUndefined' {
  export default function isUndefined(obj: any): obj is boolean;
}

declare module 'tui-code-snippet/type/isBoolean' {
  export default function isBoolean(obj: any): obj is boolean;
}

declare module 'tui-code-snippet/type/isExisty' {
  export default function isExisty(obj: any): obj is boolean;
}

// object
declare module 'tui-code-snippet/object/extend' {
  export default function extend<T>(obj: T, ...objects: T[]): T;
}

declare module 'tui-code-snippet/object/pick' {
  export default function pick(obj: any, ...paths: string[]): any;
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

// array
declare module 'tui-code-snippet/array/range' {
  export default function range(start: number, stop?: number, step?: number): number[];
}

declare module 'tui-code-snippet/array/inArray' {
  export default function inArray(searchElement: any, array: any[], startIndex?: number): number;
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
