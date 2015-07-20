/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var DaysViewModel = require('../../view/model/days');

/**
 * @mixin
 */
var days = /** @lends Base.prototype.days */{
    /**
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @returns {object.<string, Event[]>} events grouped by dates.
     */
    findByDateRange: function(starts, ends) {
        var events = this.findByDateRange(starts, ends);

        util.forEach(events, function(events, ymd, obj) {
            obj[ymd] = util.map(events, function(event) {
                return DaysViewModel.create(event);
            });
        });

        return events;
    }
};

module.exports = days;

