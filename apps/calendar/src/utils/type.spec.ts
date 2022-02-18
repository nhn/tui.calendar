import { isFunction, isNil } from '@src/utils/type';

describe('utils', () => {
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
