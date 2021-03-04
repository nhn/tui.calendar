/**
 * @fileoverview Global configuration object module.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

export const CSS_PREFIX = 'toastui-calendar-';
const weekdayGetViewID = new RegExp(`^${CSS_PREFIX}weekday[\\s]tui-view-(\\d+)`);
const timeGetViewID = new RegExp(`^${CSS_PREFIX}time-date[\\s]tui-view-(\\d+)`);
const viewMatchMap = {
  allday: weekdayGetViewID,
  daygrid: weekdayGetViewID,
  time: timeGetViewID,
};

export function cls(str = '', prefix = ''): string {
  if (str.charAt(0) === '.') {
    return `.${CSS_PREFIX}${prefix}${str.slice(1)}`;
  }

  return `${CSS_PREFIX}${prefix}${str}`;
}

export function matchViewIDRegExp(
  viewType: 'allday' | 'daygrid' | 'time',
  cssClass: string
): RegExpMatchArray | null {
  return cssClass.match(viewMatchMap[viewType]);
}

interface ClassNameDictionary {
  [id: string]: boolean | undefined | null;
}

type ClassNameValue =
  | string
  | number
  | ClassNameDictionary
  | Array<ClassNameValue>
  | undefined
  | null
  | false;

// eslint-disable-next-line complexity
export function classnames(...args: ClassNameValue[]): string {
  const classes = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg) continue;

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classnames(...arg);

        // eslint-disable-next-line max-depth
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (typeof arg === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        // eslint-disable-next-line max-depth
        for (const key in arg) {
          // eslint-disable-next-line max-depth
          if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
