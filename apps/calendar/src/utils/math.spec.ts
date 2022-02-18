import { isBetween, limit, ratio } from '@src/utils/math';

describe('math util test', () => {
  it('should return a number between minArr and maxArr', () => {
    const target = [-1, 0, 4];
    const minArr = [1];
    const maxArr = [2, 3];
    const expected = [1, 1, 2];

    target.forEach((value, index) => {
      const result = limit(value, minArr, maxArr);

      expect(result).toBe(expected[index]);
    });
  });

  it('should find x satisfying the following expression(a : b = y : x)', () => {
    const a = [1, 2, 3];
    const b = [2, 4, 6];
    const y = [3, 6, 9];
    const expected = [6, 12, 18];

    a.forEach((value, index) => {
      const result = ratio(value, b[index], y[index]);

      expect(result).toBe(expected[index]);
    });
  });

  it('should check if the value exists between', () => {
    const target = 3;
    const min = [1, 2, 4];
    const max = [2, 4, 5];
    const expected = [false, true, false];

    min.forEach((value, index) => {
      const result = isBetween(target, value, max[index]);

      expect(result).toBe(expected[index]);
    });
  });
});
