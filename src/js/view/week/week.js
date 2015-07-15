/**
 * @fileoverview View of an week.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var View = require('../view');

/**
 * @constructor
 * @param {object} options The object for use view options.
 * @param {HTMLElement} container HTML element for use container.
 */
function Week(options, container) {
    var container;

    View.apply(this, arguments);

    container = this.container;
}

module.exports = Week;

