import { CSS_PREFIX, cls, matchViewIDRegExp } from '@src/util/cssHelper';

describe('cssHelper', () => {
  it('classname() returns css selector with prefix "tui-full-calendar"', () => {
    expect(cls('view')).toBe(`${CSS_PREFIX}view`);
    expect(cls('.layout')).toBe(`.${CSS_PREFIX}layout`);
  });

  it('classname() returns "tui-full-calendar-" with no argument', () => {
    expect(cls()).toBe(CSS_PREFIX);
  });

  it('matchViewIDRegExp() matches css selector with view id', () => {
    expect(matchViewIDRegExp('allday', `${CSS_PREFIX}weekday tui-view-67`)).not.toBeNull();
    expect(matchViewIDRegExp('daygrid', `${CSS_PREFIX}weekday tui-view-327`)).not.toBeNull();
    expect(matchViewIDRegExp('time', `${CSS_PREFIX}time-date tui-view-1`)).not.toBeNull();
  });
});
