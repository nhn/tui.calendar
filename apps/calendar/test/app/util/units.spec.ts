import { convertPxToNum } from '@src/util/units';

describe('Unit utils', () => {
  it('convertPxToNum', () => {
    const px1 = '18px';
    const px2 = '4px';
    const notPx = '3rem';

    expect(convertPxToNum(px1)).toBe(18);
    expect(convertPxToNum(px1, px2)).toBe(22);
    expect(() => convertPxToNum(px1, notPx)).toThrow();
  });
});
