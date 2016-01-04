/**
 * @fileoverview 두레이 서비스를 위한 컨트롤러를 만드는 팩토리 함수 모듈
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
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
        originFindByDateRange;

    mixin(Core, controller, 'Core');
    mixin(Week, controller, 'Week');
    mixin(Month, controller, 'Month');

    // 일정 조회 API에 기존 캘린더에 없었던 milstone, task를 지원하도록
    // 하기 위해 메서드를 오버라이딩한다.
    originFindByDateRange = controller.Week.findByDateRange;

    // visible이 true인 일정만 필터링 하기 위한 필터 함수
    function filterModelIsVisible(model) {
        return !!model.visible;
    }

    /**
     * @override
     * @memberOf {DoorayBase.Week}
     */
    function findByDateRange(starts, ends) {
        var dateRange = util.map(datetime.range(
                datetime.start(starts),
                datetime.end(ends),
                datetime.MILLISECONDS_PER_DAY
            ), function(d) { return datetime.format(d, 'YYYY-MM-DD'); }),
            viewModel = originFindByDateRange(starts, ends, [filterModelIsVisible]);

        util.forEach(viewModel, function(coll, key, obj) {
            var groupedByYMD;

            // 마일스톤, 업무 뷰 뷰모델 가공
            if (key === 'task' || key === 'milestone') {
                groupedByYMD = coll.groupBy(dateRange, function(viewModel) {
                    return datetime.format(viewModel.model.ends, 'YYYY-MM-DD');
                });

                if (key === 'task') {
                    util.forEach(groupedByYMD, function(coll, ymd, obj) {
                        obj[ymd] = coll.groupBy(function(viewModel) {
                            return viewModel.model.dueDateClass;
                        });
                    });
                }

                obj[key] = groupedByYMD;
            }
        });

        return viewModel;
    };

    controller.Week.findByDateRange = findByDateRange;

    return controller;
};

