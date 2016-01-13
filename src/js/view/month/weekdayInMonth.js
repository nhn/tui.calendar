/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    existy = util.isExisty,
    mfloor = Math.floor;

var Handlebars = require('hbsfy/runtime');

var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    Weekday = require('../weekday'),
    tmpl = require('./weekdayInMonth.hbs');


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

    return count - 1;    // subtraction for '+n' label block
}

/**
 * Get handlebars custom helper method for limitation event block render count
 * features
 *
 * Cumulate count on each date. render +n label only when no cumulated 
 * count on cache object
 * @param {object} [exceedDate] - object to be used as a cache
 * @returns {function} custom helper function
 */
WeekdayInMonth.prototype._getOnceHandlebarHelper = function(exceedDate) {
    exceedDate = exceedDate || {};

    return function(options) {
        var ymd = datetime.format(this.model.starts, 'YYYYMMDD'),
            result;

        if (!existy(exceedDate[ymd])) {
            exceedDate[ymd] = 0;
            result = options.fn(this);
        }

        exceedDate[ymd] += 1;

        return result;
    }
};

/**
 * @override
 * @param {object} viewModel - events view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this.getBaseViewModel(),
        renderLimitIdx = this._getRenderLimitIndex();

    viewModel = util.extend({
        matrices: viewModel,
        renderLimitIdx: renderLimitIdx
    }, baseViewModel); 

    Handlebars.registerHelper('wdOnce', this._getOnceHandlebarHelper());

    container.innerHTML = tmpl(viewModel);

    var exceedElements = domutil.find(
        '.' + config.classname('weekday-exceed'),
        container,
        true
    );

    util.forEach(exceedElements, function(el) {
        var ymd = domutil.getData(el, 'ymd');
        console.log(ymd);
    });
};

module.exports = WeekdayInMonth;

