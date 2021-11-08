import { isString } from './utils';

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
