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
var Time = require('./time');
var mainTmpl = require('./template/timeGrid.hbs');

var TICK_INTERVAL = 1000 * 10;    // 10 sec
var HOUR_TO_MILLISECONDS = 60 * 60 * 1000;
var PIXEL_RENDER_ERROR = 0.5;    // pixel rendering error value

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
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {number} width The width percent of each time view.
 * @param {HTMLElement} container Container element for each time view.
 */
TimeGrid.prototype._renderChilds = function(viewModels, width, container) {
    var options = this.options,
        childOption,
        child,
        isToday,
        today = datetime.format(new Date(), 'YYYYMMDD');

    // clear contents
    container.innerHTML = '';
    this.childs.clear();
    this.todaymarkerLeft = null;

    // reconcilation of child views
    util.forEach(viewModels, function(events, ymd) {
        isToday = ymd === today;

        if (isToday) {
            this.todaymarkerLeft = width * this.childs.length;
        }

        childOption = {
            isToday: isToday,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd
        };

        child = new Time(
            width,
            childOption,
            domutil.appendHTMLElement('div', container, 'view-time-date')
        );
        child.render(events.time);

        this.addChild(child);
    }, this);
};

/**
 * @override
 * @param {object} eventViewModels ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(eventViewModels) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(),
        eventLen = util.keys(eventViewModels).length;

    if (!eventLen) {
        return;
    }

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render childs
     **********/
    this._renderChilds(
        eventViewModels,
        100 / eventLen,
        domutil.find('.view-time-events-container', container)
    );

    /**********
     * Render hourmarker
     **********/
    this.hourmarker = domutil.find('.view-time-hourmarker', container);
    this.refreshHourmarker();
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourmarker = this.hourmarker,
        viewModel = this._getHourmarkerViewModel(),
        todaymarkerLeft = this.todaymarkerLeft,
        todaymarker,
        text;

    if (!hourmarker || !viewModel) {
        return;
    }

    todaymarker = domutil.find('.view-time-todaymarker', hourmarker);
    text = domutil.find('.view-time-hourmarker-time', hourmarker);

    //TODO: debounce 0.5px units.
    reqAnimFrame.requestAnimFrame(function() {
        hourmarker.style.display = 'block';
        hourmarker.style.top = (viewModel.top - PIXEL_RENDER_ERROR) + 'px';

        if (todaymarkerLeft) {
            todaymarker.style.display = 'block';
            todaymarker.style.left = todaymarkerLeft + '%';
        } else {
            todaymarker.style.display = 'none';
        }

        text.innerHTML = viewModel.text;
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

