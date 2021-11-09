import { deepMergedCopy, isFunction, isNil } from '@src/util/utils';

describe('utils', () => {
  it('deepMergedCopy', () => {
    const obj1 = { a: { b: { d: 2 } }, c: 1 };
    const obj2 = { a: { b: { e: { f: 1 } } }, c: 2 };

    expect(deepMergedCopy(obj1, obj2)).toEqual({
      a: { b: { d: 2, e: { f: 1 } } },
      c: 2,
    });
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
});
