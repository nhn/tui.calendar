import isObject from 'tui-code-snippet/type/isObject';
import isUndefined from 'tui-code-snippet/type/isUndefined';

type PickedKey<T, K extends keyof T> = keyof Pick<T, K>;

export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || value === null;
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function deepMergedCopy<T1 extends Record<string, any>, T2 extends Record<string, any>>(
  targetObj: T1,
  obj: T2
) {
  const resultObj = { ...targetObj } as T1 & T2;

  Object.keys(obj).forEach((prop: keyof T2) => {
    if (isObject(resultObj[prop])) {
      if (Array.isArray(obj[prop])) {
        resultObj[prop as keyof T1 & T2] = deepCopyArray(obj[prop]);
      } else if (resultObj.hasOwnProperty(prop)) {
        resultObj[prop] = deepMergedCopy(resultObj[prop], obj[prop]);
      } else {
        resultObj[prop as keyof T1 & T2] = deepCopy(obj[prop]);
      }
    } else {
      resultObj[prop as keyof T1 & T2] = obj[prop];
    }
  });

  return resultObj;
}

function deepCopyArray<T extends Array<any>>(items: T): T {
  return items.map((item: T[number]) => {
    if (isObject(item)) {
      return Array.isArray(item) ? deepCopyArray(item) : deepCopy(item);
    }

    return item;
  }) as T;
}

function deepCopy<T extends Record<string, any>>(obj: T) {
  const resultObj = {} as T;
  const keys: Array<keyof T> = Object.keys(obj);

  if (!keys.length) {
    return obj;
  }

  keys.forEach((key) => {
    if (isObject(obj[key])) {
      resultObj[key] = Array.isArray(obj[key]) ? deepCopyArray(obj[key]) : deepCopy(obj[key]);
    } else {
      resultObj[key] = obj[key];
    }
  });

  return resultObj;
}

export function pick<T extends object, K extends keyof T>(obj: T, ...propNames: K[]) {
  const resultMap = {} as Pick<T, K>;

  Object.keys(obj).forEach((key) => {
    if (propNames.includes(key as K)) {
      resultMap[key as PickedKey<T, K>] = obj[key as PickedKey<T, K>];
    }
  });

  return resultMap;
}
