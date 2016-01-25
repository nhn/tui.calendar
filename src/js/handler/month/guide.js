/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmax = Math.max,
    mmin = Math.min;

var config = require('../../config'),
    common = require('../../common/common'),
    domutil = require('../../common/domutil');

/**
 * @constructor
 * @param {object} options - option object
 * @param {number} [options.top] - top index
 * @param {string} [options.bgColor] - default background color
 * @param {Month} monthView - Month view instance
 */
function MonthGuide(options, monthView) {
    /**
     * @type {object}
     */
    this.options = util.extend({
        top: 20,
        bgColor: '#f7ca88',
        label: '새 일정'
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
     * @type {number[]}
     */
    this.startIndex = [0, 0];

    /**
     * @type {Object.<string, HTMLElement}
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
 * Create guide element
 * @returns {HTMLElement} guide element
 */
MonthGuide.prototype._createGuideElement = function() {
    var opt = this.options,
        guide = document.createElement('div'),
        inner = document.createElement('div');

    guide.style.top = (opt.top + 'px');
    guide.style.display = 'none';
    inner.style.backgroundColor = opt.bgColor;
    inner.innerHTML = opt.label;

    domutil.addClass(guide, config.classname('allday-guide-creation-block'));
    domutil.addClass(
        inner, 
        [config.classname('allday-guide-creation'), 
         config.classname('weekday-event')].join(' ')
    );

    guide.appendChild(inner);

    return guide;
};

/**
 * Get guide element. if not exist then create one
 * @param {number} y - y index
 * @returns {HTMLElement} guide element
 */
MonthGuide.prototype._getGuideElement = function(y) {
    var guideElements = this.guideElements,
        guide = guideElements[y],
        weekdayView = this.weeks[y],
        container;

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
 * Prepare guide element modification
 * @param {number} x - mouse x
 * @param {number} y - mouse y
 */
MonthGuide.prototype.start = function(x, y) {
    var guideEl = this._getGuideElement(y),
        ratio = this.ratio;

    guideEl.style.left = ratio(x) + '%';
    guideEl.style.width = ratio(1) + '%';

    this.startIndex = [x, y];
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
            exceedLClass = config.classname('weekday-exceed-left'),
            exceedRClass = config.classname('weekday-exceed-right');

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
    var ratio = this.ratio,
        left = mmin(sX, nX),
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
        left: ratio(left),
        width: ratio(right) - ratio(left),
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
    var ratio = this.ratio,
        left = nX,
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
        left: ratio(left),
        width: ratio(right) - ratio(left),
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
        width: this.ratio(this.days),
        exceedL: true,
        exceedR: true
    };
};

/**
 * Update guide elements
 * @param {number} nX - new X index from mousemove event
 * @param {number} nY - new Y index from mousemove event
 */
MonthGuide.prototype.update = function(nX, nY) {
    var start = this.startIndex,
        guides = this.guideElements,
        sX = start[0], sY = start[1],
        minIndex = mmin(sY, nY),
        maxIndex = mmax(sY, nY),
        range = util.range(minIndex, maxIndex + 1),
        inds = {};

    util.forEach(util.keys(guides), function(iY) {
        if (iY < minIndex || iY > maxIndex) {
            domutil.remove(guides[iY]);
            delete guides[iY];
        }
    });
    
    // nX, nY: 업데이트 해야 하는 마우스 위치에 대한 새 index
    // sX, sY: 드래그 시작 마우스 위치 index
    // iY    : 반복문 내에서의 가이드 엘리먼트 ID

    util.forEach(range, function(iY) {
        var guide = this._getGuideElement(iY),
            indicate;

        if (iY === sY) {
            indicate = this._getOriginWeekIndicate(sX, sY, nX, nY);
        } else if (iY === nY) {
            indicate = this._getCurrentWeekIndicate(sY, nX, nY);
        } else {
            indicate = this._getContainWeekIndicate();
        }

        inds[iY] = util.extend({
            guide: guide
        }, indicate);
    }, this);

    this._updateGuides(inds);
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

