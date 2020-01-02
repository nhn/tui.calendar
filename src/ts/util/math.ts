/**
 * @fileoverview Utility module for Math
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

/**
 * Limit supplied value base on `minArr`, `maxArr`
 * @param {number} value - value
 * @param {array} minArr - min
 * @param {array} maxArr - max
 * @returns {number} limited value
 */
export function limit(value: number, minArr: number[], maxArr: number[]) {
  let v = Math.max(...[value].concat(minArr));
  v = Math.min(...[v].concat(maxArr));

  return v;
}
