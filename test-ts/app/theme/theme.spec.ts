import pick from 'tui-code-snippet/object/pick';
import Theme from '@src/theme';
import preset from '@src/theme/preset';
import { ThemePropKeys } from '@src/theme/themeProps';

describe('Theme', function() {
  let theme: Theme;

  beforeEach(function() {
    theme = new Theme();
  });

  it('get a style by key', function() {
    const value = theme.getStyle('common.border');

    expect(value).toBe('1px solid #e5e5e5');
  });

  it('set a style by key', function() {
    const key = 'common.border';
    const value = '2px dashed #ddd';

    theme.setStyle(key, value);

    expect(theme.getStyle(key)).toBe(value);
  });

  it('set multiple styles with key, value map', function() {
    const map = {
      'common.border': '2px dashed #ddd',
      'month.dayname.paddingLeft': '3px',
      'week.today.color': '#555'
    };
    const result = theme.setStyles(map);

    expect(theme.getStyle('common.border')).toBe('2px dashed #ddd');
    expect(theme.getStyle('month.dayname.paddingLeft')).toBe('3px');
    expect(theme.getStyle('week.today.color')).toBe('#555');
    expect(result.length).toBe(0);
  });

  it('no return a style with wrong key parameter', function() {
    const key = 'wrong.key';
    const value = theme.getStyle(key as ThemePropKeys);

    expect(value).toBeUndefined();
  });

  it('no value through property path', function() {
    expect(pick(theme, 'wrong', 'border')).toBeUndefined();
  });

  it('return true to set a style by right key', function() {
    const key = 'common.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key, value);

    expect(result).toBe(true);
  });

  it('return false to set a style by wrong key', function() {
    const key = 'wrong.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key as ThemePropKeys, value);

    expect(result).toBe(false);
  });

  it('return wrong keys array when setting multiple styles including wrong key', function() {
    const styles = {
      'wrong.border': '2px dashed #ddd',
      'common.border': '2px dashed #ddd'
    };
    const result = theme.setStyles(styles);

    expect(result).toEqual(['wrong.border']);
  });

  it('can check all predefined key of the standard theme', function() {
    const keys = Object.keys(preset) as ThemePropKeys[];

    keys.forEach(function(key) {
      expect(theme.getStyle(key)).not.toBeUndefined();
    });
  });

  it('can check  all predefined key of the given custom theme', function() {
    const customTheme = fixture.load('theme-dooray.json');
    const keys = Object.keys(customTheme) as ThemePropKeys[];

    theme = new Theme(customTheme);

    keys.forEach(function(key) {
      expect(theme.getStyle(key)).not.toBeUndefined();
    });
  });

  it('can clear all styles and set another styles', function() {
    const customTheme = fixture.load('theme-dooray.json');
    let keys = Object.keys(preset) as ThemePropKeys[];
    theme.clear();

    keys.forEach(function(key) {
      expect(theme.getStyle(key)).toBeUndefined();
    });

    theme.setStyles(customTheme);

    keys = Object.keys(customTheme) as ThemePropKeys[];
    keys.forEach(function(key) {
      expect(theme.getStyle(key)).not.toBeUndefined();
    });
  });
});
