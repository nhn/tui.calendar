/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmax = Math.max,
    mmin = Math.min,
    mabs = Math.abs;

var config = require('../../config'),
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

MonthGuide.prototype._createGuideElement = function() {
    var guide = document.createElement('div');

    guide.style.top = '20px';
    guide.style.display = 'none';

    domutil.addClass(guide, 
         config.classname('allday-guide-creation-block'));

    domutil.appendHTMLElement(
        'div', 
        guide, 
        config.classname('allday-guide-creation')
    );

    return guide;
};

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

MonthGuide.prototype.start = function(x, y) {
    var guideEl = this._getGuideElement(y);

    guideEl.style.left = common.ratio(this.days, 100, x) + '%';
    guideEl.style.width = common.ratio(this.days, 100, 1) + '%';

    this.startIndex = [x, y];
};

MonthGuide.prototype.update = function(x, y) {
    var start = this.startIndex,
        guideElements = this.guideElements,
        range = util.range(mmin(start[1], y), mmax(start[1], y) + 1),
        needRemove = [];

    // 범위 외 가이드 엘리먼트 제거
    util.forEach(guideElements, function(guideEl, yIndex) {
        if (!~util.inArray(parseInt(yIndex, 10), range)) {
            needRemove.push(yIndex);
        }
    });

    util.forEach(needRemove, function(y) {
        domutil.remove(guideElements[y]);
        delete guideElements[y];
    });

    // 범위 내 가이드 엘리먼트 업데이트
    util.forEach(range, function(yIndex) {
        var guideEl = this._getGuideElement(yIndex);
        guideEl.style.display = 'block';
        //TODO: 각 가이드 엘리먼트의 left, width를 잘 조절하면 됨
    }, this);

};

MonthGuide.prototype.clear = function() {
    util.forEach(this.guideElements, function(element) {
        domutil.remove(element);
    });

    this.guideElements = {};
};

module.exports = MonthGuide;

