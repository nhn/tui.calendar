/**
 * @fileoverview The all configuration of a theme
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEach from 'tui-code-snippet/collection/forEach';
import isUndefined from 'tui-code-snippet/type/isUndefined';
import { set } from '@src/util';
import { defaultProps, ThemeKeyValue, ThemePropKeys } from '@src/theme/themeProps';
import preset from '@src/theme/preset';

/**
 * Theme model class
 * @class
 * @param {object} customTheme - custom theme
 */
export default class Theme {
  private props: ThemeKeyValue = {};

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

    forEach(styles, (style: string, key: ThemePropKeys) => {
      if (isUndefined(defaultProps[key])) {
        errors.push(key);
      } else {
        this.props[key] = style;
        set(this, key, style);
      }
    });

    // apply missing styles which have to be default
    forEach(defaultProps, (style: string, key: ThemePropKeys) => {
      if (!this.getStyle(key)) {
        this.props[key] = style;
        set(this, key, style);
      }
    });

    return errors;
  }

  /**
   * Delete all styles
   */
  clear() {
    const categories: Record<string, string> = {};

    forEach(this.props, (style: string, key: ThemePropKeys) => {
      const [category] = key.split('.');
      if (!categories[category]) {
        categories[category] = category;
      }
    });

    // [TODO] Typescript
    // forEach(categories, (categoryProp: string) => {
    //   delete this[categoryProp];
    // });

    this.props = {};
  }
}
