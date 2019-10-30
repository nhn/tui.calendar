/**
 * @fileoverview Global configuration object module.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */

export const CSS_PREFIX = 'tui-full-calendar-';
const weekdayGetViewID = new RegExp(`^${CSS_PREFIX}weekday[\\s]tui-view-(\\d+)`);
const timeGetViewID = new RegExp(`^${CSS_PREFIX}time-date[\\s]tui-view-(\\d+)`);
const viewMatchMap = {
  allday: weekdayGetViewID,
  daygrid: weekdayGetViewID,
  time: timeGetViewID
};

export function cls(str = ''): string {
  if (str.charAt(0) === '.') {
    return `.${CSS_PREFIX}${str.slice(1)}`;
  }

  return `${CSS_PREFIX}${str}`;
}

export function matchViewIDRegExp(
  viewType: 'allday' | 'daygrid' | 'time',
  cssClass: string
): RegExpMatchArray | null {
  return cssClass.match(viewMatchMap[viewType]);
}
