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
 * @param {array} eventViewModels Models
 * @param {object} options Options
 * @param {HTMLElement} container Element to use container for this view.
 */
function Time(width, eventViewModels, options, container) {
    View.call(this, null, container);
    container.style.width = width + '%';

    this.options = util.extend({
        isToday: false
    }, options || {});
}

util.inherit(Time, View);

/**
 * @override
 */
Time.prototype.render = function() {
    var options = this.options;

    if (options.isToday) {
        domutil.addClass(this.container, 'view-time-date-today');
    }
};

module.exports = Time;

