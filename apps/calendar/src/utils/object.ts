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

type NestedPartial<Obj> = {
  [K in keyof Obj]?: NestedPartial<Obj[K]>;
};

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
 *
 * @param target
 * @param source
 */
export function mergeObject<Target, Source extends NestedPartial<Target>>(
  target: Target,
  source: Source
) {
  if (!isObject(source)) {
    return target;
  }

  Object.keys(source).forEach((k) => {
    const key = k as keyof Target;
    if (
      !Array.isArray(source[key]) &&
      isObject(target[key]) &&
      isObject(source[key]) &&
      !(source[key] instanceof TZDate)
    ) {
      target[key] = mergeObject(target[key], source[key]);
    } else {
      target[key] = source[key] as unknown as Target[keyof Target];
    }
  });

  return target;
}
