import { cls, CSS_PREFIX, matchViewIDRegExp } from '@src/util/cssHelper';

describe('cssHelper', () => {
  describe('cls', () => {
    it('should return css selector with prefix "tui-calendar"', () => {
      expect(cls('view')).toBe(`${CSS_PREFIX}view`);
    });

    it('should handle object literal as arguments', () => {
      const classNameMap = {
        'is-ok': true,
        'is-not-ok': false,
        hidden: null,
      };
      expect(cls(classNameMap)).toBe(`${CSS_PREFIX}is-ok`);
    });

    it('should handle multiple argument types', () => {
      const strClassName = 'str';
      const classNameMap = {
        a: true,
        b: false,
        c: true,
        // eslint-disable-next-line no-undefined
        d: undefined,
      };
      expect(cls(strClassName, classNameMap)).toBe(
        `${CSS_PREFIX}${strClassName} ${CSS_PREFIX}a ${CSS_PREFIX}c`
      );
    });
  });

  describe('matchViewIDRegExp', () => {
    it('should match css selector with view id', () => {
      expect(matchViewIDRegExp('allday', `${CSS_PREFIX}weekday tui-view-67`)).not.toBeNull();
      expect(matchViewIDRegExp('daygrid', `${CSS_PREFIX}weekday tui-view-327`)).not.toBeNull();
      expect(matchViewIDRegExp('time', `${CSS_PREFIX}time-date tui-view-1`)).not.toBeNull();
    });
  });
});
