/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

module.exports = {
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    'equal': function(a, b) {
        return a === b;
    },

    'or': function(a, b) {
        return a || b;
    },

    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);
            case '===':
                return  (a === b) ? options.fn(this) : options.inverse(this);
            default:
                break;
        }
    },

    'common-width': function(width) {
        return getElSize(width, '%', 'width');
    },

    /**
     * Use in time.hbs
     * @param {EventViewModel} eventViewModel viewModel
     * @returns {string} element size css class
     */
    'time-eventBlock': function(eventViewModel) {
        var top = getElSize(eventViewModel.top, 'px', 'top'),
            left = getElSize(eventViewModel.left, '%', 'left'),
            width = getElSize(eventViewModel.width, '%', 'width'),
            height = getElSize(eventViewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    /**
     * Use in dayname.hbs
     * @returns {string} css class
     */
    'dayname-isHolliday': function() {
        if (this.day === 0 || this.day === 6) {
            return '/* @echo CSS_PREFIX */dayname /* @echo CSS_PREFIX */holliday';
        }

        return '/* @echo CSS_PREFIX */dayname';
    },

    'multiply': function(a, b) {
        return a * b;
    },

    'CSS_PREFIX': function() {
        return '/* @echo CSS_PREFIX */';
    }
};

