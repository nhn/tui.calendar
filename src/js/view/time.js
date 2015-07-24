/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');
var timeTmpl = require('./template/time.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {number} width Date element width (percent)
 * @param {object} options Options
 * @param {HTMLElement} container Element to use container for this view.
 */
function Time(width, options, container) {
    View.call(this, null, container);

    container.style.width = width + '%';

    this.options = util.extend({
        isToday: false,
        hourStart: 0,
        hourEnd: 24
    }, options || {});

    if (this.options.isToday) {
        domutil.addClass(this.container, 'view-time-date-today');
    }
}

util.inherit(Time, View);

Time.prototype.render = function(viewModels) {
    this.container.innerHTML = timeTmpl(viewModels);
};

module.exports = Time;

