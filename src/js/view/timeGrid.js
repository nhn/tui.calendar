/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var datetime = require('../datetime');
var View = require('./view');
var mainTmpl = require('./template/timeGrid.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 */
function TimeGrid(options, container) {
    View.call(this, null, container);

    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend(options || {}, {
        hourStart: 0,
        hourEnd: 24
    });

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
 */
TimeGrid.prototype.render = function() {
    var container = this.container,
        baseViewModel = this._getBaseViewModel();

    container.innerHTML = mainTmpl(baseViewModel);

    this.hourmarker = domutil.find('.view-time-hourmarker', container);
    this.refreshHourmarker();

    //TODO: render childs.
};

TimeGrid.prototype.refreshHourmarker = function() {
    var hourmarker = this.hourmarker,
        viewModel = this._getHourmarkerViewModel();

    if (!hourmarker || !viewModel) {
        return;
    }

    hourmarker.style.display = 'block';
    hourmarker.style.top = viewModel.top + 'px';
    domutil.find('.view-time-hourmarker-time').innerHTML = viewModel.text;
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
        todayStart = datetime.start(now),
        offset,
        gridSize = this._getGridSize(),
        top;

    if (!gridSize) {
        return false;
    }
    console.log(now, todayStart);

    offset = +now - +todayStart;
    top = (offset * gridSize[1]) / datetime.MILLISECONDS_PER_DAY;

    return {
        top: top,
        text: datetime.format(now, 'HH:mm')
    };
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(util.bind(this.onTick, this), 1000 * 10);
};


/**********
 * Event handlers
 **********/

TimeGrid.prototype.onTick = function() {
    this.refreshHourmarker();
};

module.exports = TimeGrid;

