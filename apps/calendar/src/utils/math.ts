export function limit(value: number, minArr: number[], maxArr: number[]) {
  const v = Math.max(value, ...minArr);

  return Math.min(v, ...maxArr);
}

/**
 * a : b = y : x;
 * ==
 * x = (b * y) / a;
 */
export function ratio(a: number, b: number, y: number) {
  return (b * y) / a;
}

export function isBetween(value: number, min: number, max: number) {
  return min <= value && value <= max;
}
