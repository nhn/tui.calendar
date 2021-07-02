type PickedKey<T, K extends keyof T> = keyof Pick<T, K>;

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj !== null;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || value === null;
}

export function forEach<T extends object, K extends Extract<keyof T, string>, V extends T[K]>(
  obj: T,
  cb: (item: V, key: K) => void
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(obj[key as K] as V, key as K);
    }
  }
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

export function deepCopyArray<T extends Array<any>>(items: T): T {
  return items.map((item: T[number]) => {
    if (isObject(item)) {
      return Array.isArray(item) ? deepCopyArray(item) : deepCopy(item);
    }

    return item;
  }) as T;
}

export function deepCopy<T extends Record<string, any>>(obj: T) {
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

export function range(start: number, stop?: number, step?: number) {
  if (isUndefined(stop)) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;

  const arr: number[] = [];

  if (stop) {
    const flag = step < 0 ? -1 : 1;
    stop *= flag;

    for (; start * flag < stop; start += step) {
      arr.push(start);
    }
  }

  return arr;
}

export function pick<T extends object, K extends keyof T>(obj: T, ...propNames: K[]) {
  const resultMap = {} as Pick<T, K>;
  Object.keys(obj).forEach((key) => {
    if (includes(propNames, key as K)) {
      resultMap[key as PickedKey<T, K>] = obj[key as PickedKey<T, K>];
    }
  });

  return resultMap;
}

export function includes<T>(arr: T[], searchItem: T, searchIndex?: number) {
  if (isNumber(searchIndex) && arr[searchIndex] !== searchItem) {
    return false;
  }
  for (const item of arr) {
    if (item === searchItem) {
      return true;
    }
  }

  return false;
}
export function findIndex<T>(arr: T[], predicate: (item: T) => boolean) {
  const { length } = arr;

  for (let i = 0; i < length; i += 1) {
    if (predicate(arr[i])) {
      return i;
    }
  }

  return null;
}

export function toArray<T>(arrayLike: T[] | NodeListOf<Element>) {
  let arr;
  try {
    arr = Array.prototype.slice.call(arrayLike);
  } catch (e) {
    arr = [];
    forEachArray(arrayLike, (value) => {
      arr.push(value);
    });
  }

  return arr;
}

export function forEachArray<T>(
  arr: T[] | NodeListOf<Element>,
  iteratee: (value: T | Element, index?: number, arr?: T[] | NodeListOf<Element>) => boolean | void
) {
  let index = 0;
  const len = arr.length;

  for (; index < len; index += 1) {
    if (iteratee(arr[index], index, arr) === false) {
      break;
    }
  }
}

export function fill<T>(size: number, value: T): T[] {
  const result: T[] = [];

  if (size > 0) {
    for (let i = 0; i < size; i += 1) {
      if (isObject(value)) {
        result.push(Array.isArray(value) ? deepCopyArray(value) : deepCopy(value));
      } else {
        result.push(value);
      }
    }
  }

  return result;
}
