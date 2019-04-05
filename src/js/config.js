/**
 * @fileoverview Global configuration object module. This @echo syntax will change preprocess context. See gulpfile.js
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var cssPrefix = '/* @echo CSS_PREFIX */',
    alldayGetViewID = new RegExp('^' + cssPrefix + 'weekday[\\s]tui-view-(\\d+)'),
    alldayCheckPermission = new RegExp('^' + cssPrefix + 'schedule(-title)?$'),
    timeGetViewID = new RegExp('^' + cssPrefix + 'time-date[\\s]tui-view-(\\d+)');

var config = {
    throwError: function(msg) {
        /* @if BUNDLE_TYPE='Release' */
        alert(msg);
        /* @endif */
        /* @if BUNDLE_TYPE='Debug' */
        throw new Error(msg);
        /* @endif */
    },

    cssPrefix: cssPrefix,

    classname: function(str) {
        str = str || '';

        if (str.charAt(0) === '.') {
            return '.' + config.cssPrefix + str.slice(1);
        }

        return config.cssPrefix + str;
    },

    allday: {
        getViewIDRegExp: alldayGetViewID,
        checkCondRegExp: alldayCheckPermission
    },

    daygrid: {
        getViewIDRegExp: alldayGetViewID,
        checkCondRegExp: alldayCheckPermission
    },

    time: {
        getViewIDRegExp: timeGetViewID
    }
};

module.exports = config;
