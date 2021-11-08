/**
 * Limit supplied value base on `minArr`, `maxArr`
 * @param {number} value - value
 * @param {array} minArr - min
 * @param {array} maxArr - max
 * @returns {number} limited value
 */
export function limit(value: number, minArr: number[], maxArr: number[]) {
  const v = Math.max(...[value].concat(minArr));

  return Math.min(...[v].concat(maxArr));
}

/**
 * Get ratio value.
 *
 * a : b = y : X;
 *
 * =
 *
 * X = (b * y) / a;
 * @param {number} a - a
 * @param {number} b - b
 * @param {number} y - y
 * @returns {number} ratio value
 */
export function ratio(a: number, b: number, y: number) {
  // a : b = y : x;
  return (b * y) / a;
}

/**
 * Whether value is between a and b
 * @param {number} value - value
 * @param {number} min - min value
 * @param {number} max - max value
 */
export function isBetween(value: number, min: number, max: number) {
  return min <= value && value <= max;
}
