/**
 * @fileoverview View for rendered schedules by times.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var reqAnimFrame = require('../../common/reqAnimFrame');
var View = require('../view');
var Time = require('./time');
var AutoScroll = require('../../common/autoScroll');
var mainTmpl = require('../template/week/timeGrid.hbs');

var HOURMARKER_REFRESH_INTERVAL = 1000 * 60;
var SIXTY_SECONDS = 60;

/**
 * start~end 까지의 시간 레이블 목록을 반환한다.
 * 현재 시간과 가까운 레이블의 경우 hidden:true로 설정한다.
 * @param {number} start - 시작시간
 * @param {number} end - 끝시간
 * @param {boolean} hasHourMarker - 현재 시간이 표시되는지 여부
 * @returns {Array.<Object>}
 */
function getHoursLabels(start, end, hasHourMarker) {
    var now = new TZDate();
    var nowMinutes = now.getMinutes();
    var nowHours = now.getHours();
    var hoursRange = util.range(start, end);
    var nowAroundHours = null;

    if (hasHourMarker) {
        if (nowMinutes < 20) {
            nowAroundHours = nowHours;
        } else if (nowMinutes > 40) {
            nowAroundHours = nowHours + 1;
        }
    }

    return hoursRange.map(function(hours) {
        return {
            hours: hours,
            hidden: nowAroundHours === hours
        };
    });
}
/**
 * @constructor
 * @extends {View}
 * @param {string} name - view name
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - render start date. YYYY-MM-DD
 * @param {string} options.renderEndDate - render end date. YYYY-MM-DD
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} container Container element.
 */
function TimeGrid(name, options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('timegrid-container')
    );
    name = name || 'time';

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
        viewName: name,
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
     * timer id for hourmarker initial state
     * @type {number}
     */
    this.timerID = 0;

    /**
     * @type {boolean}
     */
    this._scrolled = false;

    /*
     * cache parent's view model
     * @type {object}
     */
    this._cacheParentViewModel = null;

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
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);

    if (this._autoScroll) {
        this._autoScroll.destroy();
    }

    this._autoScroll = this.hourmarker = this.intervalID = this.timerID = this._cacheParentViewModel = null;
};

/**
 * @param {Date} [time] - date object to convert pixel in grids.
 * use **Date.now()** when not supplied.
 * @returns {number} The pixel value represent current time in grids.
 */
TimeGrid.prototype._getTopPercentByTime = function(time) {
    var opt = this.options,
        raw = datetime.raw(time || new TZDate()),
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
 * @param {object} grids grid information(width, left, day)
 * @param {Array.<TZDate>} range render range
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function(now, grids, range) {
    var todaymarkerLeft = -1,
        viewModel;

    now = now || new TZDate();

    util.forEach(range, function(date, index) {
        if (datetime.isSameDate(now, date)) {
            todaymarkerLeft = grids[index] ? grids[index].left : 0;
        }
    });

    viewModel = {
        currentHours: now.getHours(),
        hourmarkerTop: this._getTopPercentByTime(now),
        hourmarkerText: datetime.format(now, 'HH:mm'),
        todaymarkerLeft: todaymarkerLeft
    };

    return viewModel;
};

/**
 * Get base viewModel.
 * @param {object} grids grid information(width, left, day)
 * @param {Array.<TZDate>} range render range
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function(grids, range) {
    var opt = this.options;
    var viewModel = this._getHourmarkerViewModel(new TZDate(), grids, range);
    viewModel.hoursLabels = getHoursLabels(opt.hourStart, opt.hourEnd, viewModel.todaymarkerLeft >= 0);

    return viewModel;
};

/**
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {object} grids grid information(width, left, day)
 * @param {HTMLElement} container Container element for each time view.
 */
TimeGrid.prototype._renderChildren = function(viewModels, grids, container) {
    var self = this,
        options = this.options,
        childOption,
        child,
        isToday,
        containerHeight,
        today = datetime.format(new TZDate(), 'YYYYMMDD'),
        i = 0;

    // clear contents
    container.innerHTML = '';
    this.children.clear();

    containerHeight = domutil.getSize(container.parentElement)[1];

    // reconcilation of child views
    util.forEach(viewModels, function(schedules, ymd) {
        isToday = ymd === today;

        childOption = {
            index: i,
            left: grids[i] ? grids[i].left : 0,
            width: grids[i] ? grids[i].width : 0,
            ymd: ymd,
            isToday: isToday,
            isPending: options.isPending,
            isFocused: options.isFocused,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd
        };

        child = new Time(
            childOption,
            domutil.appendHTMLElement('div', container, config.classname('time-date'))
        );
        child.render(ymd, schedules, containerHeight);

        self.addChild(child);

        i += 1;
    });
};

/**
 * @override
 * @param {object} viewModel ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(viewModel) {
    var opt = this.options,
        timeViewModel = viewModel.schedulesInDateRange[opt.viewName],
        container = this.container,
        grids = viewModel.grids,
        range = viewModel.range,
        baseViewModel = this._getBaseViewModel(grids, range),
        scheduleLen = util.keys(timeViewModel).length;

    this._cacheParentViewModel = viewModel;

    if (!scheduleLen) {
        return;
    }

    baseViewModel.showHourMarker = baseViewModel.todaymarkerLeft >= 0;

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render children
     **********/
    this._renderChildren(
        timeViewModel,
        grids,
        domutil.find(config.classname('.timegrid-schedules-container'), container)
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
    var hourmarker = this.hourmarker,
        grids = this._cacheParentViewModel ? this._cacheParentViewModel.grids : null,
        range = this._cacheParentViewModel ? this._cacheParentViewModel.range : null,
        viewModel = this._getHourmarkerViewModel(new TZDate(), grids, range),
        todaymarker,
        hourmarkerText;

    if (!hourmarker || !viewModel) {
        return;
    }

    todaymarker = domutil.find(config.classname('.timegrid-todaymarker'), hourmarker);
    hourmarkerText = domutil.find(config.classname('.timegrid-hourmarker-time'), hourmarker);

    reqAnimFrame.requestAnimFrame(function() {
        hourmarker.style.display = 'block';
        hourmarker.style.top = viewModel.hourmarkerTop + '%';
        todaymarker.style.display = (viewModel.todaymarkerLeft >= 0) ? 'block' : 'none';
        hourmarkerText.innerHTML = viewModel.hourmarkerText;
    });
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);
    this.intervalID = this.timerID = null;

    this.timerID = setTimeout(util.bind(this.onTick, this), (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000);
};

/**
 * Scroll time grid to current hourmarker.
 */
TimeGrid.prototype.scrollToNow = function() {
    var self = this,
        container = this.container;
    var offsetTop,
        viewBound,
        scrollTop,
        scrollAmount,
        scrollBy,
        scrollFn;

    if (!self.hourmarker) {
        return;
    }

    offsetTop = this.hourmarker.offsetTop;
    viewBound = this.getViewBound();
    scrollTop = offsetTop;
    scrollAmount = viewBound.height / 4;
    scrollBy = 10;

    scrollFn = function() {
        if (scrollTop > offsetTop - scrollAmount) {
            scrollTop -= scrollBy;
            container.scrollTop = scrollTop;

            reqAnimFrame.requestAnimFrame(scrollFn);
        } else {
            container.scrollTop = offsetTop - scrollAmount;
        }
    };

    reqAnimFrame.requestAnimFrame(scrollFn);
};

/**********
 * Schedule handlers
 **********/

/**
 * Interval tick handler
 */
TimeGrid.prototype.onTick = function() {
    if (this.timerID) {
        clearTimeout(this.timerID);
        this.timerID = null;
    }

    if (!this.intervalID) {
        this.intervalID = setInterval(util.bind(this.onTick, this), HOURMARKER_REFRESH_INTERVAL);
    }
    this.refreshHourmarker();
};

module.exports = TimeGrid;
