export function toPercent(value: number) {
  return `${value}%`;
}

export function toPx(value: number) {
  return `${value}px`;
}

export function convertPxToNum(pxString: string) {
  const isPxString = /^\d+px$/.test(pxString);
  if (!isPxString) {
    throw new Error(
      '[convertPxToNum] you should pass a pixel string value as argument - i.e., "18px"'
    );
  }

  return parseFloat(pxString);
}
