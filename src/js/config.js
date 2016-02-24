/* eslint-disable */
/**
 * @fileoverview Global configuration object module. This @echo syntax will change preprocess context. See gulpfile.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var config = {
    throwError: function(msg) {
        /* @if BUNDLE_TYPE='Release' */
        alert(msg);
        /* @endif */
        /* @if BUNDLE_TYPE='Debug' */
        throw new Error(msg);
        /* @endif */
    },

    cssPrefix: '/* @echo CSS_PREFIX */',

    classname: function(str) {
        str = str || '';

        if (str.charAt(0) === '.') {
            return '.' + config.cssPrefix + str.slice(1);
        }

        return config.cssPrefix + str;
    },

    minicalendar: {
        getDataRegExp: //* @echo CSS_PREFIX */minicalendar-(\d{4}-\d{2}-\d{2})/
    },

    allday: {
        getViewIDRegExp: /^/* @echo CSS_PREFIX */weekday[\s]tui-view-(\d+)/,
        checkCondRegExp: /^/* @echo CSS_PREFIX */event(-title)?$/
    },

    time: {
        getViewIDRegExp: /^/* @echo CSS_PREFIX */time-date[\s]tui-view-(\d+)/
    }
};

module.exports = config;

