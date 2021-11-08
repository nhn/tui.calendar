import { isString } from '@src/util/utils';

export const CSS_PREFIX = 'toastui-calendar-';
const weekdayGetViewID = new RegExp(`^${CSS_PREFIX}weekday[\\s]tui-view-(\\d+)`);
const timeGetViewID = new RegExp(`^${CSS_PREFIX}time-date[\\s]tui-view-(\\d+)`);
const viewMatchMap = {
  allday: weekdayGetViewID,
  daygrid: weekdayGetViewID,
  time: timeGetViewID,
};

export function matchViewIDRegExp(
  viewType: 'allday' | 'daygrid' | 'time',
  cssClass: string
): RegExpMatchArray | null {
  return cssClass.match(viewMatchMap[viewType]);
}

const addPrefix = (str: string) => `${CSS_PREFIX}${str}`;

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

  return result.map(addPrefix).join(' ');
}

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
