/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../datetime');
var Collection = require('../../common/collection');
var EventViewModel = require('../../model/viewModel/event');

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
        var range = datetime.range(
                datetime.start(starts),
                datetime.start(ends),
                datetime.MILLISECONDS_PER_DAY
            ),
            ownEvents = this.events.items,
            ownMatrix = this.dateMatrix,
            dformat = datetime.format,
            matrix,
            col,
            ymd,
            result = {};

        util.forEachArray(range, function(date) {
            ymd = dformat(date, 'YYYYMMDD');
            matrix = ownMatrix[ymd];

            if (matrix) {
                col = new Collection(function(event) {
                    return util.stamp(event);
                });
                col.add.apply(col, util.map(matrix, function(id) {
                    return new EventViewModel(ownEvents[id]);
                }));

                result[ymd] = col.groupBy(function(item) {
                    item = item.valueOf();
                    if (item.isAllDay) {
                        return 'allday';
                    }
                    //TODO: task event flag
                    return 'time';
                });
            }
        });

        console.table(result);

        return result;
    }
};

module.exports = days;

