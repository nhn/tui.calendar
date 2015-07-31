/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;

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
        if (this.dayName === '일' ||
            this.dayName === '토') {
            return 'view-dayname-item holliday';
        }

        return 'view-dayname-item';
    }
};

