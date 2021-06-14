export function toPercent(value: number) {
  return `${value}%`;
}

export function toPx(value: number) {
  return `${value}px`;
}

export function convertPxToNum(...values: string[]) {
  const PIXEL_REGEX = /(.*)px$/;
  const isAllValueIsPx = values.every((v) => PIXEL_REGEX.test(v));
  if (!isAllValueIsPx) {
    throw new Error(
      '[convertPxToNum] you should pass pixel string values as arguments - i.e., "18px"'
    );
  }

  return values.reduce((acc, v) => acc + parseFloat(v), 0);
}
