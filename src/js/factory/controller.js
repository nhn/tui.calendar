/**
 * @fileoverview Controller factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Base = require('../controller/base'),
    Core = require('../controller/viewMixin/core'),
    Week = require('../controller/viewMixin/week'),
    Month = require('../controller/viewMixin/month'),
    datetime = require('../common/datetime');

/**
 * Mixin object. create object property to target and mix to that
 * @param {object} from - source object
 * @param {object} to - target object
 * @param {string} propertyName - property name
 */
function mixin(from, to, propertyName) {
    var obj = to[propertyName] = {};

    util.forEach(from, function(method, methodName) {
        obj[methodName] = util.bind(method, to);
    });
}

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {Base} The controller instance.
 */
module.exports = function(options) {
    var controller = new Base(options),
        originQuery;

    mixin(Core, controller, 'Core');
    mixin(Week, controller, 'Week');
    mixin(Month, controller, 'Month');

    /**********
     * Override Week#findByDateRange for support schedules that category is 'miles
     * tone', 'task'.
     **********/

    originQuery = controller.Week.findByDateRange;

    /**
     * Find schedule and get view model for specific month
     * @this Base
     * @override
     * @param {Date} start - start date to find schedules
     * @param {Date} end - end date to find schedules
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @returns {object} view model data
     */
    function findByDateRange(start, end, andFilters) {
        var dateRange = datetime.range(
                datetime.start(start),
                datetime.end(end),
                datetime.MILLISECONDS_PER_DAY
            ),
            ymdRange = util.map(dateRange, function(d) {
                return datetime.format(d, 'YYYY-MM-DD');
            }),
            viewModels;

        andFilters = andFilters || [];
        viewModels = originQuery(start, end, andFilters);

        util.forEach(viewModels, function(coll, key, obj) {
            var groupedByYMD;

            // 마일스톤, 업무 뷰 뷰모델 가공
            if (key === 'task' || key === 'milestone') {
                groupedByYMD = coll.groupBy(ymdRange, function(viewModel) {
                    return datetime.format(viewModel.model.end, 'YYYY-MM-DD');
                });

                if (key === 'task') {
                    util.forEach(groupedByYMD, function(tasks, ymd, _obj) {
                        _obj[ymd] = tasks.groupBy(function(viewModel) {
                            return viewModel.model.dueDateClass;
                        });
                    });
                }

                obj[key] = groupedByYMD;
            }
        });

        return viewModels;
    }

    controller.Week.findByDateRange = findByDateRange;

    return controller;
};

