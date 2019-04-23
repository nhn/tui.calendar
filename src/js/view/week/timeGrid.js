/**
 * @fileoverview View for rendered schedules by times.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var Timezone = require('../../common/timezone');
var reqAnimFrame = require('../../common/reqAnimFrame');
var View = require('../view');
var Time = require('./time');
var AutoScroll = require('../../common/autoScroll');
var mainTmpl = require('../template/week/timeGrid.hbs');
var timezoneStickyTmpl = require('../template/week/timezoneSticky.hbs');
var timegridCurrentTimeTmpl = require('../template/week/timeGridCurrentTime.hbs');
var TZDate = Timezone.Date;
var HOURMARKER_REFRESH_INTERVAL = 1000 * 60;
var SIXTY_SECONDS = 60;
var SIXTY_MINUTES = 60;

/**
 * Returns a list of time labels from start to end.
 * For hidden labels near the current time, set to hidden: true.
 * @param {object} opt - TimeGrid.options
 * @param {boolean} hasHourMarker - Whether the current time is displayed
 * @param {number} timezoneOffset - timezone offset
 * @param {object} styles - styles
 * @returns {Array.<Object>}
 */
function getHoursLabels(opt, hasHourMarker, timezoneOffset, styles) {
    var hourStart = opt.hourStart;
    var hourEnd = opt.hourEnd;
    var renderEndDate = new TZDate(opt.renderEndDate);
    var shiftByOffset = parseInt(timezoneOffset / SIXTY_MINUTES, 10);
    var shiftMinutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
    var now = new TZDate().toLocalTime();
    var nowMinutes = now.getMinutes();
    var hoursRange = util.range(0, 24);
    var nowAroundHours = null;
    var nowHours, nowHoursIndex;

    if (shiftByOffset < 0 && shiftMinutes > 0) {
        shiftByOffset -= 1;
    }

    // shift the array and take elements between start and end
    common.shiftArray(hoursRange, shiftByOffset);
    common.takeArray(hoursRange, hourStart, hourEnd);

    nowHours = common.shiftHours(now.getHours(), shiftByOffset) % 24;
    nowHoursIndex = util.inArray(nowHours, hoursRange);

    if (hasHourMarker) {
        if (nowMinutes < 20) {
            nowAroundHours = nowHours;
        } else if (nowMinutes > 40) {
            nowAroundHours = nowHours + 1;
        }

        if (util.isNumber(nowAroundHours)) {
            nowAroundHours %= 24;
        }
    }

    return util.map(hoursRange, function(hour, index) {
        var color;
        var fontWeight;
        var isPast = (hasHourMarker && index <= nowHoursIndex) ||
                     (renderEndDate < now && !datetime.isSameDate(renderEndDate, now));

        if (isPast) {
            // past
            color = styles.pastTimeColor;
            fontWeight = styles.pastTimeFontWeight;
        } else {
            // future
            color = styles.futureTimeColor;
            fontWeight = styles.futureTimeFontWeight;
        }

        return {
            hour: hour,
            minutes: shiftMinutes,
            hidden: nowAroundHours === hour || index === 0,
            color: color || '',
            fontWeight: fontWeight || ''
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
 * @param {HTMLElement} panelElement panel element.
 */
function TimeGrid(name, options, panelElement) {
    var container = domutil.appendHTMLElement(
        'div',
        panelElement,
        config.classname('timegrid-container')
    );
    var stickyContainer = domutil.appendHTMLElement(
        'div',
        panelElement,
        config.classname('timegrid-sticky-container')
    );

    panelElement.style.position = 'relative'; // for stickyContainer

    name = name || 'time';

    View.call(this, container);

    if (!util.browser.safari) {
        /**
         * @type {AutoScroll}
         */
        this._autoScroll = new AutoScroll(container);
    }

    this.stickyContainer = stickyContainer;

    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend({
        viewName: name,
        renderStartDate: '',
        renderEndDate: '',
        hourStart: 0,
        hourEnd: 24,
        timezones: options.timezones,
        isReadOnly: options.isReadOnly,
        showTimezoneCollapseButton: false
    }, options.week);

    if (this.options.timezones.length < 1) {
        this.options.timezones = [{
            timezoneOffset: Timezone.getOffset()
        }];
    }

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

    /**
     * cache parent's view model
     * @type {object}
     */
    this._cacheParentViewModel = null;

    /**
     * cache hoursLabels view model to render again TimeGrid
     * @type {object}
     */
    this._cacheHoursLabels = null;

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

    domevent.off(this.stickyContainer, 'click', this._onClickStickyContainer, this);

    this._autoScroll = this.hourmarkers = this.intervalID =
    this.timerID = this._cacheParentViewModel = this.stickyContainer = null;
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
 * @param {TZDate} now - now
 * @param {object} grids grid information(width, left, day)
 * @param {Array.<TZDate>} range render range
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function(now, grids, range) {
    var todaymarkerLeft = -1;
    var todaymarkerWidth = -1;
    var hourmarkerTimzones = [];
    var opt = this.options;
    var primaryOffset = Timezone.getOffset();
    var timezones = opt.timezones;
    var viewModel;

    util.forEach(range, function(date, index) {
        if (datetime.isSameDate(now, date)) {
            todaymarkerLeft = grids[index] ? grids[index].left : 0;
            todaymarkerWidth = grids[index] ? grids[index].width : 0;
        }
    });

    util.forEach(timezones, function(timezone) {
        var timezoneDifference = timezone.timezoneOffset + primaryOffset;
        var hourmarker = new TZDate(now);
        var dateDifference;

        hourmarker.setMinutes(hourmarker.getMinutes() + timezoneDifference);
        dateDifference = hourmarker.getDate() - now.getDate();

        hourmarkerTimzones.push({
            hourmarker: hourmarker,
            dateDifferenceSign: (dateDifference < 0) ? '-' : '+',
            dateDifference: Math.abs(dateDifference)
        });
    });

    viewModel = {
        currentHours: now.getHours(),
        hourmarkerTop: this._getTopPercentByTime(now),
        hourmarkerTimzones: hourmarkerTimzones,
        todaymarkerLeft: todaymarkerLeft,
        todaymarkerWidth: todaymarkerWidth,
        todaymarkerRight: todaymarkerLeft + todaymarkerWidth
    };

    return viewModel;
};

/**
 * Get timezone view model
 * @param {number} currentHours - current hour
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @param {object} styles - styles
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getTimezoneViewModel = function(currentHours, timezonesCollapsed, styles) {
    var opt = this.options;
    var primaryOffset = Timezone.getOffset();
    var timezones = opt.timezones;
    var timezonesLength = timezones.length;
    var timezoneViewModel = [];
    var collapsed = timezonesCollapsed;
    var width = collapsed ? 100 : 100 / timezonesLength;
    var now = new TZDate().toLocalTime();
    var backgroundColor = styles.displayTimezoneLabelBackgroundColor;

    util.forEach(timezones, function(timezone, index) {
        var hourmarker = new TZDate(now);
        var timezoneDifference;
        var timeSlots;
        var dateDifference;

        timezoneDifference = timezone.timezoneOffset + primaryOffset;
        timeSlots = getHoursLabels(opt, currentHours >= 0, timezoneDifference, styles);

        hourmarker.setMinutes(hourmarker.getMinutes() + timezoneDifference);
        dateDifference = hourmarker.getDate() - now.getDate();

        if (index > 0) {
            backgroundColor = styles.additionalTimezoneBackgroundColor;
        }

        timezoneViewModel.push({
            timeSlots: timeSlots,
            displayLabel: timezone.displayLabel,
            timezoneOffset: timezone.timezoneOffset,
            tooltip: timezone.tooltip || '',
            width: width,
            left: collapsed ? 0 : (timezones.length - index - 1) * width,
            isPrimary: index === 0,
            backgroundColor: backgroundColor || '',
            hidden: index !== 0 && collapsed,
            hourmarker: hourmarker,
            dateDifferenceSign: (dateDifference < 0) ? '-' : '+',
            dateDifference: Math.abs(dateDifference)
        });
    });

    return timezoneViewModel;
};

/**
 * Get base viewModel.
 * @param {object} viewModel - view model
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function(viewModel) {
    var grids = viewModel.grids;
    var range = viewModel.range;
    var opt = this.options;
    var baseViewModel = this._getHourmarkerViewModel(new TZDate().toLocalTime(), grids, range);
    var timezonesCollapsed = util.pick(viewModel, 'state', 'timezonesCollapsed');
    var styles = this._getStyles(viewModel.theme, timezonesCollapsed);

    return util.extend(baseViewModel, {
        timezones: this._getTimezoneViewModel(baseViewModel.todaymarkerLeft, timezonesCollapsed, styles),
        hoursLabels: getHoursLabels(opt, baseViewModel.todaymarkerLeft >= 0, 0, styles),
        styles: styles,
        showTimezoneCollapseButton: util.pick(opt, 'showTimezoneCollapseButton'),
        timezonesCollapsed: timezonesCollapsed
    });
};

/**
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {object} grids grid information(width, left, day)
 * @param {HTMLElement} container Container element for each time view.
 * @param {Theme} theme - theme instance
 */
TimeGrid.prototype._renderChildren = function(viewModels, grids, container, theme) {
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
            isReadOnly: options.isReadOnly,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd
        };

        child = new Time(
            childOption,
            domutil.appendHTMLElement('div', container, config.classname('time-date')),
            theme
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
        baseViewModel = this._getBaseViewModel(viewModel),
        scheduleLen = util.keys(timeViewModel).length;

    this._cacheParentViewModel = viewModel;
    this._cacheHoursLabels = baseViewModel.hoursLabels;

    if (!scheduleLen) {
        return;
    }

    baseViewModel.showHourMarker = baseViewModel.todaymarkerLeft >= 0;

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render sticky container for timezone display label
     **********/
    this.renderStickyContainer(baseViewModel);

    /**********
     * Render children
     **********/
    this._renderChildren(
        timeViewModel,
        grids,
        domutil.find(config.classname('.timegrid-schedules-container'), container),
        viewModel.theme
    );

    this._hourLabels = domutil.find('ul', container);

    /**********
     * Render hourmarker
     **********/
    this.hourmarkers = domutil.find(config.classname('.timegrid-hourmarker'), container, true);

    if (!this._scrolled) {
        this._scrolled = true;
        this.scrollToNow();
    }
};

TimeGrid.prototype.renderStickyContainer = function(baseViewModel) {
    var stickyContainer = this.stickyContainer;

    stickyContainer.innerHTML = timezoneStickyTmpl(baseViewModel);

    stickyContainer.style.display = baseViewModel.timezones.length > 1 ? 'block' : 'none';
    stickyContainer.style.width = baseViewModel.styles.leftWidth;
    stickyContainer.style.height = baseViewModel.styles.displayTimezoneLabelHeight;
    stickyContainer.style.borderBottom = baseViewModel.styles.leftBorderRight;
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourmarkers = this.hourmarkers;
    var viewModel = this._cacheParentViewModel;
    var hoursLabels = this._cacheHoursLabels;
    var baseViewModel;

    if (!hourmarkers || !viewModel) {
        return;
    }

    baseViewModel = this._getBaseViewModel(viewModel);

    reqAnimFrame.requestAnimFrame(function() {
        var needsRender = false;

        util.forEach(hoursLabels, function(hoursLabel, index) {
            if (hoursLabel.hidden !== baseViewModel.hoursLabels[index].hidden) {
                needsRender = true;

                return false;
            }

            return true;
        });

        if (needsRender) {
            this.render(viewModel);
        } else {
            util.forEach(hourmarkers, function(hourmarker) {
                var todaymarker = domutil.find(config.classname('.timegrid-todaymarker'), hourmarker);
                var hourmarkerContainer = domutil.find(config.classname('.timegrid-hourmarker-time'), hourmarker);
                var timezone = domutil.closest(hourmarker, config.classname('.timegrid-timezone'));
                var timezoneIndex = timezone ? domutil.getData(timezone, 'timezoneIndex') : 0;

                hourmarker.style.top = baseViewModel.hourmarkerTop + '%';

                if (todaymarker) {
                    todaymarker.style.display = (baseViewModel.todaymarkerLeft >= 0) ? 'block' : 'none';
                }
                if (hourmarkerContainer) {
                    hourmarkerContainer.innerHTML = timegridCurrentTimeTmpl(
                        baseViewModel.hourmarkerTimzones[timezoneIndex]
                    );
                }
            });
        }
    }, this);
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);
    this.intervalID = this.timerID = null;

    this.timerID = setTimeout(util.bind(this.onTick, this), (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000);

    domevent.on(this.stickyContainer, 'click', this._onClickStickyContainer, this);
};

/**
 * Scroll time grid to current hourmarker.
 */
TimeGrid.prototype.scrollToNow = function() {
    var container = this.container;
    var offsetTop,
        viewBound,
        scrollTop,
        scrollAmount,
        scrollBy,
        scrollFn;

    if (!this.hourmarkers || !this.hourmarkers.length) {
        return;
    }

    offsetTop = this.hourmarkers[0].offsetTop;
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

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
TimeGrid.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderBottom = theme.week.timegridHorizontalLine.borderBottom || theme.common.border;
        styles.halfHourBorderBottom = theme.week.timegridHalfHour.borderBottom || theme.common.border;

        styles.todayBackgroundColor = theme.week.today.backgroundColor;
        styles.weekendBackgroundColor = theme.week.weekend.backgroundColor;
        styles.backgroundColor = theme.week.daygrid.backgroundColor;
        styles.leftWidth = theme.week.timegridLeft.width;
        styles.leftBackgroundColor = theme.week.timegridLeft.backgroundColor;
        styles.leftBorderRight = theme.week.timegridLeft.borderRight || theme.common.border;
        styles.leftFontSize = theme.week.timegridLeft.fontSize;
        styles.timezoneWidth = theme.week.timegridLeft.width;
        styles.additionalTimezoneBackgroundColor = theme.week.timegridLeftAdditionalTimezone.backgroundColor
                                                || styles.leftBackgroundColor;

        styles.displayTimezoneLabelHeight = theme.week.timegridLeftTimezoneLabel.height;
        styles.displayTimezoneLabelBackgroundColor = theme.week.timegridLeft.backgroundColor === 'inherit' ? 'white' : theme.week.timegridLeft.backgroundColor;

        styles.oneHourHeight = theme.week.timegridOneHour.height;
        styles.halfHourHeight = theme.week.timegridHalfHour.height;
        styles.quaterHourHeight = (parseInt(styles.halfHourHeight, 10) / 2) + 'px';

        styles.currentTimeColor = theme.week.currentTime.color;
        styles.currentTimeFontSize = theme.week.currentTime.fontSize;
        styles.currentTimeFontWeight = theme.week.currentTime.fontWeight;

        styles.pastTimeColor = theme.week.pastTime.color;
        styles.pastTimeFontWeight = theme.week.pastTime.fontWeight;

        styles.futureTimeColor = theme.week.futureTime.color;
        styles.futureTimeFontWeight = theme.week.futureTime.fontWeight;

        styles.currentTimeLeftBorderTop = theme.week.currentTimeLinePast.border;
        styles.currentTimeBulletBackgroundColor = theme.week.currentTimeLineBullet.backgroundColor;
        styles.currentTimeTodayBorderTop = theme.week.currentTimeLineToday.border;
        styles.currentTimeRightBorderTop = theme.week.currentTimeLineFuture.border;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.leftWidth);
            styles.leftWidth = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

/**
 * @param {MouseEvent} event - mouse event object
 */
TimeGrid.prototype._onClickStickyContainer = function(event) {
    var target = event.target || event.srcElement;
    var closeBtn = domutil.closest(target, config.classname('.timegrid-timezone-close-btn'));

    if (!closeBtn) {
        return;
    }

    this.fire('clickTimezonesCollapsedBtn');
};

module.exports = TimeGrid;
