/**
 * @fileoverview View for rendering daynames
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var domutil = require('../common/domutil');
var View = require('./view');
var daynameTmpl = require('./template/daynames.hbs');

var DAY_NAME = {
    kor: ['일', '월', '화', '수', '목', '금', '토']
};

/**
 * @constructor
 * @param {HTMLElement} container Container element to use.
 * @extends {View}
 */
function DayName(container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-dayname-container'
    );

    View.call(this, null, container);
}

util.inherit(DayName, View);

/**
 * Get default viewmodels.
 * @param {Date} start The date of start render
 * @param {Date} end The end of end render
 * @returns {array} viewmodel.
 */
DayName.prototype._getBaseViewModel = function(start, end) {
    var viewModel;

    viewModel = util.map(datetime.range(
        datetime.start(start),
        datetime.start(end),
        datetime.MILLISECONDS_PER_DAY
    ), function(d, i, arr) {
        var day = d.getDay();

        return {
            day: day,
            dayName: DAY_NAME.kor[day],
            date: d.getDate(),
            width: 100 / arr.length
        };
    });

    return viewModel;
};

/**
 * @override
 * @param {object} viewModel View model from parent (WeekView)
 */
DayName.prototype.render = function(viewModel) {
    var _viewModel = this._getBaseViewModel(
        viewModel.renderStartDate,
        viewModel.renderEndDate
    );

    this.container.innerHTML = daynameTmpl(_viewModel);
};

module.exports = DayName;

