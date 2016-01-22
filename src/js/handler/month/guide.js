/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmax = Math.max,
    mmin = Math.min;

var config = require('../../config'),
    array = require('../../common/array'),
    common = require('../../common/common'),
    domutil = require('../../common/domutil');

/**
 * @constructor
 * @param {Month} monthView - Month view instance
 */
function MonthGuide(monthView) {
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
     * @type {number[]}
     */
    this.startIndex = [0, 0];

    /**
     * @type {Object.<string, HTMLElement}
     */
    this.guideElements = {}; 
}

MonthGuide.prototype.getGuideElement = function(y) {
    var guideElements = this.guideElements,
        guideEl = guideElements[y],
        weekdayView = this.weeks[y],
        container;

    if (!guideEl) {
        guideEl = document.createElement('div');
        guideEl.style.top = '20px';
        guideEl.style.display = 'none';

        domutil.addClass(guideEl, 
             config.classname('allday-guide-creation-block'));

        domutil.appendHTMLElement(
            'div', 
            guideEl, 
            config.classname('allday-guide-creation')
        );

        container = domutil.find(
            config.classname('.weekday-events'), 
            weekdayView.container
        );

        container.appendChild(guideEl);

        guideElements[y] = guideEl;
    }

    return guideEl;
};

MonthGuide.prototype.start = function(x, y) {
    var guideElement = this.getGuideElement(y),
        eventContainer;

    guideElement.style.left = common.ratio(this.days, 100, x) + '%';
    guideElement.style.width = common.ratio(this.days, 100, 1) + '%';

    this.startIndex = [x, y];
};

MonthGuide.prototype.update = function(x, y) {
    var start = this.startIndex,
        guideElements = this.guideElements,
        range = util.range(mmin(start[1], y), mmax(start[1], y) + 1),
        needUpdate = [],
        needRemove = [];

    // {Plan A}
    // util.forEach(guideElements, function(guideEl, yIndex) {
    //     yIndex = Number(yIndex);
    //
    //     if (~util.inArray(yIndex, range)) {
    //         needUpdate.push(yIndex);
    //     } else {
    //         needRemove.push(yIndex);
    //     }
    // });
    //
    // console.log(needUpdate, needRemove);
    //
    // util.forEach(needUpdate, function(y) {
    //     var guideEl = this.getGuideElement(y);
    //     guideEl.style.display = 'block';
    // }, this);
    //
    // util.forEach(needRemove, function(y) {
    //     domutil.remove(guideElements[y]);
    //     delete guideElements[y];
    // });

    // {Plan B}
    // util.forEach(guideElements, function(guideEl, yIndex) {
    //     if (~util.inArray(yIndex, range)) {
    //     } else {
    //         domutil.remove(guideEl);
    //     }
    // });
    //     range = [startIndex[1], y].sort(array.compare.num.asc);
    //
    // range[1] += 1;
    //
    // range = util.range.apply(null, range)
};

MonthGuide.prototype.clear = function() {
    util.forEach(this.guideElements, function(element) {
        domutil.remove(element);
    });

    this.guideElements = {};
};

module.exports = MonthGuide;

