import { isString } from '@src/utils/type';

export const CSS_PREFIX = 'toastui-calendar-';

interface ClassNameDictionary {
  [id: string]: boolean | undefined | null;
}

type ClassNameValue = string | ClassNameDictionary | undefined | null;

export function cls(...args: ClassNameValue[]): string {
  const result: string[] = [];

  args.forEach((arg) => {
    if (!arg) {
      return;
    }

    if (isString(arg)) {
      result.push(arg);
    } else {
      Object.keys(arg).forEach((className) => {
        if (arg[className]) {
          result.push(className);
        }
      });
    }
  });

  return result.map((str: string) => `${CSS_PREFIX}${str}`).join(' ');
}

export function toPercent(value: number) {
  return `${value}%`;
}
