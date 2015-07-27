/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;

module.exports = {
    'elSize': function(value) {
        if (util.isNumber(value)) {
            return value + '%';
        } else {
            return 'auto';
        }
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

