/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var datetime = require('../datetime');
var reqAnimFrame = require('../common/reqAnimFrame');
var View = require('./view');
var mainTmpl = require('./template/timeGrid.hbs');

var TICK_INTERVAL = 1000 * 10;  // 10 sec
var HOUR_TO_MILLISECONDS = 60 * 60 * 1000;

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} container Container element.
 */
function TimeGrid(options, container) {
    View.call(this, null, container);

    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend({
        hourStart: 0,
        hourEnd: 24
    }, options || {});

    domutil.addClass(container, 'view-time-container');

    this.attachEvent();
}

util.inherit(TimeGrid, View);

/**********
 * Prototype props
 **********/

/**
 * Get base viewModel.
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function() {
    var options = this.options,
        end = options.hourEnd,
        i = options.hourStart,
        hours = [];

    for (; i < end; i += 1) {
        hours.push({hour: i});
    }

    return {hours: hours};
};

/**
 * @override
 * @param {object} eventViewModels ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(eventViewModels) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(),
        eventLen = util.keys(eventViewModels).length,
        eventContainer,
        eventContainerSize,
        timeViewWidth;

    container.innerHTML = mainTmpl(baseViewModel);

    this.hourmarker = domutil.find('.view-time-hourmarker', container);
    this.refreshHourmarker();


    eventContainer = domutil.find('.view-time-events-container', container);
    eventContainerSize = domutil.getSize(eventContainer);
    /**********
     * Render childs
     **********/
    if (!eventLen || !eventContainerSize) {
        return;
    }

    // empty child view collection
    this.childs.clear();
    //TODO: destroy child view
    timeViewWidth = eventContainerSize[0] / eventLen;

    // reconcilation of child views
    util.forEach(eventViewModels, function(events, ymd) {
        var el = domutil.appendHTMLElement('div', eventContainer, 'view-time-date');
        el.style.width = timeViewWidth + 'px';
        el.style.height = '200px';
    });
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourmarker = this.hourmarker,
        viewModel = this._getHourmarkerViewModel();

    if (!hourmarker || !viewModel) {
        return;
    }

    reqAnimFrame.requestAnimFrame(function() {
        hourmarker.style.display = 'block';
        hourmarker.style.top = viewModel.top + 'px';
        domutil.find('.view-time-hourmarker-time', hourmarker).innerHTML = viewModel.text;
    });
};

/**
 * Return grid size.
 * @returns {number[]} The size of grid element.
 */
TimeGrid.prototype._getGridSize = function() {
    var childNode = this.container.childNodes[0];

    if (!childNode) {
        return false;
    }

    return domutil.getSize(childNode);
};

/**
 * Get Hourmarker viewmodel.
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function() {
    var now = new Date(),
        start = datetime.start(now),
        hourStart = this.options.hourStart,
        gridSize = this._getGridSize(),
        offset;

    if (!gridSize) {
        return false;
    }

    offset = +now - +start;
    if (hourStart) {
        offset -= hourStart * HOUR_TO_MILLISECONDS;
    }

    return {
        top: (offset * gridSize[1]) / (this._getBaseViewModel().hours.length * HOUR_TO_MILLISECONDS),
        text: datetime.format(now, 'HH:mm')
    };
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(util.bind(this.onTick, this), TICK_INTERVAL);
};


/**********
 * Event handlers
 **********/

/**
 * Interval tick handler
 */
TimeGrid.prototype.onTick = function() {
    this.refreshHourmarker();
};

module.exports = TimeGrid;

