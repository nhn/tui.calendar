/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config'),
    domutil = require('../../common/domutil'),
    datetime = require('../../common/datetime'),
    TZDate = require('../../common/timezone').Date,
    tmpl = require('./guide.hbs');
var mmax = Math.max,
    mmin = Math.min,
    mabs = Math.abs,
    mfloor = Math.floor;

/**
 * @constructor
 * @param {object} [options] - options
 * @param {boolean} [options.useHandle=false] - whether displaying resize handle on
 *  guide element?
 * @param {boolean} [options.isResizeMode=false] - whether resize mode?
 * @param {Month} monthView - Month view instance
 */
function MonthGuide(options, monthView) {
    /**
     * @type {object}
     */
    this.options = util.extend({
        top: 0,
        height: '20px',
        bgColor: '#f7ca88',
        label: 'New event',
        isResizeMode: false,
        isCreationMode: false,
        styles: this._getStyles(monthView.controller.theme)
    }, options);

    /**
     * @type {Month}
     */
    this.view = monthView;

    /**
     * @type {WeekdayInMonth[]}
     */
    this.weeks = monthView.children.sort(function(a, b) {
        return util.stamp(a) - util.stamp(b);
    });

    /**
     * @type {number}
     */
    this.days = monthView.children.single().getRenderDateRange().length;

    /**
     * start coordinate of guide effect. (x, y) (days, weeks) effect can't
     *  start lower than this coordinate.
     * @type {number[]}
     */
    this.startCoord = [0, 0];

    /**
     * @type {Object.<string, HTMLElement>}
     */
    this.guideElements = {};

    /**
     * horizontal grid information
     * @type {Object}
     */
    this.grids = monthView.grids;
}

/**
 * Destructor
 */
MonthGuide.prototype.destroy = function() {
    this.clear();

    this.options = this.view = this.weeks = this.days =
        this.startCoord = this.guideElements = null;
};

MonthGuide.prototype.clearGuideElement = function() {
    this.destroy();
};

/**
 * Get ratio value in week.
 * @param {number} value - value for calc ratio in week
 * @returns {number} percent value
 */
MonthGuide.prototype._getRatioValueInWeek = function(value) {
    var grid = this.grids[value] || {left: 100};

    return grid.left;
};

/**
 * Create guide element
 * @returns {HTMLElement} guide element
 */
MonthGuide.prototype._createGuideElement = function() {
    var guide = document.createElement('div');

    guide.innerHTML = tmpl(this.options);

    return guide.firstChild;
};

/**
 * Get guide element. if not exist then create one
 * @param {number} y - y coordinate
 * @returns {?HTMLElement} guide element
 */
MonthGuide.prototype._getGuideElement = function(y) {
    var guideElements = this.guideElements,
        guide = guideElements[y],
        weekdayView = this.weeks[y],
        container;

    if (!weekdayView) {
        return null;
    }

    if (!guide) {
        guide = this._createGuideElement();
        container = weekdayView.container;
        container.appendChild(guide);
        guideElements[y] = guide;
    }

    return guide;
};

/**
 * Get coordinate by supplied date in month
 * @param {TZDate} date - date to find coordinate
 * @returns {number[]} coordinate (x, y)
 */
MonthGuide.prototype._getCoordByDate = function(date) {
    var WEEKEND_DAYS = 2;
    var weeks = this.weeks;
    var isWorkWeek = util.pick(this.view, 'options', 'workweek');
    var days = isWorkWeek ? this.days + WEEKEND_DAYS : this.days;

    var getIdxFromDiff = function(d1, d2) {
            return mfloor(datetime.millisecondsTo('day', mabs(d2 - d1)));
        },
        monthStart = datetime.start(weeks[0].options.renderStartDate),
        isBefore = date < monthStart,
        start = new TZDate(monthStart),
        end = new TZDate(monthStart).addDate(isBefore ? -days : days).addDate(-1),
        x = getIdxFromDiff(date, start),
        y = 0;

    while (!datetime.isBetweenWithDate(date, start, end)) {
        start.addDate(isBefore ? -days : days);
        end = new TZDate(start).addDate(days - 1);
        x = getIdxFromDiff(date, start);
        y += (isBefore ? -1 : 1);
    }

    return [x, y];
};

/**
 * Get limited coordinate by supplied coodinates
 * @param {number[]} coord - coordinate need to limit
 * @param {number[]} [min] - minimum limitaion of coordinate
 * @param {number[]} [max] - maximum limitation of coordinate
 * @returns {number[]} limited coordiate
 */
MonthGuide.prototype._getLimitedCoord = function(coord, min, max) {
    var toIndex = 1,
        x = coord[0],
        y = coord[1],
        result;

    min = min || [0, 0];
    max = max || [this.days - toIndex, this.weeks.length - toIndex];

    if (y < min[1]) {
        result = min.slice(0);
    } else if (y > max[1]) {
        result = max.slice(0);
    } else {
        x = mmax(min[0], x);
        x = mmin(max[0], x);
        result = [x, y];
    }

    return result;
};

/**
 * Prepare guide element modification
 * @param {object} dragStartEvent - dragStart schedule data from *guide
 */
MonthGuide.prototype.start = function(dragStartEvent) {
    var opt = this.options,
        target = dragStartEvent.target,
        model = dragStartEvent.model,
        x = dragStartEvent.x,
        y = dragStartEvent.y,
        renderMonth = new TZDate(this.view.options.renderMonth),
        temp;

    if (opt.isCreationMode) {
        if (model && !datetime.isSameMonth(renderMonth, model.start)) {
            model.start.setMonth(renderMonth.getMonth());
            model.start.setDate(1);
            model.end.setMonth(renderMonth.getMonth());
            model.end.setDate(1);
        }
    } else {
        temp = this._getCoordByDate(model.getStarts());
        x = temp[0];
        y = temp[1];

        util.extend(this.options, {
            top: parseInt(target.style.top, 10) + 'px',
            height: parseInt(target.style.height, 10) + 'px',
            label: model.title
        }, model);
    }

    if (util.isUndefined(x) || util.isUndefined(y)) {
        temp = this._getCoordByDate(model.getStarts());
        x = temp[0];
        y = temp[1];
    }

    this.startCoord = [x, y];
    this.update(x, y);
};

/**
 * Data for update several guide elements
 * @typedef UpdateIndication
 * @type {object}
 * @property {HTMLElement} guide - guide element
 * @property {number} left - left style value
 * @property {number} width - width style value
 * @property {boolean} [exceedL=false] - whether schedule is exceeded past weeks?
 * @property {boolean} [exceedR=false] - whether schedule is exceeded future weeks?
 */

/**
 * Modify HTML element that uses for guide element
 * @param {UpdateIndication[]} inds - indication of update severel guide element
 */
MonthGuide.prototype._updateGuides = function(inds) {
    util.forEach(inds, function(ind) {
        var guide = ind.guide,
            exceedLClass = config.classname('month-exceed-left'),
            exceedRClass = config.classname('month-exceed-right');

        guide.style.display = 'block';
        guide.style.left = ind.left + '%';
        guide.style.width = ind.width + '%';

        if (ind.exceedL) {
            domutil.addClass(guide, exceedLClass);
        } else {
            domutil.removeClass(guide, exceedLClass);
        }

        if (ind.exceedR) {
            domutil.addClass(guide, exceedRClass);
        } else {
            domutil.removeClass(guide, exceedRClass);
        }
    });
};

/**
 * Get guide element indicate for origin week
 * @param {number[]} startCoord - drag start coordinate
 * @param {number[]} mouseCoord - mouse coordinate
 * @returns {object} indicate
 */
MonthGuide.prototype._getOriginIndicate = function(startCoord, mouseCoord) {
    var left = mmin(startCoord[0], mouseCoord[0]),
        right = mmax(startCoord[0], mouseCoord[0]) + 1,
        exceedL, exceedR;

    if (mouseCoord[1] > startCoord[1]) {
        left = startCoord[0];
        right = this.days;
        exceedR = true;
    } else if (mouseCoord[1] < startCoord[1]) {
        left = 0;
        right = startCoord[0] + 1;
        exceedL = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    };
};

/**
 * Get guide element indicate for week related with mouse position
 * @param {number[]} startCoord - drag start coordinate
 * @param {number[]} mouseCoord - mouse coordinate
 * @returns {object} indicate
 */
MonthGuide.prototype._getMouseIndicate = function(startCoord, mouseCoord) {
    var left = mouseCoord[0],
        right = mouseCoord[0] + 1,
        exceedL, exceedR;

    if (mouseCoord[1] > startCoord[1]) {
        left = 0;
        exceedL = true;
    } else if (mouseCoord[1] < startCoord[1]) {
        right = this.days;
        exceedR = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    };
};

/**
 * Get guide element indicate for contained weeks
 * @returns {object} indicate
 */
MonthGuide.prototype._getContainIndicate = function() {
    return {
        left: 0,
        width: 100,
        exceedL: true,
        exceedR: true
    };
};

/**
 * Remove several guide element that supplied by parameter
 * @param {number[]} yCoords - array of y coordinate to remove guide element
 */
MonthGuide.prototype._removeGuideElements = function(yCoords) {
    var guides = this.guideElements;

    util.forEach(yCoords, function(y) {
        domutil.remove(guides[y]);
        delete guides[y];
    });
};

/**
 * Get excluded numbers in range
 * @param {number[]} range - the range. value must be sequencial.
 * @param {number[]} numbers - numbers to check
 * @returns {number[]} excluded numbers
 */
MonthGuide.prototype._getExcludesInRange = function(range, numbers) {
    var min = mmin.apply(null, range),
        max = mmax.apply(null, range),
        excludes = [];

    util.forEach(numbers, function(num) {
        num = parseInt(num, 10);
        if (num < min || num > max) {
            excludes.push(num);
        }
    });

    return excludes;
};

/**
 * Update guide elements by coordinate in month grid from mousemove event
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
MonthGuide.prototype.update = function(x, y) {
    var self = this,
        startCoord = this.startCoord,
        mouseCoord = [x, y],
        limitedCoord = this.options.isResizeMode ?
            this._getLimitedCoord(mouseCoord, startCoord) : mouseCoord,
        renderedYIndex = util.keys(this.guideElements),
        yCoordsToUpdate = util.range(
            mmin(startCoord[1], limitedCoord[1]),
            mmax(startCoord[1], limitedCoord[1]) + 1
        ),
        yCoordsToRemove = this._getExcludesInRange(
            yCoordsToUpdate,
            renderedYIndex
        ),
        renderIndication = {};

    this._removeGuideElements(yCoordsToRemove);

    util.forEach(yCoordsToUpdate, function(guideYCoord) {
        var guide = self._getGuideElement(guideYCoord),
            indicate;

        if (!guide) {
            return;
        }

        if (guideYCoord === startCoord[1]) {
            indicate = self._getOriginIndicate(startCoord, limitedCoord);
        } else if (guideYCoord === mouseCoord[1]) {
            indicate = self._getMouseIndicate(startCoord, mouseCoord);
        } else {
            indicate = self._getContainIndicate();
        }

        renderIndication[guideYCoord] = util.extend({
            guide: guide
        }, indicate);
    });

    this._updateGuides(renderIndication);
};

/**
 * Clear all guide elements
 */
MonthGuide.prototype.clear = function() {
    util.forEach(this.guideElements, function(element) {
        domutil.remove(element);
    });

    this.guideElements = {};
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
MonthGuide.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.border = theme.common.creationGuide.border;
        styles.backgroundColor = theme.common.creationGuide.backgroundColor;
        styles.scheduleHeight = theme.month.schedule.height;
        styles.scheduleGutter = theme.month.schedule.marginTop;
        styles.marginLeft = theme.month.schedule.marginLeft;
        styles.marginRight = theme.month.schedule.marginRight;
        styles.borderRadius = theme.month.schedule.borderRadius;
    }

    return styles;
};

module.exports = MonthGuide;
