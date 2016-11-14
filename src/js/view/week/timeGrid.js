/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');
var View = require('../view');
var Time = require('./time');
var AutoScroll = require('../../common/autoScroll');
var mainTmpl = require('../template/week/timeGrid.hbs');

var HOURMARKER_REFRESH_INTERVAL = 1000 * 10;
var INITIAL_AUTOSCROLL_DELAY = util.browser.msie ? 100 : 50;

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
function TimeGrid(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('timegrid-container')
    );

    View.call(this, container);

    if (!util.browser.safari) {
        /**
         * @type {AutoScroll}
         */
        this._autoScroll = new AutoScroll(container);
    }

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

    /**
     * Interval id for hourmarker animation.
     * @type {number}
     */
    this.intervalID = 0;

    /**
     * id for timeout. use for TimeGrid#scrollToNow
     * @type {number}
     */
    this.timeoutID = 0;

    /**
     * @type {boolean}
     */
    this._scrolled = false;

    this.attachEvent();
}

util.inherit(TimeGrid, View);

/**********
 * Prototype props
 **********/

/**
 * @type {string}
 */
TimeGrid.prototype.viewName = 'timegrid';

/**
 * Destroy view.
 * @override
 */
TimeGrid.prototype._beforeDestroy = function() {
    clearTimeout(this.timeoutID);
    clearInterval(this.intervalID);

    if (this._autoScroll) {
        this._autoScroll.destroy();
    }

    this._autoScroll = this.hourmarker = this.timeoutID =
        this.intervalID = null;
};

/**
 * @param {Date} [time] - date object to convert pixel in grids.
 * use **Date.now()** when not supplied.
 * @returns {number} The pixel value represent current time in grids.
 */
TimeGrid.prototype._getTopPercentByTime = function(time) {
    var opt = this.options,
        raw = datetime.raw(time || new Date()),
        hourLength = util.range(opt.hourStart, opt.hourEnd).length,
        maxMilliseconds = hourLength * datetime.MILLISECONDS_PER_HOUR,
        hmsMilliseconds = datetime.millisecondsFrom('hour', raw.h) +
            datetime.millisecondsFrom('minutes', raw.m) +
            datetime.millisecondsFrom('seconds', raw.s) +
            raw.ms,
        topPercent;

    topPercent = common.ratio(maxMilliseconds, 100, hmsMilliseconds);
    topPercent -= common.ratio(maxMilliseconds, 100, datetime.millisecondsFrom('hour', opt.hourStart));

    return common.limit(topPercent, [0], [100]);
};

/**
 * Get Hourmarker viewmodel.
 * @param {Date} now - now
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function(now) {
    var opt = this.options,
        dateRange = datetime.range(
            datetime.parse(opt.renderStartDate),
            datetime.parse(opt.renderEndDate),
            datetime.MILLISECONDS_PER_DAY
        ),
        todaymarkerLeft = null,
        viewModel;

    now = now || new Date();

    util.forEach(dateRange, function(date, index) {
        if (datetime.isSameDate(now, date)) {
            todaymarkerLeft = common.ratio(dateRange.length, 100, index);
        }
    });

    viewModel = {
        currentHour: now.getHours(),
        hourmarkerTop: this._getTopPercentByTime(),
        hourmarkerText: datetime.format(now, 'HH:mm'),
        todaymarkerLeft: todaymarkerLeft
    };

    return viewModel;
};

/**
 * Get base viewModel.
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function() {
    var opt = this.options,
        now = (new Date()),
        hourRange = util.range(opt.hourStart, opt.hourEnd),
        viewModel;

    viewModel = util.extend({
        hours: hourRange,
        currentHour: now.getHours()
    }, this._getHourmarkerViewModel());

    return viewModel;
};

/**
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {number} width The width percent of each time view.
 * @param {HTMLElement} container Container element for each time view.
 */
TimeGrid.prototype._renderChildren = function(viewModels, width, container) {
    var self = this,
        options = this.options,
        childOption,
        child,
        isToday,
        today = datetime.format(new Date(), 'YYYYMMDD'),
        i = 0;

    // clear contents
    container.innerHTML = '';
    this.children.clear();

    // reconcilation of child views
    util.forEach(viewModels, function(events, ymd) {
        isToday = ymd === today;

        childOption = {
            index: i,
            width: width,
            ymd: ymd,
            isToday: isToday,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd,
            isSplitTimeGrid: options.isSplitTimeGrid
        };

        child = new Time(
            childOption,
            domutil.appendHTMLElement('div', container, config.classname('time-date'))
        );
        child.render(ymd, events);

        self.addChild(child);

        i += 1;
    });
};

/**
 * @override
 * @param {object} viewModel ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(viewModel) {
    var timeViewModel = viewModel.eventsInDateRange.time,
        container = this.container,
        baseViewModel = this._getBaseViewModel(),
        eventLen = util.keys(timeViewModel).length,
        width;

    if (!eventLen) {
        return;
    }

    width = 100 / eventLen;
    baseViewModel.width = width;

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render children
     **********/
    this._renderChildren(
        timeViewModel,
        width,
        domutil.find(config.classname('.timegrid-events-container'), container)
    );

    this._hourLabels = domutil.find('ul', container);

    /**********
     * Render hourmarker
     **********/
    this.hourmarker = domutil.find(config.classname('.timegrid-hourmarker'), container);

    if (!this._scrolled) {
        this._scrolled = true;
        this.scrollToNow();
    }
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourLabels = this._hourLabels,
        hourmarker = this.hourmarker,
        viewModel = this._getHourmarkerViewModel(),
        todaymarker,
        text;

    if (!hourmarker || !viewModel) {
        return;
    }

    todaymarker = domutil.find(config.classname('.timegrid-todaymarker'), hourmarker);

    reqAnimFrame.requestAnimFrame(function() {
        
        hourmarker.style.display = 'block';
        hourmarker.style.top = viewModel.hourmarkerTop + '%';
        todaymarker.style.display = viewModel.todaymarkerLeft ? 'block' : 'none';
    });
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(util.bind(this.onTick, this), HOURMARKER_REFRESH_INTERVAL);
};

/**
 * Scroll time grid to current hourmarker.
 */
TimeGrid.prototype.scrollToNow = function() {
    var self = this,
        container = this.container;

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(util.bind(function() {
        var currentHourTop = self.hourmarker.getBoundingClientRect().top -
                self.container.getBoundingClientRect().top,
            viewBound = self.getViewBound();

        container.scrollTop = (currentHourTop - (viewBound.height / 2));
    }), INITIAL_AUTOSCROLL_DELAY);
};

/**********
 * CalEvent handlers
 **********/

/**
 * Interval tick handler
 */
TimeGrid.prototype.onTick = function() {
    this.refreshHourmarker();
};

module.exports = TimeGrid;
