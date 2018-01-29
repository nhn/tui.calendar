/**
 * @fileoverview View for rendering daynames
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var domutil = require('../../common/domutil');
var View = require('../view');
var daynameTmpl = require('../template/week/daynames.hbs');

/**
 * @constructor
 * @param {object} options - options for dayname view
 * @param {HTMLElement} container Container element to use.
 * @extends {View}
 */
function DayName(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('dayname-container')
    );

    this.options = util.extend({
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }, options);

    View.call(this, container);
}

util.inherit(DayName, View);

/**
 * Get default viewmodels.
 * @param {Date} start The date of start render
 * @param {Date} end The end of end render
 * @param {object} grids grid data(width, left, day)
 * @returns {array} viewmodel.
 */
DayName.prototype._getBaseViewModel = function(start, end, grids) {
    var daynames = this.options.daynames,
        viewModel;

    viewModel = util.map(datetime.range(
        datetime.start(start),
        datetime.start(end),
        datetime.MILLISECONDS_PER_DAY
    ), function(d, i) {
        var day = d.getDay();

        return {
            day: day,
            dayName: daynames[day],
            isToday: datetime.isSameDate(d, new TZDate()),
            date: d.getDate(),
            left: grids[i].left,
            width: grids[i].width,
            renderDate: datetime.format(d, 'YYYY-MM-DD')
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
        viewModel.renderEndDate,
        viewModel.grids
    );

    this.container.innerHTML = daynameTmpl(_viewModel);
};

module.exports = DayName;
