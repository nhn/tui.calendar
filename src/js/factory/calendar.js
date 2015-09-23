/**
 * @fileoverview Calendar class for export public api methods.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');

function Calendar(options, layoutView, baseController) {
    /**
     * @type {object}
     */
    this.options = options;

    /**
     * @type {Layout}
     */
    this.view = layoutView;

    /**
     * @type {Base}
     */
    this.controller = baseController;

    //TODO: 이벤트 잇는 작업 (public api 등록)
    // ex) calendar.next() 현재 뷰의 다음, 이전 이동
}

Calendar.prototype.move = function(offsetDate) {
    //FIXME: 시연용 임시코드 (주간뷰만 처리가능) 
    var currentView = 'week',  // TODO: getCurrentView
        view = this.view,
        weekOptions = view.childs.single().options,
        renderStart,
        renderEnd,
        dateRange,
        dateLength,
        newStart,
        newEnd;

    renderStart = datetime.parse(weekOptions.renderStartDate);
    renderEnd = datetime.parse(weekOptions.renderEndDate);
    newStart = new Date(renderStart.setDate(renderStart.getDate() + offsetDate));
    newEnd = new Date(renderEnd.setDate(renderEnd.getDate() + offsetDate));

    view.childs.items['Week'].options = {
        renderStartDate: datetime.format(newStart, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(newEnd, 'YYYY-MM-DD')
    }
    view.childs.items['Week'].render();
};

Calendar.prototype.getBaseDateLength = function(first_argument) {
    var view = this.view,
        weekOptions = view.childs.single().options,
        renderStart,
        renderEnd,
        dateRange;

    renderStart = datetime.parse(weekOptions.renderStartDate);
    renderEnd = datetime.parse(weekOptions.renderEndDate);
    dateRange = datetime.range(
        datetime.start(renderStart),
        datetime.end(renderEnd),
        datetime.MILLISECONDS_PER_DAY
    );
    
    return dateRange.length;
};

Calendar.prototype.next = function() {
    this.move(+this.getBaseDateLength());
};

Calendar.prototype.prev = function() {
    this.move(-this.getBaseDateLength());
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;

