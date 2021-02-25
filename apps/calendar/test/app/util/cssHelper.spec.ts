import { CSS_PREFIX, cls, matchViewIDRegExp } from '@src/util/cssHelper';

describe('cssHelper', () => {
  it('cls() returns css selector with prefix "tui-calendar"', () => {
    expect(cls('view')).toBe(`${CSS_PREFIX}view`);
    expect(cls('.layout')).toBe(`.${CSS_PREFIX}layout`);
  });

  it('cls() returns "toastui-calendar-" with no argument', () => {
    expect(cls()).toBe(CSS_PREFIX);
  });

  it('cls() with prefix returns "toastui-calendar-prefix-selector"', () => {
    expect(cls('times', 'timegrid-')).toBe(`${CSS_PREFIX}timegrid-times`);
    expect(cls('.hours', 'timegrid-')).toBe(`.${CSS_PREFIX}timegrid-hours`);
  });

  it('matchViewIDRegExp() matches css selector with view id', () => {
    expect(matchViewIDRegExp('allday', `${CSS_PREFIX}weekday tui-view-67`)).not.toBeNull();
    expect(matchViewIDRegExp('daygrid', `${CSS_PREFIX}weekday tui-view-327`)).not.toBeNull();
    expect(matchViewIDRegExp('time', `${CSS_PREFIX}time-date tui-view-1`)).not.toBeNull();
  });
});
