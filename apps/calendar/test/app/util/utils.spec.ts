import { isObject, isUndefined, deepCopyArray, deepMergedCopy, deepCopy } from '@src/util/utils';

describe('utils', () => {
  it('deepCopy', () => {
    const obj = { a: 1, b: { c: 1 } };
    const copiedObj = deepCopy(obj);

    copiedObj.a = 2;
    expect(obj.a).toEqual(1);
    expect(copiedObj).toEqual({ a: 2, b: { c: 1 } });
  });

  it('deepCopyArray', () => {
    const arr = [1, 2, 3, 4];
    const copiedArr = deepCopyArray(arr);

    copiedArr.push(5);
    expect(arr).toEqual([1, 2, 3, 4]);
    expect(copiedArr).toEqual([1, 2, 3, 4, 5]);
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
});
