/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    existy = util.isExisty,
    mfloor = Math.floor,
    mmax = Math.max;

var Handlebars = require('handlebars/runtime');

var config = require('../../config'),
    common = require('../../common/common.js'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    More = require('./more'),
    Weekday = require('../weekday'),
    baseTmpl = require('./weekdayInMonth.hbs'),
    eventTmpl = require('./weekdayInMonthEvent.hbs'),
    skipTmpl = require('./weekdayInMonthSkip.hbs'),
    domevent = require('../../common/domevent');

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.heightPercent] - height percent of view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function WeekdayInMonth(options, container) {
    Weekday.call(this, options, container);
    container.style.height = options.heightPercent + '%';

    var moreContainer = domutil.appendHTMLElement(
      'div', container, config.classname('month-week-more'));

    this.more = new More(moreContainer);
    domevent.on(container, 'click', this.openMore, this);
}

util.inherit(WeekdayInMonth, Weekday);

/**
 * Get event container element's bound properly by override
 *
 * View#getViewBound.
 * @override
 */
WeekdayInMonth.prototype.getViewBound = function() {
    var bound = View.prototype.getViewBound.call(this),
        selector = config.classname('.weekday-events'),
        height = domutil.getSize(domutil.find(selector, this.container))[1];

    bound.height = height;

    return bound;
};

/**
 * Render Click Open More
 * @param e
 */
WeekdayInMonth.prototype.openMore = function(e) {
    var exceedElement = domutil.closest(e.target, config.classname('.weekday-exceed'));
    if(exceedElement) {
        var model = this.makeMoreViewModel(exceedElement);
        this.more.render(model)
    }
};

WeekdayInMonth.prototype.makeMoreViewModel = function(exceedElement){
    var model = {};
    model.target = exceedElement;
    model.date = domutil.getData(exceedElement, 'ymd');
    model.width = exceedElement.offsetWidth;
    model.height = this.container.offsetHeight - exceedElement.offsetHeight;
    model.events = this.parent.controller.findByDateRange(
      datetime.start(datetime.parse(model.date)),
      datetime.end(datetime.parse(model.date))
    )[0][0];
    return model;
};

/**
 * Get limit index of event block in current view
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function() {
    var opt = this.options,
        containerHeight = this.getViewBound().height,
        count = mfloor(containerHeight / (opt.eventHeight + opt.eventGutter));

    return mmax(count - 1, 0);    // subtraction for '+n' label block
};

/**
 * Get handlebars custom helper method for limitation event block render count
 * features
 *
 * Calculate count on each date. render +n label only when no cumulated
 * count on cache object
 * @param {object} exceedDate - object to be used as a cache
 * @returns {function} custom helper function
 */
WeekdayInMonth.prototype._getSkipHelper = function(exceedDate) {
    return function() {
        var viewModel = this, // eslint-disable-line
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
    };
};

/**
 * Get view model for render skipped label
 * @param {object} exceedDate - object has count of each dates exceed event block
 *  count.
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
        renderLimitIdx,
        exceedDate = {},
        eventContainer,
        contentStr = '';

    container.innerHTML = baseTmpl(baseViewModel);

    renderLimitIdx = this._getRenderLimitIndex();

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


WeekdayInMonth.prototype._beforeDestroy = function() {
    Handlebars.unregisterHelper('wdSkipped');
    domevent.off(this.container, 'click', this.openMore, this);

};
module.exports = WeekdayInMonth;
