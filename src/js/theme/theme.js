/**
 * @fileoverview The all configuration of a theme
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var themeStandard = require('./standard');
var themeConfig = require('./themeConfig');
var common = require('../common/common');

/**
 * Theme manager
 * @param {object} customTheme - custom theme
 */
function Theme(customTheme) {
    var theme = customTheme || themeStandard;

    /**
     * @type {util.HashMap}
     */
    this._map = new util.HashMap();

    this.setStyles(theme);
}

/**
 * Get a style with key
 * @param {string} key - key for getting a style
 * @returns {string|undefined} style
 */
Theme.prototype.getStyle = function(key) {
    return this._map.get(key);
};

/**
 * Set a style
 * @param {string} key - key for setting a style
 * @param {string} style - style value
 * @returns {boolean} true if the give key is valid or false
 */
Theme.prototype.setStyle = function(key, style) {
    var styles = {};
    styles[key] = style;

    return this.setStyles(styles).length === 0;
};

/**
 * Set styles
 * @param {object} styles - multiple styles map
 * @returns {Array.<string>} error keys
 */
Theme.prototype.setStyles = function(styles) {
    var errors = [];

    util.forEach(styles, function(style, key) {
        if (util.isUndefined(themeConfig[key])) {
            errors.push(key);
        } else {
            this._map.set(key, style);
            common.set(this, key, style);
        }
    }, this);

    // apply missing styles which have to be default
    util.forEach(themeConfig, function(style, key) {
        if (!this.getStyle(key)) {
            this._map.set(key, style);
            common.set(this, key, style);
        }
    }, this);

    return errors;
};

/**
 * Delete all styles
 */
Theme.prototype.clear = function() {
    var keys = this._map.keys();
    var categories = {};
    util.forEach(keys, function(key) {
        var category = key.split('.')[0];
        if (!categories[category]) {
            categories[category] = category;
        }
    });

    util.forEach(categories, function(child) {
        delete this[child];
    }, this);

    this._map.removeAll();
};

module.exports = Theme;
