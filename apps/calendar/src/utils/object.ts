import type { DeepPartial } from 'ts-essentials';

import TZDate from '@src/time/date';
import { isObject } from '@src/utils/type';

export function pick<T extends object, K extends keyof T>(obj: T, ...propNames: K[]) {
  return propNames.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {} as Pick<T, K>);
}

/**
 * Clone an instance of a ES6 class.
 *
 * The cloned instance will have the (most of) same properties as the original.
 *
 * Reference: https://stackoverflow.com/a/44782052
 */
export function clone<T extends object>(source: T): T {
  return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
}

/**
 * Merge two objects together. And It has some pitfalls.
 *
 * For performance reason this function only mutates the target object.
 *
 * Also, it only merges values of nested objects. Array or TZDate instance will be totally replaced.
 *
 * Other non-basic objects are not supported.
 *
 * Since it mutates the target object, avoid using it outside immer `produce` function.
 */
export function mergeObject<Target, Source extends DeepPartial<Target>>(
  target: Target,
  source: Source = {} as Source
) {
  if (!isObject(source)) {
    return target;
  }

  Object.keys(source).forEach((k) => {
    const targetKey = k as keyof Target;
    const sourceKey = k as keyof Source;

    if (
      !Array.isArray(source[sourceKey]) &&
      isObject(target[targetKey]) &&
      isObject(source[sourceKey]) &&
      !(source[sourceKey] instanceof TZDate)
    ) {
      target[targetKey] = mergeObject(
        target[targetKey],
        source[sourceKey] as DeepPartial<Target[keyof Target]>
      );
    } else {
      target[targetKey] = source[sourceKey] as unknown as Target[keyof Target];
    }
  });

  return target;
}
