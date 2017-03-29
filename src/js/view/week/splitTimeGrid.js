/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var TZDate = require('../../common/timezone').Date;
var View = require('../view');
var TimeGrid = require('./timeGrid');
var mainTmpl = require('../template/week/splitTimeGrid.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - render start date. YYYY-MM-DD
 * @param {string} options.renderEndDate - render end date. YYYY-MM-DD
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} container Container element.
 */
function SplitTimeGrid(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('split-timegrid-container')
    );

    View.call(this, container);
    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend({
        renderStartDate: '',
        renderEndDate: '',
        hourStart: 0,
        hourEnd: 24
    }, options);
}
util.inherit(SplitTimeGrid, TimeGrid);

SplitTimeGrid.prototype.viewName = 'split-timegrid';

/**********
 * Prototype props
 **********/
//
///**
// * @type {string}
// */
//SplitTimeGrid.prototype.viewName = 'SplitTimeGrid';
//
///**
// * Destroy view.
// * @override
// */
//SplitTimeGrid.prototype._beforeDestroy = function() {
//    clearTimeout(this.timeoutID);
//    clearInterval(this.intervalID);
//
//    if (this._autoScroll) {
//        this._autoScroll.destroy();
//    }
//
//    this._autoScroll = this.hourmarker = this.timeoutID =
//        this.intervalID = null;
//};
//
///**
// * @param {Date} [time] - date object to convert pixel in grids.
// * use **Date.now()** when not supplied.
// * @returns {number} The pixel value represent current time in grids.
// */
//SplitTimeGrid.prototype._getTopPercentByTime = function(time) {
//    var opt = this.options,
//        raw = datetime.raw(time || new Date()),
//        hourLength = util.range(opt.hourStart, opt.hourEnd).length,
//        maxMilliseconds = hourLength * datetime.MILLISECONDS_PER_HOUR,
//        hmsMilliseconds = datetime.millisecondsFrom('hour', raw.h) +
//            datetime.millisecondsFrom('minutes', raw.m) +
//            datetime.millisecondsFrom('seconds', raw.s) +
//            raw.ms,
//        topPercent;
//
//    topPercent = common.ratio(maxMilliseconds, 100, hmsMilliseconds);
//    topPercent -= common.ratio(maxMilliseconds, 100, datetime.millisecondsFrom('hour', opt.hourStart));
//
//    return common.limit(topPercent, [0], [100]);
//};
//
///**
// * Get Hourmarker viewmodel.
// * @param {Date} now - now
// * @returns {object} ViewModel of hourmarker.
// */
//SplitTimeGrid.prototype._getHourmarkerViewModel = function(now) {
//    if(this.options.disableHourMarker) {
//        return {};
//    }
//
//    var opt = this.options,
//        dateRange = datetime.range(
//            datetime.parse(opt.renderStartDate),
//            datetime.parse(opt.renderEndDate),
//            datetime.MILLISECONDS_PER_DAY
//        ),
//        todaymarkerLeft = null,
//        viewModel;
//
//    now = now || new Date();
//
//    util.forEach(dateRange, function(date, index) {
//        if (datetime.isSameDate(now, date)) {
//            todaymarkerLeft = common.ratio(dateRange.length, 100, index);
//        }
//    });
//
//    viewModel = {
//        currentHour: now.getHours(),
//        hourmarkerTop: this._getTopPercentByTime(),
//        hourmarkerText: datetime.format(now, 'HH:mm'),
//        todaymarkerLeft: todaymarkerLeft
//    };
//
//    return viewModel;
//};
//
///**
// * Get base viewModel.
// * @returns {object} ViewModel
// */

//
///**
// * Reconcilation child views and render.
// * @param {object} viewModels Viewmodel
// * @param {number} width The width percent of each time view.
// * @param {HTMLElement} container Container element for each time view.
// */
SplitTimeGrid.prototype._getBaseViewModel = function(model) {
    var opt = this.options,
        now = (new TZDate()),
        hourRange = util.range(opt.hourStart, opt.hourEnd),
        viewModel;

    viewModel = util.extend({
        hours: hourRange,
        currentHour: now.getHours()
    }, this._renderScheduleDate(model.renderStartDate, model.renderEndDate));
    return viewModel;
};

/**
 * @override
 * @param {object} viewModel ViewModel list from Week view.
 */
SplitTimeGrid.prototype.render = function(viewModel) {
    var timeViewModel = viewModel.eventsInDateRange.time,
        container = this.container,
        baseViewModel = this._getBaseViewModel(viewModel),
        eventLen = util.keys(timeViewModel).length;

    if (!eventLen) {
        return;
    }

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render children
     **********/
    this._renderChildren(
        timeViewModel,
        100 / eventLen,
        domutil.find(config.classname('.split-timegrid-events-container'), container)
    );
};

SplitTimeGrid.prototype._renderScheduleDate = function(starts, ends) {
    return {
        scheduleTop: this._getTopPercentByTime(starts),
        scheduleHeight: this._getTopPercentByTime(ends) - this._getTopPercentByTime(starts)
    }
};

module.exports = SplitTimeGrid;

