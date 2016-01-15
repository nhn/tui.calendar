/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    existy = util.isExisty,
    mfloor = Math.floor,
    mmax = Math.max;

var Handlebars = require('hbsfy/runtime');

var config = require('../../config'),
    common = require('../../common/common.js'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    Weekday = require('../weekday'),
    baseTmpl = require('./weekdayInMonth.hbs'),
    eventTmpl = require('./weekdayInMonthEvent.hbs'),
    skipTmpl = require('./weekdayInMonthSkip.hbs');

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.containerHeight=40] - minimum height of event 
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to 
 *  make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
 * @param {HTMLDIVElement} container - DOM element to use container for this 
 *  view.
 */
function WeekdayInMonth(options, container) {
    Weekday.call(this, options, container);
    container.style.height = options.containerHeight + 'px';
}

util.inherit(WeekdayInMonth, Weekday);

/**
 * Get limit index of event block in current view
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function() {
    var opt = this.options,
        count = mfloor(opt.containerHeight / (opt.eventHeight + opt.eventGutter));

    return mmax(count - 1, 0);    // subtraction for '+n' label block
}

/**
 * Get handlebars custom helper method for limitation event block render count
 * features
 *
 * Cumulate count on each date. render +n label only when no cumulated 
 * count on cache object
 * @param {object} exceedDate - object to be used as a cache
 * @returns {function} custom helper function
 */
WeekdayInMonth.prototype._getSkipHelper = function(exceedDate) {
    return function() {
        var viewModel = this,
            period = datetime.range(
                viewModel.getStarts(),
                viewModel.getEnds(),
                datetime.MILLISECONDS_PER_DAY
            );
        
        util.forEach(period, function(date) {
            var ymd = datetime.format(date, 'YYYYMMDD');
            if (!existy(exceedDate[ymd])) {
                exceedDate[ymd] = 0;
            }

            exceedDate[ymd] += 1;
        });
    }
};

/**
 * Get view model for render skipped label
 * @param {object} exceedDate - object has count of each dates exceed event block
 *  cound.
 * @returns {object[]} - view model for skipped label
 */
WeekdayInMonth.prototype._getSkipLabelViewModel = function(exceedDate) {
    var dateRange = util.map(this.getRenderDateRange(), function(date) {
            return datetime.format(date, 'YYYYMMDD');
        });

    return util.map(exceedDate, function(skipped, ymd) {
        return {
            left: util.inArray(ymd, dateRange),
            skipped: skipped,
            ymd: ymd
        };
    });
};

/**
 * @override
 * @param {object} viewModel - events view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this.getBaseViewModel(),
        renderLimitIdx = this._getRenderLimitIndex(),
        exceedDate = {},
        eventContainer,
        contentStr = '';

    container.innerHTML = baseTmpl(baseViewModel);

    eventContainer = domutil.find(
        config.classname('.weekday-events'),
        container
    );

    if (!eventContainer) {
        return;
    }

    Handlebars.registerHelper('wdSkipped', this._getSkipHelper(exceedDate));

    contentStr += eventTmpl(util.extend({
        matrices: viewModel,
        renderLimitIdx: renderLimitIdx
    }, baseViewModel));
    
    contentStr += skipTmpl(util.extend({
        renderLimitIdx: renderLimitIdx,
        viewModelForSkip: this._getSkipLabelViewModel(exceedDate)
    }, baseViewModel));

    eventContainer.innerHTML = contentStr;

    common.setAutoEllipsis(
        config.classname('.weekday-event-title'),
        container
    );
};

module.exports = WeekdayInMonth;

