import {
  isObject,
  isUndefined,
  deepCopyArray,
  deepMergedCopy,
  deepCopy,
  range,
  includes,
  pick,
  isNumber,
  isFunction,
  isNil,
  findIndex,
} from '@src/util/utils';

describe('utils', () => {
  it('deepCopy', () => {
    const obj = { a: 1, b: { c: 1 } };
    const copiedObj = deepCopy(obj);

    expect(obj).not.toBe(copiedObj);
    expect(obj).toEqual(copiedObj);
  });

  it('deepCopyArray', () => {
    const arr = [1, 2, 3, 4];
    const copiedArr = deepCopyArray(arr);

    expect(arr).not.toBe(copiedArr);
    expect(arr).toEqual(copiedArr);
  });

  it('deepMergedCopy', () => {
    const obj1 = { a: { b: { d: 2 } }, c: 1 };
    const obj2 = { a: { b: { e: { f: 1 } } }, c: 2 };

    expect(deepMergedCopy(obj1, obj2)).toEqual({
      a: { b: { d: 2, e: { f: 1 } } },
      c: 2,
    });
  });

  it('isObject', () => {
    expect(isObject(null)).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject({ x: 1, y: 2 })).toBeTruthy();
  });

  it('isUndefined', () => {
    let a;
    const b = {};
    expect(isUndefined(a)).toBeTruthy();
    expect(isUndefined(b)).toBeFalsy();
  });

  describe('range', () => {
    it('should return an array of the number of inputs is created starting from 0, if only one parameter is passed', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should return an array of the number of between the starting digit and the ending digit, if two parameters is passed', () => {
      expect(range(2, 5)).toEqual([2, 3, 4]);
    });

    it('should return an array of numbers that is the size of the step with third parameter, if three parameters are passed', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });
  });

  it('includes', () => {
    expect(includes([1, 2, 3], 1)).toBe(true);
    expect(includes([1, 2, 3], 1, 2)).toBe(false);
    expect(includes([1, 2, 3], 1, 0)).toBe(true);
  });

  it('pick', () => {
    const obj = { a: 1, b: { c: 2 }, d: 2 };

    expect(pick(obj, 'a', 'd')).toEqual({ a: 1, d: 2 });
  });

  it('isNumber', () => {
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber('TOAST UI')).toBeFalsy();
    expect(isNumber(0)).toBeTruthy();
  });

  it('isFunction', () => {
    expect(isFunction(() => 'test')).toBe(true);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('String')).toBe(false);
    expect(isFunction([1, 2, 3, 4, 'str'])).toBe(false);
  });

  it('isNil', () => {
    // eslint-disable-next-line no-undefined
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil([])).toBe(false);
    expect(isNil(1)).toBe(false);
  });

  it('findIndex', () => {
    const arr = [
      { id: 1, title: 'todo1' },
      { id: 2, title: 'todo2' },
      { id: 3, title: 'todo3' },
    ];

    expect(findIndex(arr, (item) => item.id === 2)).toBe(1);
  });
});
