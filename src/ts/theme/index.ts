/**
 * @fileoverview The all configuration of a theme
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEach from 'tui-code-snippet/collection/forEach';
import isUndefined from 'tui-code-snippet/type/isUndefined';
import { set } from '@src/util';
import { defaultProps, IThemeProps, IThemePropTypes } from '@src/theme/themeProps';
import preset from '@src/theme/preset';

/**
 * Theme model class
 * @class
 * @param {object} customTheme - custom theme
 */
export default class Theme {
  private props: IThemeProps = {};

  /**
   *
   * @param customTheme custom theme
   */
  constructor(customTheme: IThemeProps) {
    this.setStyles(customTheme || preset);
  }

  /**
   * Get a style with key
   * @param {IThemePropTypes} key - key for getting a style
   * @returns {string|undefined} style
   */
  getStyle(key: IThemePropTypes): string | undefined {
    return this.props[key];
  }

  /**
   * Set a style
   * @param {IThemePropTypes} key - key for setting a style
   * @param {string} style - style value
   * @returns {boolean} true if the give key is valid or false
   */
  setStyle(key: IThemePropTypes, style: string): boolean {
    return (
      this.setStyles({
        [key]: style
      }).length === 0
    );
  }

  /**
   * Set styles
   * @param {object} styles - multiple styles map
   * @returns {Array.<string>} error keys
   */
  setStyles(styles: IThemeProps): IThemePropTypes[] {
    const errors: IThemePropTypes[] = [];

    forEach(styles, (style: string, key: IThemePropTypes) => {
      if (isUndefined(defaultProps[key])) {
        errors.push(key);
      } else {
        this.props[key] = style;
        set(this, key, style);
      }
    });

    // apply missing styles which have to be default
    forEach(defaultProps, (style: string, key: IThemePropTypes) => {
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
  clear(): void {
    const categories: Record<string, string> = {};

    forEach(this.props, (style: string, key: IThemePropTypes) => {
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
