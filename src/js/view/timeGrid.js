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
 * @override
 */
TimeGrid.prototype.render = function() {
    this.renderGrid(this.container);
};

/**
 * Render base elements
 * @param {HTMLElement} container Container element.
 */
TimeGrid.prototype.renderGrid = function(container) {
    var options = this.options,
        end = options.hourEnd,
        i = options.hourStart,
        hours = [];

    for (; i < end; i += 1) {
        hours.push({hour: i});
    }

    container.innerHTML = mainTmpl({hours: hours});
    this.hourMarker = domutil.find('.view-time-hourmarker', container);
    this.hourMarker.style.display = 'block';
};

TimeGrid.prototype.attachEvent = function() {
    this.hourMarkerIntervalID = window.setInterval(util.bind(this.onTickHourMarker, this), 1000 * 10);
};

/**********
 * Event handlers
 **********/

TimeGrid.prototype.onTickHourMarker = function() {
    var hourMarker = this.hourMarker,
        height,
        current,
        top;

    if (!hourMarker) {
        return;
    }

    height = domutil.getSize(this.container.childNodes[0])[1];
    current = new Date() - datetime.start(new Date());
    top = (current * height) / datetime.MILLISECONDS_PER_DAY;

    hourMarker.style.top = top + 'px';
    domutil.find('.view-time-hourmarker-time', hourMarker).innerHTML = datetime.format(new Date(), 'HH:mm');
};

module.exports = TimeGrid;

