import isUndefined from 'tui-code-snippet/type/isUndefined';

import preset from '@src/theme/preset';
import { defaultProps, ThemeKeyValue, ThemePropKeys } from '@src/theme/themeProps';

function setThemeObject(object: Record<string, any>, path: string, value: any) {
  const names = path.split('.');
  let store = object;

  names.forEach((name: string, index: number) => {
    store[name] = store[name] || {};

    if (index === names.length - 1) {
      store[name] = value;
    } else {
      store = store[name];
    }
  });
}

/**
 * Theme model class
 * @class
 * @param {object} customTheme - custom theme
 */
export default class Theme {
  private props: ThemeKeyValue = {};

  week!: WeekTheme;

  month!: MonthTheme;

  common!: CommonTheme;

  /**
   *
   * @param customTheme custom theme
   */
  constructor(customTheme?: ThemeKeyValue) {
    this.setStyles(customTheme || preset);
  }

  /**
   * Get a style with key
   * @param {ThemePropKeys} key - key for getting a style
   * @returns {string} style
   */
  getStyle(key: ThemePropKeys): string {
    return this.props[key] || '';
  }

  /**
   * Set a style
   * @param {ThemePropKeys} key - key for setting a style
   * @param {string} style - style value
   * @returns {boolean} true if the give key is valid or false
   */
  setStyle(key: ThemePropKeys, style: string): boolean {
    return (
      this.setStyles({
        [key]: style,
      }).length === 0
    );
  }

  /**
   * Set styles
   * @param {object} styles - multiple styles map
   * @returns {Array.<string>} error keys
   */
  setStyles(styles: ThemeKeyValue): string[] {
    const errors: ThemePropKeys[] = [];

    Object.entries(styles).forEach(([key, style]) => {
      if (isUndefined(defaultProps[key as ThemePropKeys])) {
        errors.push(key as ThemePropKeys);
      } else {
        this.props[key as ThemePropKeys] = style;
        setThemeObject(this, key, style);
      }
    });

    // apply missing styles which have to be default
    Object.entries(defaultProps).forEach(([key, style]) => {
      if (!this.getStyle(key as ThemePropKeys)) {
        this.props[key as ThemePropKeys] = style;
        setThemeObject(this, key, style);
      }
    });

    return errors;
  }

  /**
   * Delete all styles
   */
  clear() {
    const categories: Record<string, string> = {};

    Object.keys(this.props).forEach((key) => {
      const [category] = key.split('.');
      if (!categories[category]) {
        categories[category] = category;
      }
    });

    Object.values(categories).forEach((prop) => {
      delete this[prop as 'common' | 'month' | 'week'];
    });

    this.props = {};
  }
}
