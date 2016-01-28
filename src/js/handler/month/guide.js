/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmax = Math.max,
    mmin = Math.min,
    mabs = Math.abs,
    mfloor = Math.floor;

var config = require('../../config'),
    common = require('../../common/common'),
    domutil = require('../../common/domutil'),
    datetime = require('../../common/datetime'),
    dw = require('../../common/dw'),
    tmpl = require('./guide.hbs');

/**
 * @constructor
 * @param {object} [options] - options
 * @param {boolean} [options.useHandle=false] - whether displaying resize handle on 
 *  guide element?
 * @param {boolean} [options.isResizeModel=false] - whether resize mode?
 * @param {Month} monthView - Month view instance
 */
function MonthGuide(options, monthView) {
    /**
     * @type {object}
     */
    this.options = util.extend({
        top: 20,
        height: 20,
        bgColor: '#f7ca88',
        label: '새 일정',
        isResizeModel: false,
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
     * @type {function}
     */
    this.ratio = util.bind(function(value) {
        return common.ratio(this.days, 100, value);
    }, this);


    /**
     * start index of guide effect. (x, y) (days, weeks) effect can't lower 
     * than this indexes.
     * @type {number[]}
     */
    this.startIndex = [0, 0];

    /**
     * @type {Object.<string, HTMLElement>}
     */
    this.guideElements = {}; 
}

/**
 * Destructor
 */
MonthGuide.prototype.destroy = function() {
    this.clear();

    this.options = this.view = this.weeks = this.days =
        this.ratio = this.startIndex = this.guideElements = null;
};

/**
 * Get ratio value in week.
 * @param {number} value - value for calc ratio in week
 * @returns {number} percent value
 */
MonthGuide.prototype._getRatioValueInWeek = function(value) {
    return common.ratio(this.days, 100, value);
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
 * @param {number} y - y index
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

        container = domutil.find(
            config.classname('.weekday-events'), 
            weekdayView.container
        );

        container.appendChild(guide);

        guideElements[y] = guide;
    }

    return guide;
};

/**
 * Get indexes by supplied date in month
 * @param {Date} date - date to find index
 * @returns {number[]} indexes (x, y)
 */
MonthGuide.prototype._getIndexByDate = function(date) {
    var weeks = this.weeks,
        days = this.days,
        getIdxFromDiff = function(d1, d2) {
            return mfloor(datetime.millisecondsTo('day', mabs(d2 - d1)));
        },
        monthStart = datetime.parse(weeks[0].options.renderStartDate),
        isBefore = date < monthStart,
        dateDW = dw(date),
        startDW = dw(monthStart),
        endDW = startDW.clone().addDate(isBefore ? -days : days),
        x = getIdxFromDiff(dateDW.d, startDW.d),
        y = 0;

    while (!dateDW.isBetween(startDW, endDW)) {
        startDW.addDate(isBefore ? -days : days);
        endDW = startDW.clone().addDate(days);
        x = getIdxFromDiff(dateDW.d, startDW.d);
        y += (isBefore ? -1 : 1);
    }

    return [x, y];
};

/**
 * Get limited x, y indexes by supplied indexes
 * @param {number} x - x index
 * @param {number} y - y index
 * @param {number[]} [start] - start indexes
 * @param {number[]} [end] - end indexes
 * @returns {number[]} limited indexes
 */
MonthGuide.prototype._getLimitedIndex = function(x, y, start, end) {
    var toIndex = 1;

    start = start || [0, 0];
    end = end || [this.days - toIndex, this.weeks.length - toIndex];

    x = mmax(x, start[0]);
    x = mmin(x, end[0]);
    y = mmax(y, start[1]);
    y = mmin(y, end[1]);

    return [x, y];
};

/**
 * Prepare guide element modification
 * @param {object} dragStartEvent - dragStart event data from *guide
 */
MonthGuide.prototype.start = function(dragStartEvent) {
    var opt = this.options,
        target = dragStartEvent.target,
        model = dragStartEvent.model,
        x = dragStartEvent.x,
        y = dragStartEvent.y,
        temp;

    if (opt.isResizeMode) {
        temp = this._getIndexByDate(model.getStarts());
        x = temp[0];
        y = temp[1];

        util.extend(this.options, {
            top: parseInt(target.style.top, 10),
            height: parseInt(target.style.height, 10),
            bgColor: target.children[0].style.backgroundColor,
            label: model.title
        });
    }

    this.startIndex = [x, y];
    this.update(x, y);
};

/**
 * @typedef UpdateIndication
 * @type {object}
 * @property {HTMLElement} guide - guide element
 * @property {number} left - left style value
 * @property {number} width - width style value
 * @property {boolean} [exceedL=false] - whether event is exceeded past weeks?
 * @property {boolean} [exceedR=false] - whether event is exceeded future weeks?
 */

/**
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
 * @param {number} sX - startX index
 * @param {number} sY - startY index
 * @param {number} nX - newX index
 * @param {number} nY - newY index
 * @returns {object} indicate
 */
MonthGuide.prototype._getOriginWeekIndicate = function(sX, sY, nX, nY) {
    var left = mmin(sX, nX),
        right = mmax(sX, nX) + 1,
        exceedL, exceedR;

    if (nY > sY) {
        left = sX;
        right = this.days,
        exceedR = true;
    } else if (nY < sY) {
        left = 0;
        right = sX + 1;
        exceedL = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    }
};

/**
 * Get guide element indicate for week related with mouse position
 * @param {number} sY - startY index
 * @param {number} nX - newX index
 * @param {number} nY - newY index
 * @returns {object} indicate
 */
MonthGuide.prototype._getCurrentWeekIndicate = function(sY, nX, nY) {
    var left = nX,
        right = nX + 1,
        exceedL, exceedR;

    if (nY > sY) {
        left = 0;
        exceedL = true;
    } else if (nY < sY) {
        right = this.days;
        exceedR = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    }
};

/**
 * Get guide element indicate for contained weeks
 * @returns {object} indicate
 */
MonthGuide.prototype._getContainWeekIndicate = function() {
    return {
        left: 0,
        width: 100,
        exceedL: true,
        exceedR: true
    };
};

/**
 * Remove several guide element that supplied by parameter
 * @param {number[]} yIndexes - y index to remove guide element
 */
MonthGuide.prototype._removeGuideElements = function(yIndexes) {
    var guides = this.guideElements;
    
    util.forEach(yIndexes, function(y) {
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
        if (num < min || num > max) {
            excludes.push(num);
        }
    });

    return excludes;
};

/**
 * Update guide elements
 * @param {number} x - new X index from mousemove event
 * @param {number} y - new Y index from mousemove event
 */
MonthGuide.prototype.update = function(x, y) {
    var startX = this.startIndex[0],
        startY = this.startIndex[1],
        renderedYIndexes = util.keys(this.guideElements),
        updateRange = util.range(mmin(startY, y), mmax(startY, y) + 1),
        removeRange = this._getExcludesInRange(updateRange, renderedYIndexes),
        renderIndication = {};

    this._removeGuideElements(removeRange);

    util.forEach(updateRange, function(guideY) {
        var guide = this._getGuideElement(guideY),
            indicate;

        if (!guide) {
            return;
        }

        if (guideY === startY) {
            indicate = this._getOriginWeekIndicate(
                startX, 
                startY,
                x,
                y
            );
        } else if (guideY === y) {
            indicate = this._getCurrentWeekIndicate(
                startY,
                x,
                y
            );
        } else {
            indicate = this._getContainWeekIndicate();
        }

        renderIndication[guideY] = util.extend({
            guide: guide
        }, indicate);
    }, this);

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

module.exports = MonthGuide;

