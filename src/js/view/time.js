/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');

function Time() {
    View.apply(this, arguments);
    domutil.addClass(this.container, 'view-time-container');
}

util.inherit(Time, View);

/**********
 * prototype props
 **********/

Time.prototype.onAdded = function(parent) {
    var container = parent;

    this.container = domutil.appendHTMLElement(
        'div',
        container,
        'view-time-container'
    );
};


module.exports = Time;

