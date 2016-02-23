/**
 * @fileoverview 두레이 서비스를 위한 컨트롤러를 만드는 팩토리 함수 모듈
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    aps = Array.prototype.slice;

var datetime = require('../../common/datetime'),
    DoorayBase = require('../controller/base'),
    Core = require('../../controller/viewMixin/core'),
    Week = require('../../controller/viewMixin/week'),
    Month = require('../../controller/viewMixin/month');

function mixin(from, to, propertyName) {
    var obj = to[propertyName] = {};

    util.forEach(from, function(method, methodName) {
        obj[methodName] = util.bind(method, to);
    });
}

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {DoorayBase} The controller instance.
 */
module.exports = function(options) {
    var controller = new DoorayBase(options),
        originQuery;

    mixin(Core, controller, 'Core');
    mixin(Week, controller, 'Week');
    mixin(Month, controller, 'Month');

    /**********
     * Override Week#findByDateRange for support events that category is 'miles
     * tone', 'task'.
     **********/

    originQuery = controller.Week.findByDateRange;

    /**
     * Find event and get view model for specific month
     * @this Base
     * @override
     * @param {Date} starts - start date to find events
     * @param {Date} ends - end date to find events
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @returns {object} view model data
     */
    function findByDateRange(starts, ends, andFilters) {
        var dateRange = datetime.range(
                datetime.start(starts),
                datetime.end(ends),
                datetime.MILLISECONDS_PER_DAY
            ),
            ymdRange = util.map(dateRange, function(d) {
                return datetime.format(d, 'YYYY-MM-DD');
            }),
            viewModels;

        andFilters = andFilters || [];
        viewModels = originQuery(starts, ends, andFilters);

        util.forEach(viewModels, function(coll, key, obj) {
            var groupedByYMD;

            // 마일스톤, 업무 뷰 뷰모델 가공
            if (key === 'task' || key === 'milestone') {
                groupedByYMD = coll.groupBy(ymdRange, function(viewModel) {
                    return datetime.format(viewModel.model.ends, 'YYYY-MM-DD');
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

