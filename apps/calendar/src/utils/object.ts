type PickedKey<T, K extends keyof T> = keyof Pick<T, K>;

export function pick<T extends object, K extends keyof T>(obj: T, ...propNames: K[]) {
  const resultMap = {} as Pick<T, K>;

  Object.keys(obj).forEach((key) => {
    if (propNames.includes(key as K)) {
      resultMap[key as PickedKey<T, K>] = obj[key as PickedKey<T, K>];
    }
  });

  return resultMap;
}
