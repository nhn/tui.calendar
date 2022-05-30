import { isNil } from '@src/utils/type';

interface StampObj extends Record<string, any> {
  // eslint-disable-next-line camelcase
  __fe_id?: number;
}

function idGenerator() {
  let id = 0;

  return {
    next() {
      id += 1;

      return id;
    },
  };
}

const getId = (function () {
  const generator = idGenerator();

  return () => generator.next();
})();

export function stamp(obj: StampObj): number {
  if (!obj.__fe_id) {
    // eslint-disable-next-line camelcase
    obj.__fe_id = getId();
  }

  return obj.__fe_id;
}

export function hasStamp(obj: StampObj): boolean {
  return !isNil(obj.__fe_id);
}
